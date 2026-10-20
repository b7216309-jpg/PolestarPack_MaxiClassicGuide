#!/usr/bin/env node
'use strict';
// Plays this pack's compiled guides (Guides.lua, no .guide sources needed) to
// the end with the guide simulator of Polestar's `playtest`
// (tools/lib/playtest.js in a Polestar clone): the real addon, the same
// characters, the same prerequisite chaining and hand-over checks, with
// Polestar's own guides loaded beside this pack.
//
//   node tools/verify/playtest.js <polestar clone> [options]
//
//   --pack <dir>     the pack folder (default: this repository)
//   --strict         a turn-in only for a quest in the log, as in the game (the
//                    simulator otherwise hands in any quest); a goal that stays
//                    open is listed and ticked by hand, and play goes on
//   --far            the character does not work an objective on another map
//                    than its step's accepts, turn-ins, gotos and NPCs: a step
//                    held by one is listed (with --strict)
//   --all-classes    every class each race can be, not only playtest's choice
//   --filter <text>  guides whose id contains it
//   --jobs <n>       parallel workers (default 4)
//   --out <file>     every play as JSON lines (default: none)
//
// Needs Node and Lua 5.1 (lua5.1, LuaJIT or a lua that is 5.1); no reference data.

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const Module = require('node:module');
const { spawnSync, fork } = require('node:child_process');

function parse(argv) {
	const o = { polestar: null, pack: path.resolve(__dirname, '../..'), strict: false, far: false, allClasses: false, filter: null, jobs: 4, out: null, worker: null };
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--pack') o.pack = path.resolve(argv[++i]);
		else if (a === '--strict') o.strict = true;
		else if (a === '--far') o.far = true;
		else if (a === '--all-classes') o.allClasses = true;
		else if (a === '--filter') o.filter = argv[++i];
		else if (a === '--jobs') o.jobs = Number(argv[++i]);
		else if (a === '--out') o.out = path.resolve(argv[++i]);
		else if (a === '--worker') o.worker = { index: Number(argv[++i]), count: Number(argv[++i]), tmp: argv[++i], out: argv[++i] }; // internal
		else o.polestar = path.resolve(a);
	}
	if (!o.polestar) throw new Error('usage: playtest.js <polestar clone> [--pack dir] [--strict] [--far] [--all-classes] [--filter text] [--jobs n] [--out file]');
	return o;
}

function lua() {
	for (const b of [process.env.LUA, 'lua5.1', 'luajit', 'lua'].filter(Boolean)) {
		const r = spawnSync(b, ['-e', 'io.write(_VERSION)'], { encoding: 'utf8' });
		if (r.status === 0 && /5\.1/.test(r.stdout)) return b;
	}
	throw new Error('no Lua 5.1 found (lua5.1, luajit or lua; or set LUA)');
}

// Guides and map frames of a compiled pack folder, as JSON (extract.lua).
function extract(dir, toc, out) {
	const files = fs.readFileSync(path.join(dir, toc), 'utf8').split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#') && /\.lua$/.test(l) && !/^Pack\.lua$/.test(l));
	const r = spawnSync(lua(), [path.join(__dirname, 'extract.lua'), out, ...files.map((f) => path.join(dir, f))], { encoding: 'utf8' });
	if (r.status !== 0) throw new Error(`extract failed: ${r.stderr}`);
}

