#!/usr/bin/env node
'use strict';
// Turns fixes.json (tools/fix-pack.js) into PORTING.md: the same changes as
// edits to the .guide sources, file by file, step by step, so that the next
// `polestar compile` keeps them.
//
//   node tools/fixes-report.js [--log fixes.json] [--before Guides.orig.lua] [--after Guides.lua] [--out PORTING.md]

const fs = require('node:fs');
const L = require('./luatable');

const o = { log: 'fixes.json', before: 'Guides.orig.lua', after: 'Guides.lua', out: 'PORTING.md' };
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i += 2) o[argv[i].replace(/^--/, '')] = argv[i + 1];

const log = JSON.parse(fs.readFileSync(o.log, 'utf8'));
const source = new Map(); // guide id -> its .guide file
const names = new Map(); // guide id -> names (after the fixes)
for (const b of L.parseGuides(fs.readFileSync(o.before, 'utf8')).blocks) source.set(L.toJS(L.get(b.guide, 'id')), b.source);
for (const b of L.parseGuides(fs.readFileSync(o.after, 'utf8')).blocks) {
	const n = L.get(b.guide, 'names');
	names.set(L.toJS(L.get(b.guide, 'id')), n ? L.toJS(n) : {});
}
// "{area:77}" -> "Anvilmar", with the guide's names.
const plain = (guide, text) => String(text || '').replace(/\{([a-z]+:\d+)\}/g, (m, k) => (names.get(guide) || {})[k] || m);
const file = (guide) => source.get(guide) || guide;

const items = new Map(); // file -> [{ step, text }]
const add = (guide, step, text) => {
	const f = file(guide);
	if (!items.has(f)) items.set(f, []);
	items.get(f).push({ step: step || 0, text });
};
const code = (s) => `\`${s}\``;

for (const e of log) {
	if (e.fix === 'only') add(e.guide, e.step, `step ${e.step}: add the class/race limit to ${e.lines.length === 1 ? 'this goal' : 'these goals'}: ${e.lines.map(code).join(', ')}`);
	else if (e.fix === 'vendor item') add(e.guide, e.step, `step ${e.step}: replace ${code(e.line)} with ${code(e.newLine)} (${e.itemName}: ${e.now})`);
	else if (e.fix === 'grouped') add(e.guide, e.step, `steps ${e.steps.join(', ')}: make them one step, ${code(`step ${plain(e.guide, e.title)}`)}, holding the goals of all of them in this order (they were ${e.titles.map((t) => code(plain(e.guide, t))).join(', ')})`);
	else if (e.fix === 'far objective' && e.action === 'optional') add(e.guide, e.step, `step ${e.step}: end ${code(e.line.replace(/ optional$/, ''))} with \`optional\` (${e.now.replace(/^optional in place: /, '')}); it held the step until done in another zone`);
	else if (e.fix === 'far objective' && e.action === 'moved') {
		add(e.guide, e.step, `step ${e.step}: take ${code(e.line)} out (it held the step until done on another map); it goes to ${file(e.to.guide) === file(e.guide) ? '' : `${code(file(e.to.guide))} `}step ${e.to.step}`);
		add(e.to.guide, e.to.step, `step ${e.to.step}: add ${code(e.line)}${file(e.to.guide) === file(e.guide) ? ` (from step ${e.step})` : ` (from ${code(file(e.guide))} step ${e.step})`}, before the quest's turn-in if the step has it`);
	} else if (e.fix === 'far objective' && e.action === 'new step') {
		for (const g of e.goals) add(g.guide, g.step, `step ${g.step}: take ${code(g.line)} out (it held the step until done on another map); it goes to a new step in ${code(file(e.guide))}, ${e.where} step ${e.step}`);
		add(e.guide, e.step, `${e.where} step ${e.step}: a new step, ${code(`step ${plain(e.guide, e.title)}`)}, with ${e.goals.map((g) => `${code(g.line)} (from ${code(file(g.guide))} step ${g.step}, ${g.yards} yd from step ${e.step})`).join(', ')}`);
	}
}
const titles = log.filter((e) => e.fix === 'title');

const out = [];
out.push('# Porting the fixes to the .guide sources');
out.push('');
out.push('`Guides.lua` on this branch was changed by `tools/fix-pack.js`, not compiled from the .guide files: the next `node tools/polestar.js compile` from the sources as they are puts every problem back. These are the same changes as edits to the sources.');
out.push('');
out.push('Step numbers are those of the original build (`main`): step N should be the Nth `step` line of the file, assuming the compiler makes one step per `step` line (not checked: the sources were not available; compare the step titles with your file before editing). The goal lines are rebuilt from the compiled goals (ids only): yours may carry names or comments too, and a line shows the `only` this list adds to it elsewhere (search for it without that). Work through a file from its last step to its first so the numbers above stay right while you edit.');
out.push('');
out.push(`${log.filter((e) => e.fix !== 'title').length} changes in ${items.size} files.`);
out.push('');
for (const [f, list] of [...items].sort((a, b) => (a[0] < b[0] ? -1 : 1))) {
	out.push(`## ${f}`);
	out.push('');
	for (const it of list.sort((a, b) => a.step - b.step)) out.push(`- ${it.text}`);
	out.push('');
}
if (titles.length) {
	out.push('## Quest titles');
	out.push('');
	out.push("These titles come from the reference data, not from the .guide files: they differ from the titles Polestar's newer data gives the same quests only in case or punctuation. A fresh `node tools/polestar.js data build` before compiling should bring the same; or write the title in the .guide line.");
	out.push('');
	for (const e of titles) out.push(`- quest ${e.quest}: ${e.change.replace(' -> ', ' → ')}`);
	out.push('');
}
fs.writeFileSync(o.out, out.join('\n'));
console.log(`${o.out}: ${items.size} files, ${log.length} changes`);
