'use strict';
// Reads and writes the compiled Guides.lua of a Polestar pack, keeping the
// source text of every value that is not changed, so an untouched file
// writes back byte for byte.
//
//   const file = parseGuides(text);  // { head, blocks: [{ source, guide, entries }] }
//   writeGuides(file) === text       // when nothing was changed

// A value: { src } (scalar, or a table left as written) or { table: [entry] }.
// An entry: { key, keySrc, value } (keySrc as written: `id`, `[179]`, `["x"]`)
// or { value } for a positional one.

function parseTable(text, start) {
	let i = start;
	const ws = () => {
		while (i < text.length) {
			if (/\s/.test(text[i])) i++;
			else if (text.startsWith('--', i)) { while (i < text.length && text[i] !== '\n') i++; }
			else break;
		}
	};
	function str() {
		const q = text[i];
		let j = i + 1;
		while (text[j] !== q) {
			if (text[j] === '\\') j++;
			j++;
			if (j >= text.length) throw new Error(`unterminated string at ${i}`);
		}
		const src = text.slice(i, j + 1);
		i = j + 1;
		return src;
	}
	function value() {
		ws();
		const c = text[i];
		if (c === '{') return table();
		if (c === '"' || c === "'") return { src: str() };
		const m = /^(-?(?:\d+\.?\d*(?:[eE][+-]?\d+)?|\.\d+)|true|false|nil)/.exec(text.slice(i, i + 64));
		if (!m) throw new Error(`unexpected ${JSON.stringify(text.slice(i, i + 30))} at ${i}`);
		i += m[0].length;
		return { src: m[0] };
	}
	function table() {
		const open = i;
		i++; // {
		const entries = [];
		for (;;) {
			ws();
			if (text[i] === '}') { i++; break; }
			let key = null;
			let keySrc = null;
			if (text[i] === '[') {
				const k0 = i;
				i++;
				ws();
				const kv = value();
				ws();
				if (text[i] !== ']') throw new Error(`] expected at ${i}`);
				i++;
				keySrc = text.slice(k0, i);
				key = kv.src.startsWith('"') ? JSON.parse(kv.src) : Number(kv.src);
				ws();
				if (text[i] !== '=') throw new Error(`= expected at ${i}`);
				i++;
			} else {
				const m = /^[A-Za-z_][A-Za-z0-9_]*\s*=(?!=)/.exec(text.slice(i, i + 80));
				if (m) {
					key = keySrc = m[0].replace(/\s*=$/, '');
					i += m[0].length;
				}
			}
			const v = value();
			entries.push(key === null ? { value: v } : { key, keySrc, value: v });
			ws();
			if (text[i] === ',' || text[i] === ';') i++;
		}
		return { table: entries, src: text.slice(open, i) };
	}
	ws();
	const t = table();
	return { node: t, end: i };
}

// Lua value of a node, as plain JS (tables: arrays when positional, else objects).
function toJS(node) {
	if (!node.table) {
		const s = node.src;
		if (s.startsWith('"')) return JSON.parse(s);
		if (s === 'true') return true;
		if (s === 'false') return false;
		if (s === 'nil') return null;
		return Number(s);
	}
	if (node.table.every((e) => e.key === undefined)) return node.table.map((e) => toJS(e.value));
	const o = {};
	for (const e of node.table) o[e.key === undefined ? '?' : e.key] = toJS(e.value);
	return o;
}