function main() {
	const o = parse(process.argv.slice(2));
	if (o.worker) return work(o);
	const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pack-playtest-'));
	const packToc = fs.readdirSync(o.pack).find((f) => f.endsWith('.toc'));
	if (!packToc) throw new Error(`no .toc in ${o.pack}`);
	// The client (and Polestar's harness) needs the folder named as its TOC.
	const folder = packToc.replace(/\.toc$/, '');
	if (path.basename(o.pack) !== folder) {
		const copy = path.join(tmp, folder);
		fs.mkdirSync(copy);
		for (const f of fs.readdirSync(o.pack)) if (/\.(lua|toc|xml|txt)$/.test(f)) fs.copyFileSync(path.join(o.pack, f), path.join(copy, f));
		o.pack = copy;
	}
	extract(o.pack, packToc, path.join(tmp, 'pack.json'));
	extract(path.join(o.polestar, 'addon/Polestar_Guides'), 'Polestar_Guides.toc', path.join(tmp, 'ours.json'));
	const outs = [];
	const kids = [];
	for (let i = 0; i < o.jobs; i++) {
		const out = path.join(tmp, `w${i}.jsonl`);
		outs.push(out);
		const args = [o.polestar, '--pack', o.pack, '--worker', String(i), String(o.jobs), tmp, out];
		if (o.strict) args.push('--strict');
		if (o.far) args.push('--far');
		if (o.allClasses) args.push('--all-classes');
		if (o.filter) args.push('--filter', o.filter);
		kids.push(new Promise((resolve) => fork(__filename, args).on('exit', resolve)));
	}
	Promise.all(kids).then((codes) => {
		const results = outs.flatMap((f) => (fs.existsSync(f) ? fs.readFileSync(f, 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse) : []));
		if (o.out) fs.writeFileSync(o.out, results.map((r) => JSON.stringify(r)).join('\n') + '\n');
		const arr = (v) => (Array.isArray(v) ? v : v && typeof v === 'object' ? Object.values(v) : []);
		const failed = results.filter((r) => !r.ok);
		const blocked = results.flatMap((r) => arr(r.blocked).map((b) => ({ ...b, guide: r.guide, who: `${r.race} ${r.cls}` })));
		for (const r of failed) for (const l of r.lines) console.log(l);
		const byStep = new Map();
		for (const b of blocked) {
			const k = `${b.guide} step ${b.step}`;
			if (!byStep.has(k)) byStep.set(k, { b, who: new Set() });
			byStep.get(k).who.add(b.who);
		}
		for (const [k, { b, who }] of byStep) console.log(`held ${k} "${b.title || ''}": ${b.t} ${b.quest || ''} ${b.qtitle || b.text || ''} stays ${b.status} (${[...who].slice(0, 4).join(', ')}${who.size > 4 ? `, +${who.size - 4}` : ''})`);
		console.log(`playtest ${failed.length ? 'failed' : 'ok'}: ${new Set(results.map((r) => r.guide)).size} guides, ${results.length} plays: ${failed.length} not finished${o.strict ? `, ${byStep.size} steps held (${blocked.length} times)` : ''}`);
		fs.rmSync(tmp, { recursive: true, force: true });
		process.exitCode = failed.length || codes.some(Boolean) ? 1 : 0;
	});
}

function work(o) {
	const { index, count, tmp, out: outFile } = o.worker;
	const ROOT = o.polestar;
	// playtest.js with its internal helpers exported too.
	const file = path.join(ROOT, 'tools/lib/playtest.js');
	const m = new Module(file, module);
	m.filename = file;
	m.paths = Module._nodeModulePaths(path.dirname(file));
	m._compile(fs.readFileSync(file, 'utf8') + '\nmodule.exports.__internal = { personasFor, classPersonas, classesFor, outcome, chainDone, playGuide, luaValue, resultLines };', file);
	const { personasFor, classPersonas, classesFor, outcome, chainDone, playGuide, luaValue, resultLines } = m.exports.__internal;
	const SIM = simulate(m.exports.SIMULATE, o);
	const { tocEntries } = require(path.join(ROOT, 'tests/helpers/lua'));
	const pack = JSON.parse(fs.readFileSync(path.join(tmp, 'pack.json'), 'utf8'));
	const ours = JSON.parse(fs.readFileSync(path.join(tmp, 'ours.json'), 'utf8'));
	// Which classes each race can be (Forever client facts, Polestar's test fixture of data/forever/races.json).
	const data = { races: JSON.parse(fs.readFileSync(path.join(ROOT, 'tests/fixtures/dsl/data/races.json'), 'utf8')) };
	const names = {};
	for (const g of [...ours.guides, ...pack.guides]) if (g.zone && g.zoneName) names[g.zone] = g.zoneName;
	const frames = { ...ours.frames.forever, ...pack.frames.forever, ...ours.frames.era, ...pack.frames.era };
	const maps = Object.entries(frames)
		.map(([id, f]) => `w.addMap(${id}, { name = ${JSON.stringify(names[id] || '')}, c = ${f.c}, left = ${f.left}, right = ${f.right}, top = ${f.top}, bottom = ${f.bottom} })`)
		.join('\n');
	const loadPack = (folder, dir) => ['do local ns = {}', ...tocEntries(dir).map((f) => `assert(loadfile(${JSON.stringify(path.join(dir, f))}))(${JSON.stringify(folder)}, ns)`), 'end'].join('\n');
	const folder = path.basename(o.pack);
	const sim = { maps, loads: [loadPack('Polestar_Guides', path.join(ROOT, 'addon/Polestar_Guides')), loadPack(folder, o.pack)].join('\n') };
	const ourIds = new Set(ours.guides.map((g) => g.id));
	const packIds = new Set(pack.guides.map((g) => g.id));
	const chained = [...ours.guides, ...pack.guides];
	const arriving = new Map();
	for (const g of pack.guides) for (const to of g.nextChoices || (g.next ? [g.next] : [])) arriving.set(to, [...(arriving.get(to) || []), ...(g.races || [])]);
	const out = fs.openSync(outFile, 'w');
	pack.guides.forEach((g, i) => {
		if (i % count !== index) return;
		if (o.filter && !g.id.includes(o.filter)) return;
		const options = g.nextChoices && g.nextChoices.length ? g.nextChoices : g.next ? [g.next] : [];
		const handOver = options.some((id) => ourIds.has(id) && !packIds.has(id)) ? options : null;
		let personas = personasFor(g, arriving.get(g.id));
		personas = [...personas, ...classPersonas(data, g, personas)];
		for (const { race, faction } of personas) {
			const classes = o.allClasses ? data.races[race][faction].classes : classesFor(data, g, race, faction);
			for (const cls of classes) {
				let r;
				try {
					const pre = chainDone(chained, g, { race, faction, cls });
					const before = [pre.done.length ? `w.complete(${luaValue(pre.done)})` : '', ...pre.carried.map((q) => `w.onQuest(${q}, {})`)].join('\n');
					const [res, hand] = playGuide(sim, g, { race, faction, cls, handOver, before, script: SIM });
					const { stuck, problems } = outcome(res, handOver, hand, { race, faction, cls });
					r = { guide: g.id, race, faction, cls, ok: !stuck && !problems.length, stuck, problems, landed: hand ? hand.guide || null : null, visited: res.visited, steps: res.steps, blocked: res.blocked || [] };
				} catch (err) {
					r = { guide: g.id, race, faction, cls, ok: false, stuck: { step: null, title: null, reason: `harness error: ${String(err.message).slice(0, 2000)}` }, problems: [] };
				}
				r.lines = resultLines(r);
				fs.writeSync(out, JSON.stringify(r) + '\n');
			}
		}
	});
	fs.closeSync(out);
}

