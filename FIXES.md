# Polestar quality fixes

What this branch changes in the Maxi Classic Guide pack, why, how it was
checked, and what is still open. Nothing here claims more than was run.

## The one thing to know first

This repository holds only the **compiled** pack (`Guides.lua`), not the
`.guide` sources it is built from. So the fixes were made in `Guides.lua`
itself, by a tool (`tools/fix-pack.js`) that reads the compiled guides and
changes only what each fix names, leaving every other line as it was (the
tool rewrites an untouched `Guides.lua` byte for byte).

**The next `polestar compile` from your `.guide` files as they are now puts
every problem back.** To keep the fixes, carry them over to the sources:
[PORTING.md](PORTING.md) lists every change file by file and step by step, as
`.guide` lines (`accept 3106 only Dwarf,Warrior`, `buy 4371 x1 npc 3133`, ...).
Or push the `.guide` files and `pack.json` to a branch: the same fixes can
then be made in the sources and checked with Polestar's real `lint` and
`playtest`.

## What was wrong, and what changed

Every fix uses only facts already in this pack or in Polestar's own compiled
guides (`addon/Polestar_Guides` in Polestar 0.2.6). No id, coordinate or name
was made up. `fixes.json` logs each change.

### 1. Class and race quests were shown to every character

The pack had no `only` anywhere. Every class saw every class's quests: a
Dwarf Warrior in Coldridge Valley got a step to hand in the rogue's Encrypted
Rune, the priest's Hallowed Rune, and so on, one step each. Polestar's own
guides limit these (`turnin 3106 only Dwarf,Warrior`).

**Change:** 431 goals of 222 quests, in 230 steps, now carry the class (and
race) limit that Polestar's guides give the same quest. A limit is copied
only when Polestar's guides limit that quest everywhere they use it. When
they differ, only what every use agrees on is kept, so no class loses a
quest it can do. The 311 quests this pack has that Polestar's guides do not
were left alone: there is nothing to check them against.

Seen in the engine: the Anvilmar step (Dun Morogh, trainer hand-ins) now
shows a Dwarf Warrior only Simple Rune, a Gnome Mage only Glyphic Memorandum
and a Dwarf Paladin only Consecrated Rune; the others read "not for you".

### 2. Objectives in another zone held their step

In 85 places an objective that is done in a different zone sat in the step
where its quest is picked up. One example: Super Sticky is taken in Tanaris,
but the tar comes from Un'Goro. A step is done only when all its goals are,
so the guide stopped at that Tanaris step, with the arrow pointing to
Un'Goro, until the player skipped the goal by hand. This was confirmed in
Polestar's engine: Tanaris steps 3, 8 and 14 all hold that way. Polestar's
guides put such an objective in the step where the route is actually in that
zone.

**Change**, for each one, following the route (`next`) between the quest's
accept and its turn-in:
- 39 moved into the step of the route on that map that lies nearest to them
  (all within 60 yards);
- 29 moved into 23 new steps of their own, right where the route reaches
  that zone (farther than 60 yards from any step);
