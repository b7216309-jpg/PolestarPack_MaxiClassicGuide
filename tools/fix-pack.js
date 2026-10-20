#!/usr/bin/env node
'use strict';
// Brings the compiled Guides.lua of this pack in line with how Polestar's own
// guides are built, using only facts that Polestar's compiled guides
// (addon/Polestar_Guides/Guides.lua in a Polestar clone) or this pack already
// hold. Every change is logged to fixes.json, per guide and step (step numbers
// as in the original build: step N is the Nth `step` of that .guide file), so
// it can be carried over to the .guide sources.
//
//   node tools/fix-pack.js <polestar clone> [--in Guides.lua] [--out Guides.lua] [--log fixes.json]
//
// The fixes, in order:
//   1. vendor items: a collect goal for a vendor item that points at a far-off
//      source is replaced with Polestar's buy goal for that item (Bronze Tube).
//   2. only: a quest that Polestar's guides limit to some classes (and races)
//      everywhere they use it gets the same limit on every goal of it here.
//   3. far objectives: an objective on a map that neither the guide's zone nor
//      its step's accepts, turn-ins and gotos are on held that step until done
//      elsewhere; it moves to the step of the route on that map nearest to it,
//      between the quest's accept and its turn-in.
//   4. titles: quest titles that differ from Polestar's only in case or
//      punctuation ("Look To The Stars") take Polestar's.
//   5. grouping: consecutive steps of accepts and turn-ins at one spot (same
//      map, within GROUP_YARDS of each other, same floor) become one step, as
//      Polestar groups a hub.

const fs = require('node:fs');
const path = require('node:path');
const L = require('./luatable');

// Grouping, measured on Polestar's own hub steps (the NPCs of a multi-NPC step
// lie a median 82 yards apart, 167 at the 75th percentile).
const GROUP_YARDS = 60; // each NPC of the next step this close to one of the step
const GROUP_SPREAD = 120; // and no two NPCs of the merged step farther apart
const GROUP_Z = 10; // floors and elevators: height difference allowed within one step
const GROUP_MAX = 16; // goals (notes aside) in a merged step
const MERGEABLE = new Set(['accept', 'turnin', 'note', 'talk', 'getfp', 'sethome', 'train']);
const OBJECTIVE = new Set(['kill', 'collect', 'use', 'interact']);
const ANCHOR = new Set(['accept', 'turnin', 'goto', 'talk', 'getfp', 'sethome', 'train', 'vendor', 'buy']);
const JOIN_YARDS = 60; // a moved objective joins a step this close; farther, it gets a step of its own

function args(argv) {
	const o = { polestar: null, in: 'Guides.lua', out: 'Guides.lua', log: 'fixes.json', maps: 'MapFrames.lua' };
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--in') o.in = argv[++i];
		else if (a === '--out') o.out = argv[++i];
		else if (a === '--log') o.log = argv[++i];
		else if (a === '--maps') o.maps = argv[++i];
		else o.polestar = a;
	}
	if (!o.polestar) throw new Error('usage: fix-pack.js <polestar clone> [--in f] [--out f] [--log f]');
	return o;
}