// Polestar's SIMULATE with --strict and --far.
function simulate(SIM, o) {
	const must = (s) => { if (!SIM.includes(s)) throw new Error(`Polestar's SIMULATE changed; this tool needs updating (${s.slice(0, 40)})`); };
	must('missing = missing, wrongPick = wrongPick');
	SIM = SIM.replace('local visited, stuck, guard = {}, nil, 0', 'local visited, stuck, guard = {}, nil, 0\nlocal blocked = {}');
	SIM = SIM.replace('missing = missing, wrongPick = wrongPick', 'missing = missing, wrongPick = wrongPick, blocked = blocked');
	if (o.far) {
		const A = 'local function act(i, g, r)\n\tlocal t, q = g.t, g.quest';
		must(A);
		SIM = SIM.replace(A, `local ANCHOR = { accept = true, turnin = true, goto = true, talk = true, getfp = true, sethome = true, train = true, vendor = true, buy = true }
local function far(i, r)
	if not (r.map and (r.t == "kill" or r.t == "collect" or r.t == "use" or r.t == "interact")) then return false end
	if r.map == G.zone then return false end
	local anchored = false
	for _, o in ipairs(G.steps[i].goals) do
		if o.map and ANCHOR[o.t] then
			anchored = true
			if o.map == r.map then return false end
		end
	end
	return anchored
end
${A}
	if far(i, r) then stub.advance(0.6) return end`);
	}
	if (o.strict) {
		const T1 = 'elseif t == "turnin" then\n\t\tif w.log[q] then w.finish(q) end\n\t\tw.turnIn(q)';
		must(T1);
		SIM = SIM.replace(T1, 'elseif t == "turnin" then\n\t\tif w.log[q] then w.finish(q); w.turnIn(q) end');
		const T2 = `		if same then
			stuck = { step = i, title = view.title, goal = open.index, t = open.t, text = open.text, status = after.goals[open.index].status }
			break
		end`;
		must(T2);
		SIM = SIM.replace(T2, `		if same then
			local src = G.steps[i].goals[open.index]
			blocked[#blocked + 1] = { step = i, title = view.title, goal = open.index, t = open.t, quest = src.quest, qtitle = src.title, text = open.text, status = after.goals[open.index].status }
			if not E.ToggleGoal(i, open.index) then
				stuck = { step = i, title = view.title, goal = open.index, t = open.t, text = open.text, status = after.goals[open.index].status }
				break
			end
			stub.advance(0.6)
			if left() then break end
		end`);
	}
	return SIM;
}

main();
