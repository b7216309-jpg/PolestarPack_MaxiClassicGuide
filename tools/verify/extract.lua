-- Usage: lua5.1 extract.lua <out.json> <file.lua>...  Runs compiled guide and map
-- files with a capturing Polestar and writes { guides, frames } as JSON.
local out = arg[1]
local guides, frames = {}, { era = {}, forever = {} }
Polestar = {
	RegisterGuide = function(def) guides[#guides + 1] = def end,
	RegisterPack = function() end,
	RegisterMapFrames = function(f)
		for k, t in pairs(f) do
			frames[k] = frames[k] or {}
			for id, v in pairs(t) do frames[k][id] = v end
		end
	end,
}
setmetatable(Polestar, { __index = function() return function() end end })
for i = 2, #arg do assert(loadfile(arg[i]))("X", {}) end
local function isArray(t)
	local n = 0
	for k in pairs(t) do
		if type(k) ~= "number" or k < 1 or k % 1 ~= 0 then return false end
		n = n + 1
	end
	return n == #t
end
local esc = { ['"'] = '\\"', ['\\'] = '\\\\', ['\n'] = '\\n', ['\r'] = '\\r', ['\t'] = '\\t' }
local function enc(v, buf)
	local tv = type(v)
	if tv == "table" then
		if next(v) == nil then buf[#buf + 1] = "[]"
		elseif isArray(v) then
			buf[#buf + 1] = "["
			for i = 1, #v do if i > 1 then buf[#buf + 1] = "," end enc(v[i], buf) end
			buf[#buf + 1] = "]"
		else
			buf[#buf + 1] = "{"
			local first = true
			for k, x in pairs(v) do
				if type(x) ~= "function" then
					if not first then buf[#buf + 1] = "," end
					first = false
					enc(tostring(k), buf); buf[#buf + 1] = ":"; enc(x, buf)
				end
			end
			buf[#buf + 1] = "}"
		end
	elseif tv == "string" then
		buf[#buf + 1] = '"' .. v:gsub('[%c"\\]', function(c) return esc[c] or string.format("\\u%04x", c:byte()) end) .. '"'
	elseif tv == "number" then
		buf[#buf + 1] = (v ~= v or v == math.huge or v == -math.huge) and "null" or string.format("%.14g", v)
	elseif tv == "boolean" then buf[#buf + 1] = tostring(v)
	else buf[#buf + 1] = "null" end
end
local buf = {}
enc({ guides = guides, frames = frames }, buf)
local f = assert(io.open(out, "w")); f:write(table.concat(buf)); f:close()
io.write(#guides, " guides\n")