const luaStr = (s) => JSON.stringify(s); // compiled strings are JSON-safe double-quoted
// A JS value as an inline Lua literal, as the compiler writes one.
function lit(v) {
	if (v === null || v === undefined) return 'nil';
	if (typeof v === 'string') return luaStr(v);
	if (typeof v === 'number' || typeof v === 'boolean') return String(v);
	if (Array.isArray(v)) return v.length ? `{ ${v.map(lit).join(', ')} }` : '{}';
	const keys = Object.keys(v).filter((k) => v[k] !== undefined && v[k] !== null);
	return keys.length ? `{ ${keys.map((k) => `${/^[A-Za-z_]\w*$/.test(k) ? k : `[${luaStr(k)}]`} = ${lit(v[k])}`).join(', ')} }` : '{}';
}
const srcOf = (node) => (node.src !== undefined && !node.dirty ? node.src : inline(node));
function inline(node) {
	if (!node.table) return node.src;
	if (!node.table.length) return '{}';
	return `{ ${node.table.map((e) => (e.key === undefined ? srcOf(e.value) : `${e.keySrc} = ${srcOf(e.value)}`)).join(', ')} }`;
}
const entry = (key, value) => ({ key, keySrc: /^[A-Za-z_]\w*$/.test(key) ? key : `[${luaStr(key)}]`, value });
const get = (node, key) => (node.table.find((e) => e.key === key) || {}).value;
function set(node, key, value, before = null) {
	const at = node.table.findIndex((e) => e.key === key);
	if (at >= 0) node.table[at].value = value;
	else {
		const b = before ? node.table.findIndex((e) => before.includes(e.key)) : -1;
		if (b >= 0) node.table.splice(b, 0, entry(key, value));
		else node.table.push(entry(key, value));
	}
	node.dirty = true;
}
function remove(node, key) {
	const at = node.table.findIndex((e) => e.key === key);
	if (at >= 0) { node.table.splice(at, 1); node.dirty = true; }
}

const HEAD_RE = /^([\s\S]*?\n\n)(?=-- Source: )/;
const BLOCK_RE = /-- Source: ([^\n]*)\ndo\n\tlocal function register\(\)\n\t\tPolestar\.RegisterGuide\(/g;
const TAIL = ')\n\tend\n\tregister()\nend\n';

function parseGuides(text) {
	const head = HEAD_RE.exec(text);
	if (!head) throw new Error('no header');
	const blocks = [];
	BLOCK_RE.lastIndex = 0;
	let m;
	let last = head[1].length;
	while ((m = BLOCK_RE.exec(text))) {
		if (m.index !== last) throw new Error(`unexpected text before block at ${last}: ${JSON.stringify(text.slice(last, m.index).slice(0, 80))}`);
		const { node, end } = parseTable(text, BLOCK_RE.lastIndex);
		if (!text.startsWith(TAIL, end)) throw new Error(`unexpected block end at ${end}`);
		let next = end + TAIL.length;
		const gap = /^\n*/.exec(text.slice(next))[0];
		blocks.push({ source: m[1], guide: node, gap });
		next += gap.length;
		last = next;
		BLOCK_RE.lastIndex = next;
	}
	if (last !== text.length) throw new Error(`unparsed text at ${last}`);
	return { head: head[1], blocks };
}

// Guide tables are written one field per line, steps one per block and goals
// one per line, three tabs in.
function writeGuide(g) {
	const T = (n) => '\t'.repeat(n);
	const out = ['{\n'];
	for (const e of g.table) {
		if (e.key === 'steps') {
			out.push(`${T(3)}steps = {\n`);
			for (const s of e.value.table) {
				out.push(`${T(4)}{\n`);
				for (const se of s.value.table) {
					if (se.key === 'goals') {
						out.push(`${T(5)}goals = {\n`);
						for (const ge of se.value.table) out.push(`${T(6)}${srcOf(ge.value)},\n`);
						out.push(`${T(5)}},\n`);
					} else out.push(`${T(5)}${se.keySrc} = ${srcOf(se.value)},\n`);
				}
				out.push(`${T(4)}},\n`);
			}
			out.push(`${T(3)}},\n`);
		} else out.push(`${T(3)}${e.keySrc} = ${srcOf(e.value)},\n`);
	}
	out.push(`${T(2)}}`);
	return out.join('');
}

function writeGuides(file) {
	return file.head + file.blocks.map((b) => `-- Source: ${b.source}\ndo\n\tlocal function register()\n\t\tPolestar.RegisterGuide(${writeGuide(b.guide)}${TAIL}${b.gap}`).join('');
}

module.exports = { parseGuides, writeGuides, toJS, lit, get, set, remove, entry, inline, srcOf };