- 23 stay where they were, now `optional`, so they no longer hold the step:
  5 item uses with no quest to follow, and 18 objectives of 13 quests the
  route never takes to that zone before the turn-in (see "for you to
  decide").

### 3. Quests one at a time instead of grouped

The issue you reported. 91% of the pack's quest steps had a single NPC, and
in 378 places a step of quest hand-ins and pickups was followed by another
close by. Polestar groups a hub: its multi-NPC steps cover a
median of 82 yards.

**Change:** 348 consecutive steps became 138, in 67 guides (2,996 steps in
all instead of 3,183). Steps are joined only when:
- both hold nothing but accepts, turn-ins, notes and NPC visits (no gotos, no
  objectives, no escorts);
- every NPC of the next step is within 60 yards of one already in the step,
  and no two are more than 120 yards apart;
- none differ by more than 10 yards in height (other floors and elevators
  stay apart);
- the result has at most 16 goals.

Goal order is kept, and a note shared by the joined steps appears once. A
grouped step is titled as Polestar titles that hub ("Anvilmar",
"Steelgrill's Depot"). Without such a name, it is titled after its NPC, or
its two or three NPCs.

### 4. Two vendor items pointed to the wrong place

- **Bronze Tube** (Look to the Stars, Duskwood): the arrow went to the XT:4
  and XT:9 robots in **Stonetalon Mountains**. It is now
  `buy 4371 x1 npc 3133`, Herble Baubbletump in Darkshire, as in Polestar's
  Duskwood guide.
- **Flagon of Mead** (The Third Fleet, Wetlands): the arrow went to a vendor
  on another continent. It is now `buy 2594 x1 npc 1464`, Innkeeper Helbrek
  in Menethil Harbor, as in Polestar's guides.

### 5. Ten quest titles

These differed from Polestar's titles in case or punctuation only ("Look To
The Stars" became "Look to the Stars"). They come from the reference data
the pack was compiled with, so see PORTING.md.

## How it was checked

None of Polestar's checks that need the reference data (`data/forever`) could
run. That data is not in the Polestar repository (its own CI skips those
tests too), and it could not be built in the session used, because its
network blocks wago.tools, where the Blizzard map tables come from. So
**`polestar lint` and `polestar playtest` were not run** on this pack.

Instead, everything ran on the real Polestar addon (current `main`, 0.2.6)
under Lua 5.1, in Polestar's own fake game client. The plays use Polestar's
own guide simulator (the one `playtest` uses) on the compiled guides, with
Polestar's guides loaded beside the pack. Which classes each race can play
comes from Polestar's test copy of the Forever client's race table.

| Check | Before (`main`) | After (this branch) |
|---|---|---|
| Polestar registers the pack (its own validation of every guide) | 117 guides, 0 problems | 117 guides, 0 problems |
| Polestar's own 222 guides beside it | 0 problems | 0 problems |
| Every guide opens in the engine; every `next` leads to a guide that exists | 117 of 117 | 117 of 117 |
| `Guides.lua` compiles (`luac5.1 -p`) | yes | yes |
| Simulator, characters as `playtest` picks them: plays that finish | 125 of 125 | 178 of 178 (more classes are played because the limits name them) |
| Simulator, every class each race can be: plays that finish | 799 of 799 | 797 of 797 |
| **Strict simulator**, every class: plays held at least once | **338 of 799** | **14 of 797** |
| Strict simulator: times a step held | 602 | 14 |
| Strict simulator: steps that hold | 76, in 51 guides | 4, in 4 guides |

**Why a strict simulator.** Polestar's simulator is lenient: it hands in any
quest, even one the character never got, and does any objective wherever
the character stands. That is why every play "finishes" on `main` too. The
strict run plays more like a person does:
- it hands in only quests in the log;
- it does not do an objective on a map the step is not on;
- when a goal stays open, it notes the hold, ticks the goal off by hand as a
  player would, and plays on.

As a control, the same strict simulator plays the same class chains in
Polestar's own guides (druid Aquatic Form, Tauren hunter) with no hold.

**Also checked.** Every quest, item and object id in the pack exists in
Polestar's name data for the Forever client. The only NPCs missing from it
are 4073 and 4074 (XT:4 and XT:9), the Bronze Tube robots, which are no
longer used for that.

**What these checks cannot tell you:**
- whether coordinates, NPCs and quests are right in the game as it is now;
- whether the levels fit;
- whether the route is a good one.

The simulator finishes an objective the moment it gets there, and it does
not model NPC windows offering quests. **Nothing was tried in the real
game.**

To run the same checks yourself (Node, Lua 5.1 and a clone of Polestar; no
reference data):

```sh
node tools/verify/load.js ../polestar                                  # registers, no problems, every guide opens
node tools/verify/playtest.js ../polestar                              # Polestar's simulator, playtest's characters
node tools/verify/playtest.js ../polestar --strict --far --all-classes # the strict player, every class
```

`tools/fix-pack.js` rebuilds this branch's `Guides.lua` from `main`'s:

```sh
git show main:Guides.lua > /tmp/Guides.orig.lua
node tools/fix-pack.js ../polestar --in /tmp/Guides.orig.lua --out Guides.lua --log fixes.json
node tools/fixes-report.js --log fixes.json --before /tmp/Guides.orig.lua --after Guides.lua --out PORTING.md
```

## Not done, or for you to decide

1. **Port the fixes to the `.guide` sources** ([PORTING.md](PORTING.md)), or
   push the sources so it can be done there. Until then, a recompile undoes
   this branch.
2. **Four steps still hold in the strict simulator.** None were caused by
   this branch; the step numbers are this branch's:
   - **Mulgore step 73**, Training the Beast (Tauren Hunter). It held on
     `main` too. Polestar's Mulgore guide does the whole taming chain in one
     step at Yaw Sharpmane; this pack spreads it over steps 65 to 73, and the
     engine passes the follow-up accepts for a hunter. I did not restructure
     it: that is a route change only the game can confirm.
   - **Barrens step 8**, Trial of the Sea Lion (Tauren Druid). This is the
     same kind of chain, split in the same way. Polestar's Aquatic Form guide
     keeps it together and plays clean. (On `main` no druid was ever played
     here.)
   - **Teldrassil step 90**, Teldrassil (every Night Elf). Step 65 packs
     the chain 937, 98392, 98398 and 940 into one step. The engine marks
     the later accepts skipped there, and the hand-in at Fandral Staghelm
     then waits. The Forever-only quests 98392 and 98398 are in none of
     Polestar's guides, so there is nothing to compare with. Worth trying
     in the game. It held on `main` too.
   - **Hillsbrad step 28**, A King's Tribute (700). This is an artifact of
     testing one guide at a time: the simulated character starts this guide
     without quest 689, which a player brings from Wetlands. With 689 in
     the log, as in the game, the guide plays with no hold.
3. **13 quests the route does not take to where their objective is.**
   Their objective is now optional, so it no longer holds the step where the
   quest is taken. But the turn-in still waits for a player who does not
   have the items. Polestar would route there, or mark the whole quest
   optional, or leave it out; that is your call. Step numbers are this
   branch's:
   - Ineptitude + Chemicals = Fun (1073), Wetlands 45
   - Favor for Krazek (627), Stranglethorn 21
   - Pearl Diving (705), Coolant Heads Prevail (713), Gyro... What? (714),
     Liquid Stone (715) and Stone Is Better than Cloth (716), both Badlands
     guides
   - A Little Slime Goes a Long Way (4512), Western Plaguelands 3
   - Chasing A-Me 01 (4244), both Un'Goro guides
   - Call of Water (1536), Horde Ashenvale 10
   - Arikara (5088), Thousand Needles 12
   - Soothing Spices (1218), both Dustwallow guides
   - Skeletal Fragments (964), Horde Western Plaguelands 23
4. **Two quest givers differ from Polestar's, left as they are.** A Warrior's
   Training (1638): Lyria Du Lac in Northshire here, Ilsa Corbin in
   Stormwind in Polestar's. Report to Gryan Stoutmantle (109): Farmer
   Saldean here, Farmer Furlbrow or Deputy Rainer in Polestar's. Both may
   well offer it.
5. **Version.** The TOC and `Pack.lua` still say 0.2.0. Raise `version` in
   `pack.json` when you release.
6. **Release zip.** `tools/` and the `.md` files sit in the addon folder. The
   game ignores them, but leave them out of a release zip.