// MapFrames.lua -> { era: { [map]: frame }, forever: {...} }
function readFrames(file) {
	const text = fs.readFileSync(file, 'utf8');
	const out = { era: {}, forever: {} };
	let kind = null;
	for (const line of text.split('\n')) {
		const k = /^\t(era|forever) = \{/.exec(line);
		if (k) { kind = k[1]; continue; }
		const m = /^\t\t\[(\d+)\] = \{ c = (-?\d+), left = (-?[\d.]+), right = (-?[\d.]+), top = (-?[\d.]+), bottom = (-?[\d.]+) \}/.exec(line);
		if (m && kind) out[kind][m[1]] = { left: +m[3], right: +m[4], top: +m[5], bottom: +m[6] };
	}
	return out;
}

function main() {
	const o = args(process.argv.slice(2));
	const ourFile = path.join(o.polestar, 'addon/Polestar_Guides/Guides.lua');
	const text = fs.readFileSync(o.in, 'utf8');
	const pack = L.parseGuides(text);
	const ours = L.parseGuides(fs.readFileSync(ourFile, 'utf8'));
	const frames = readFrames(path.join(o.polestar, 'addon/Polestar_Guides/MapFrames.lua'));
	const own = readFrames(o.maps);
	for (const k of ['era', 'forever']) Object.assign(frames[k], own[k]);
	const log = [];
	const note = (guide, step, fix, detail) => log.push({ guide, step, fix, ...detail });

	// Views: guide id -> { block, node, steps: [{ node, goals: [{ node, js }] }] }
	const view = (file) =>
		file.blocks.map((b) => {
			const g = b.guide;
			const js = (k) => { const v = L.get(g, k); return v ? L.toJS(v) : undefined; };
			const steps = L.get(g, 'steps').table.map((e, i) => Object.assign(stepView(e.value), { orig: i + 1 }));
			return { block: b, node: g, id: js('id'), zone: js('zone'), races: js('races'), classes: js('classes'), next: js('next'), nextChoices: js('nextChoices'), faction: js('faction'), steps };
		});
	const P = view(pack);
	const O = view(ours);
	const byId = new Map(P.map((g) => [g.id, g]));

	// --- yards between two located goals (same map), or Infinity
	function yards(a, b) {
		if (!a || !b || a.map !== b.map || a.x == null || b.x == null) return Infinity;
		const f = (a.f === 'l' ? frames.forever[a.map] || frames.era[a.map] : frames.era[a.map] || frames.forever[a.map]);
		if (!f) return Infinity;
		return Math.hypot(((f.left - f.right) * (a.x - b.x)) / 100, ((f.top - f.bottom) * (a.y - b.y)) / 100);
	}

	// ---------------------------------------------------------------- 1. vendor items
	// Polestar's buy goals by item, with the guide holding them (for its names).
	const buys = new Map();
	for (const g of O) for (const s of g.steps) for (const x of s.goals) if (x.js.t === 'buy' && x.js.item && x.js.npc && !x.js.optional && !buys.has(x.js.item)) buys.set(x.js.item, { goal: x, guide: g });
	for (const g of P) {
		g.steps.forEach((s, si) => {
			s.goals.forEach((x, gi) => {
				const j = x.js;
				if (j.t !== 'collect' || !j.item || !buys.has(j.item)) return;
				const near = s.goals.some((y) => y !== x && y.js.map === j.map && (y.js.t === 'accept' || y.js.t === 'turnin'));
				if (near || j.map === g.zone) return; // collected where the step is: leave it
				const b = buys.get(j.item);
				if (b.goal.js.map !== g.zone && !s.goals.some((y) => y.js.map === b.goal.js.map)) return; // Polestar's vendor is not here either
				const repl = { src: b.goal.node.src, table: b.goal.node.table };
				s.node.goals.table[gi].value = repl;
				s.goals[gi] = { node: repl, js: L.toJS(repl) };
				copyNames(b.guide, g, s.goals[gi].js);
				note(g.id, si + 1, 'vendor item', { line: guideLine(j), newLine: guideLine(s.goals[gi].js), item: j.item, itemName: j.itemName, quest: j.quest, was: `collect from ${(j.fromNpcs || []).map((n) => n.npcName).join(', ') || j.from || '?'} on map ${j.map}`, now: `buy from ${b.goal.js.npcName} (npc ${b.goal.js.npc}) on map ${b.goal.js.map}, as ${b.guide.id}` });
			});
		});
	}

	// ---------------------------------------------------------------- 2. only
	// Per quest, the classes and races Polestar's guides limit it to, wherever
	// they use it: a goal's own `only`, else its step's, else the guide's
	// `classes` header (races: goal or step only; a guide's race header is its
	// route, not the quest's rule). Kept only when every use is limited; the
	// intersection of the uses (each a superset of who can do it).
	const limits = new Map();
	for (const g of O) {
		for (const s of g.steps) {
			const so = s.js.only || {};
			for (const x of s.goals) {
				const q = x.js.quest;
				if (!q) continue;
				const go = x.js.only || {};
				const classes = arr(go.classes).length ? arr(go.classes) : arr(so.classes).length ? arr(so.classes) : arr(g.classes);
				const races = arr(go.races).length ? arr(go.races) : arr(so.races);
				if (!limits.has(q)) limits.set(q, []);
				limits.get(q).push({ classes: classes.map((c) => String(c).toUpperCase()), races, neg: [...classes, ...races].some((v) => String(v).startsWith('!')) });
			}
		}
	}
	const onlyFor = new Map();
	for (const [q, uses] of limits) {
		if (uses.some((u) => u.neg) || !uses.every((u) => u.classes.length)) continue;
		let classes = uses[0].classes;
		for (const u of uses) classes = classes.filter((c) => u.classes.includes(c));
		if (!classes.length) continue;
		let races = null;
		if (uses.every((u) => u.races.length)) {
			races = uses[0].races;
			for (const u of uses) races = races.filter((r) => u.races.includes(r));
			if (!races.length) races = null;
		}
		onlyFor.set(q, { classes, races });
	}
	const ONLY_BEFORE = ['note', 'optional', 'text', 'tip'];
	for (const g of P) {
		g.steps.forEach((s, si) => {
			const added = new Map();
			s.goals.forEach((x) => {
				const lim = x.js.quest && onlyFor.get(x.js.quest);
				if (!lim || x.js.only || s.js.only) return;
				if (lim.races && g.races && !g.races.some((r) => lim.races.includes(r))) return; // this guide's races cannot do it at all: leave it to the author
				const only = { classes: lim.classes };
				if (lim.races) only.races = lim.races;
				const parsed = parseValue(L.lit(only));
				L.set(x.node, 'only', parsed, ONLY_BEFORE);
				x.js = L.toJS(x.node);
				added.set(`${x.js.t} ${x.js.quest}`, guideLine(x.js));
			});
			if (added.size) note(g.id, si + 1, 'only', { lines: [...added.values()] });
		});
	}

	// ---------------------------------------------------------------- 3. far objectives
	// Route order: from each guide, its steps, then its `next` (first option), on.
	const routeFrom = (g, si) => {
		const out = [];
		const seen = new Set();
		let cur = g;
		let start = si;
		while (cur && !seen.has(cur.id)) {
			seen.add(cur.id);
			for (let i = start; i < cur.steps.length; i++) out.push({ g: cur, si: i });
			const nx = (cur.nextChoices && cur.nextChoices[0]) || cur.next;
			cur = nx && byId.get(nx);
			start = 0;
		}
		return out;
	};
	// Far: an objective on a map that is not the guide's zone, in a step whose
	// accepts, turn-ins, gotos and NPC visits (its anchors) all lie on other
	// maps. A step of objectives alone is where the player goes: never far.
	const isFar = (g, s, j) => {
		if (!OBJECTIVE.has(j.t) || !j.map || j.optional) return false;
		if (j.map === g.zone) return false;
		const anchors = s.goals.filter((y) => ANCHOR.has(y.js.t) && y.js.map);
		return anchors.length > 0 && !anchors.some((y) => y.js.map === j.map);
	};
	const moves = [];
	for (const g of P) {
		g.steps.forEach((s, si) => {
			s.goals.forEach((x) => {
				const j = x.js;
				if (!isFar(g, s, j)) return;
				if (!j.quest) { moves.push({ g, si, x, best: null, why: 'no quest to follow it to' }); return; }
				// Candidates: later steps on that map, up to and with the quest's turn-in.
				const route = routeFrom(g, si + 1);
				const pts = [j, ...arr(j.spots).map((p) => ({ ...p, map: j.map, f: j.f }))];
				let best = null;
				for (const r of route) {
					const st = r.g.steps[r.si];
					const turnin = st.goals.some((y) => y.js.t === 'turnin' && y.js.quest === j.quest);
					const on = st.goals.filter((y) => y !== x && y.js.map === j.map && y.js.x != null);
					if (on.length) {
						const d = Math.min(...on.flatMap((y) => pts.map((p) => yards(p, y.js))));
						if (!best || d < best.d) best = { ...r, d, turnin };
					}
					if (turnin) break;
				}
				moves.push({ g, si, x, best, why: best ? null : 'no later step of the route is on that map before the turn-in' });
			});
		});
	}
	const describe = (j) => `${j.t} ${j.quest ? j.quest + (j.oi ? '.' + j.oi : '') : ''} ${j.itemName || j.target || j.objName || ''} (map ${j.map})`.replace(/\s+/g, ' ').trim();
	const newSteps = new Map(); // "guide|step|before" -> { g, si, before, goals: [x] }
	for (const m of moves) {
		const j = m.x.js;
		if (!m.best) {
			// It stays where it is, optional: it no longer holds the step.
			L.set(m.x.node, 'optional', { src: 'true' }, ['note']);
			m.x.js = L.toJS(m.x.node);
			note(m.g.id, m.si + 1, 'far objective', { goal: describe(j), line: guideLine(m.x.js), action: 'optional', now: `optional in place: ${m.why}` });
			continue;
		}
		const src = m.g.steps[m.si];
		const at = src.goals.indexOf(m.x);
		src.goals.splice(at, 1);
		src.node.goals.table.splice(at, 1);
		src.node.goals.dirty = true;
		if (m.best.g !== m.g) copyNames(m.g, m.best.g, j);
		const dst = m.best.g.steps[m.best.si];
		if (m.best.d <= JOIN_YARDS) {
			const ti = dst.goals.findIndex((y) => y.js.t === 'turnin' && y.js.quest === j.quest);
			const pos = ti >= 0 ? ti : dst.goals.length;
			dst.goals.splice(pos, 0, m.x);
			dst.node.goals.table.splice(pos, 0, { value: m.x.node });
			dst.node.goals.dirty = true;
			note(m.g.id, m.si + 1, 'far objective', { goal: describe(j), line: guideLine(j), action: 'moved', to: { guide: m.best.g.id, step: m.best.g.steps[m.best.si].orig }, now: `moved into ${m.best.g.id} step ${m.best.g.steps[m.best.si].orig} "${dst.js.title || ''}" (${Math.round(m.best.d)} yd away)` });
		} else {
			// A step of its own: after the nearest step, or before it when that step hands the quest in.
			const key = `${m.best.g.id}|${m.best.si}|${m.best.turnin}`;
			if (!newSteps.has(key)) newSteps.set(key, { g: m.best.g, si: m.best.si, before: m.best.turnin, goals: [], from: [] });
			const ns = newSteps.get(key);
			ns.goals.push(m.x);
			ns.from.push({ guide: m.g.id, step: m.g.steps[m.si].orig, line: guideLine(j), goal: describe(j), yards: Math.round(m.best.d) });
		}
	}
	// Insert the new steps, last first so the indices hold.
	const pending = [...newSteps.values()].sort((a, b) => (a.g.id === b.g.id ? b.si - a.si || (a.before ? 1 : -1) : a.g.id < b.g.id ? -1 : 1));
	for (const ns of pending) {
		const steps = L.get(ns.g.node, 'steps');
		const first = ns.goals[0].js;
		let title;
		if (first.t === 'kill' && first.npc) { title = `{npc:${first.npc}}`; if (first.target) addName(ns.g, `npc:${first.npc}`, first.target); }
		else if (first.t === 'interact' && first.object) { title = `{object:${first.object}}`; if (first.objName) addName(ns.g, `object:${first.object}`, first.objName); }
		else if (first.item) { title = `{item:${first.item}}`; if (first.itemName) addName(ns.g, `item:${first.item}`, first.itemName); }
		else title = first.title ? `{quest:${first.quest}}` : 'Objective';
		if (title.startsWith('{quest:') && first.title) addName(ns.g, `quest:${first.quest}`, first.title);
		const node = { table: [L.entry('title', { src: JSON.stringify(title) }), L.entry('goals', { table: ns.goals.map((x) => ({ value: x.node })), dirty: true })], dirty: true };
		node.goals = L.get(node, 'goals');
		const pos = ns.before ? ns.si : ns.si + 1;
		steps.table.splice(pos, 0, { value: node });
		steps.dirty = true;
		ns.g.steps.splice(pos, 0, { node, js: { title }, goals: ns.goals.slice() });
		note(ns.g.id, ns.g.steps[ns.before ? pos + 1 : pos - 1].orig, 'far objective', { action: 'new step', title, where: ns.before ? 'before' : 'after', now: `new step "${title}" ${ns.before ? 'before' : 'after'} this step`, goals: ns.from });
	}

	// ---------------------------------------------------------------- 4. titles
	const norm = (t) => String(t).toLowerCase().replace(/[^a-z0-9]/g, '');
	const ourTitle = new Map();
	for (const g of O) for (const s of g.steps) for (const x of s.goals) if (x.js.quest && x.js.title && !ourTitle.has(x.js.quest)) ourTitle.set(x.js.quest, x.js.title);
	const retitled = new Map();
	for (const g of P) {
		g.steps.forEach((s) => {
			for (const x of s.goals) {
				const t = x.js.quest && ourTitle.get(x.js.quest);
				if (t && x.js.title && x.js.title !== t && norm(x.js.title) === norm(t.replace(/^WANTED:/i, 'Wanted'))) {
					retitled.set(x.js.quest, `${x.js.title} -> ${t}`);
					L.set(x.node, 'title', { src: JSON.stringify(t) });
					x.js = L.toJS(x.node);
				}
				// prerequisites' titles as well
				const pt = L.get(x.node, 'preTitles');
				if (pt) for (const e of pt.table) {
					const tt = ourTitle.get(Number(e.key));
					const cur = L.toJS(e.value);
					if (tt && cur !== tt && norm(cur) === norm(tt.replace(/^WANTED:/i, 'Wanted'))) { e.value = { src: JSON.stringify(tt) }; pt.dirty = true; x.node.dirty = true; }
				}
			}
		});
	}
	// titles in a guide's names (tokens {quest:N} in step titles)
	for (const g of P) {
		const names = L.get(g.node, 'names');
		if (!names) continue;
		for (const e of names.table) {
			const m = /^quest:(\d+)$/.exec(e.key);
			const tt = m && ourTitle.get(Number(m[1]));
			const cur = L.toJS(e.value);
			if (tt && cur !== tt && norm(cur) === norm(tt.replace(/^WANTED:/i, 'Wanted'))) { e.value = { src: JSON.stringify(tt) }; names.dirty = true; }
		}
	}
	for (const [q, change] of retitled) note(null, null, 'title', { quest: q, change });

	// ---------------------------------------------------------------- 5. grouping
	// Polestar's area titles of hubs, by NPC: a step titled {area:N} holding the NPC's accepts or turn-ins.
	const areaOf = new Map();
	for (const g of O) {
		const names = L.get(g.node, 'names');
		const nm = names ? L.toJS(names) : {};
		for (const s of g.steps) {
			const m = /^\{area:(\d+)\}$/.exec(s.js.title || '');
			if (!m) continue;
			for (const x of s.goals) {
				if ((x.js.t === 'accept' || x.js.t === 'turnin') && x.js.npc) {
					const c = areaOf.get(x.js.npc) || new Map();
					c.set(m[1], { n: ((c.get(m[1]) || {}).n || 0) + 1, name: nm[`area:${m[1]}`] });
					areaOf.set(x.js.npc, c);
				}
			}
		}
	}
	const located = (s) => s.goals.filter((x) => x.js.map && x.js.x != null && x.js.t !== 'note');
	const plainStep = (s) => s.goals.length && s.goals.every((x) => MERGEABLE.has(x.js.t) && !x.js.escort && !x.js.group) && s.goals.some((x) => x.js.t !== 'note') && s.node.table.every((e) => e.key === 'title' || e.key === 'goals');
	for (const g of P) {
		const steps = L.get(g.node, 'steps');
		let merged = 0;
		for (let i = 0; i + 1 < g.steps.length; ) {
			const a = g.steps[i];
			const b = g.steps[i + 1];
			const la = located(a);
			const lb = located(b);
			const ok =
				plainStep(a) && plainStep(b) && la.length && lb.length &&
				lb.every((y) => la.some((x) => yards(x.js, y.js) <= GROUP_YARDS)) &&
				la.every((x) => lb.every((y) => yards(x.js, y.js) <= GROUP_SPREAD)) &&
				la.every((x) => lb.every((y) => x.js.z == null || y.js.z == null || Math.abs(x.js.z - y.js.z) <= GROUP_Z)) &&
				a.goals.filter((x) => x.js.t !== 'note').length + b.goals.filter((x) => x.js.t !== 'note').length <= GROUP_MAX;
			if (!ok) { i++; continue; }
			const before = { a: a.js.title, b: b.js.title };
			// Each step's notes come along, once: "Inside the building." on every
			// trainer of a hall is one note in the hall's step.
			const notes = new Set(a.goals.filter((x) => x.js.t === 'note').map((x) => x.js.text));
			for (const x of b.goals) {
				if (x.js.t === 'note' && notes.has(x.js.text)) continue;
				if (x.js.t === 'note') notes.add(x.js.text);
				a.goals.push(x);
				a.node.goals.table.push({ value: x.node });
			}
			a.node.goals.dirty = true;
			g.steps.splice(i + 1, 1);
			steps.table.splice(i + 1, 1);
			steps.dirty = true;
			a.merged = (a.merged || [before.a]).concat([before.b]);
			a.mergedOrig = (a.mergedOrig || [a.orig]).concat([b.orig]);
			merged++;
		}
		// Titles of merged steps: one NPC keeps its title; a hub Polestar names by
		// its area takes that name; else the NPCs, two or three of them.
		g.steps.forEach((s, si) => {
			if (!s.merged) return;
			const npcs = [...new Set(s.goals.filter((x) => (x.js.t === 'accept' || x.js.t === 'turnin') && x.js.npc).map((x) => x.js.npc))];
			let title;
			if (!npcs.length) title = s.merged.find(Boolean); // no quest NPC: the first step's own title
			else if (npcs.length === 1) title = `{npc:${npcs[0]}}`;
			else {
				const votes = new Map();
				for (const n of npcs) for (const [area, v] of areaOf.get(n) || []) votes.set(area, { n: ((votes.get(area) || {}).n || 0) + v.n, name: v.name });
				const best = [...votes].sort((p, q) => q[1].n - p[1].n)[0];
				if (best && best[1].name) {
					title = `{area:${best[0]}}`;
					addName(g, `area:${best[0]}`, best[1].name);
				} else if (npcs.length <= 3) title = npcs.map((n) => `{npc:${n}}`).join(npcs.length === 2 ? ' and ' : ', ').replace(/, (\{npc:\d+\})$/, ' and $1');
				else title = `{npc:${npcs[0]}} and nearby`;
			}
			for (const n of npcs) {
				const x = s.goals.find((y) => y.js.npc === n && y.js.npcName);
				if (x) addName(g, `npc:${n}`, x.js.npcName);
			}
			if (title) {
				L.set(s.node, 'title', { src: JSON.stringify(title) }, ['goals']);
				s.js = L.toJS(s.node);
			}
			note(g.id, s.mergedOrig[0], 'grouped', { steps: s.mergedOrig, titles: s.merged, title });
		});
	}

	fs.writeFileSync(o.out, L.writeGuides(pack));
	fs.writeFileSync(o.log, JSON.stringify(log, null, 1) + '\n');
	const count = (fix) => log.filter((e) => e.fix === fix).length;
	console.log(`vendor items ${count('vendor item')}, only on ${count('only')} steps, far objectives ${count('far objective')}, titles ${count('title')}, grouped steps ${count('grouped')}`);

	function stepView(node) {
		const goals = (L.get(node, 'goals') || { table: [] }).table.map((e) => ({ node: e.value, js: L.toJS(e.value) }));
		const sv = { node, js: {}, goals };
		node.goals = L.get(node, 'goals');
		for (const e of node.table) if (e.key !== 'goals') sv.js[e.key] = L.toJS(e.value);
		return sv;
	}
	function addName(g, key, value) {
		let names = L.get(g.node, 'names');
		if (!names) return;
		if (names.table.some((e) => e.key === key)) return;
		names.table.push(L.entry(key, { src: JSON.stringify(value) }));
		names.table.sort((p, q) => (p.key < q.key ? -1 : p.key > q.key ? 1 : 0));
		names.dirty = true;
	}
	// Names a goal's tokens need, from the guide it comes from.
	function copyNames(from, to, j) {
		const fromNames = L.get(from.node, 'names');
		const nm = fromNames ? L.toJS(fromNames) : {};
		const tokens = new Set();
		for (const v of Object.values(j)) if (typeof v === 'string') for (const t of v.matchAll(/\{([a-z]+:\d+)\}/g)) tokens.add(t[1]);
		for (const t of tokens) if (nm[t]) addName(to, t, nm[t]);
	}
}

const arr = (v) => (Array.isArray(v) ? v : []);
const titleCase = (c) => c.charAt(0) + c.slice(1).toLowerCase();
// A compiled goal as the .guide line it most likely came from (ids only).
function guideLine(j) {
	const q = j.quest ? ` quest ${j.quest}${j.oi ? '.' + j.oi : ''}` : '';
	const n = j.count && j.count > 1 ? ` x${j.count}` : '';
	const only = j.only ? ` only ${[...arr(j.only.races).map((r) => (r === 'Scourge' ? 'Undead' : r)), ...arr(j.only.classes).map(titleCase)].join(',')}` : '';
	const opt = j.optional ? ' optional' : '';
	if (j.t === 'accept' || j.t === 'turnin') return `${j.t} ${j.quest}${only}${opt}`;
	if (j.t === 'collect') return `collect ${j.item}${n}${q}${only}${opt}`;
	if (j.t === 'kill') return `kill ${j.npc}${n}${q}${only}${opt}`;
	if (j.t === 'interact') return `interact ${j.object}${q}${only}${opt}`;
	if (j.t === 'use') return `use ${j.item}${q}${only}${opt}`;
	if (j.t === 'buy') return `buy ${j.item}${n || ' x1'}${j.npc ? ' npc ' + j.npc : ''}${opt}`;
	return `${j.t}${q}`;
}
function parseValue(src) {
	const L2 = require('./luatable');
	// parse a literal by wrapping it in a guide-shaped table
	const f = L2.parseGuides(`-- x\n\n-- Source: x\ndo\n\tlocal function register()\n\t\tPolestar.RegisterGuide({ v = ${src} })\n\tend\n\tregister()\nend\n`);
	return L2.get(f.blocks[0].guide, 'v');
}

main();
