#!/usr/bin/env node
'use strict';
// Loads this pack beside the real Polestar addon and Polestar's guides in
// Polestar's fake game client (tests/lua in a Polestar clone), as the game
// loads them: reports what Polestar's checks refuse, then opens every guide
// of the pack and checks each `next` leads to a guide that exists.
//
//   node tools/verify/load.js <polestar clone> [--pack <dir>]
//
// Needs Node and Lua 5.1; no reference data.

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const argv = process.argv.slice(2);
let pack = path.resolve(__dirname, '../..');
let polestar = null;
for (let i = 0; i < argv.length; i++) {
	if (argv[i] === '--pack') pack = path.resolve(argv[++i]);
	else polestar = path.resolve(argv[i]);
}
if (!polestar) throw new Error('usage: load.js <polestar clone> [--pack dir]');
const { runAddon, ADDONS } = require(path.join(polestar, 'tests/helpers/lua'));

const toc = fs.readdirSync(pack).find((f) => f.endsWith('.toc'));
const name = toc.replace(/\.toc$/, '');
if (path.basename(pack) !== name) {
	const copy = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'pack-load-')), name);
	fs.mkdirSync(copy);
	for (const f of fs.readdirSync(pack)) if (/\.(lua|toc|xml|txt)$/.test(f)) fs.copyFileSync(path.join(pack, f), path.join(copy, f));
	pack = copy;
}
function tocMeta(dir) {
	const t = fs.readdirSync(dir).find((f) => f.endsWith('.toc'));
	const meta = {};
	for (const line of fs.readFileSync(path.join(dir, t), 'utf8').split(/\r?\n/)) {
		const m = /^##\s*([^:]+):\s*(.*)$/.exec(line);
		if (m) meta[m[1].trim()] = m[2].trim();
	}
	return meta;
}
const packId = tocMeta(pack)['X-Polestar-Pack'];
const all = [
	{ name: 'Polestar', dir: path.join(ADDONS, 'Polestar') },
	{ name: 'Polestar_Guides', dir: path.join(ADDONS, 'Polestar_Guides') },
	{ name, dir: pack },
];
const s = JSON.stringify;
const list = all.map((a) => `{ name = ${s(a.name)}, loaded = true }`).join(', ');
const meta = all.map((a) => `stub.addonMeta[${s(a.name)}] = { ${Object.entries(tocMeta(a.dir)).map(([k, v]) => `[${s(k)}] = ${s(v)}`).join(', ')} }`).join('\n');
const [out] = runAddon({
	stubs: ['stub_world.lua'],
	before: `stub.addons = { ${list} }\n${meta}`,
	addons: all,
	login: true,
	script: `stub.advance(0.5)
local G, E = Polestar.Guides, Polestar.Engine
local p = G.Pack(${s(packId)})
local problems = {}
for i, x in ipairs(p and p.problems or {}) do problems[i] = type(x) == "table" and (x.message or x.text or tostring(x[1])) or tostring(x) end
local r = { found = p ~= nil, status = p and p.status, guides = p and p.guideCount, problems = problems, ours = G.Pack("guides").guideCount,
	oursProblems = #G.Pack("guides").problems, opened = 0, steps = 0, badNext = {}, openFail = {}, errors = {} }
for _, g in ipairs(G.List()) do
	if g.pack == ${s(packId)} then
		if g.next and not G.Get(g.next) then r.badNext[#r.badNext + 1] = g.id .. " -> " .. tostring(g.next) end
		local idx
		local ok, err = pcall(function() idx = E.OpenTab(g.id); stub.advance(0.25) end)
		local cur = E.GetGuide()
		if not ok then r.errors[#r.errors + 1] = g.id .. ": " .. tostring(err)
		elseif not cur or cur.id ~= g.id then r.openFail[#r.openFail + 1] = g.id
		else r.opened = r.opened + 1; r.steps = r.steps + #(cur.steps or {}) end
		if idx then pcall(E.CloseTab, idx) end
	end
end
emit(r)`,
}).emitted;
const arr = (v) => (Array.isArray(v) ? v : v && typeof v === 'object' ? Object.values(v) : []);
const bad = arr(out.problems).length + arr(out.badNext).length + arr(out.openFail).length + arr(out.errors).length;
for (const p of arr(out.problems)) console.log(`problem: ${p}`);
for (const p of arr(out.badNext)) console.log(`next leads nowhere: ${p}`);
for (const p of arr(out.openFail)) console.log(`does not open: ${p}`);
for (const p of arr(out.errors)) console.log(`error: ${p}`);
console.log(`${packId}: ${out.found ? out.status : 'not registered'}, ${out.guides} guides, ${out.opened} opened (${out.steps} steps), ${bad} problems; Polestar's own ${out.ours} guides, ${out.oursProblems} problems`);
process.exitCode = out.found && !bad ? 0 : 1;
