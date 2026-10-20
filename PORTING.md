# Porting the fixes to the .guide sources

`Guides.lua` on this branch was changed by `tools/fix-pack.js`, not compiled from the .guide files: the next `node tools/polestar.js compile` from the sources as they are puts every problem back. These are the same changes as edits to the sources.

Step numbers are those of the original build (`main`): step N should be the Nth `step` line of the file, assuming the compiler makes one step per `step` line (not checked: the sources were not available; compare the step titles with your file before editing). The goal lines are rebuilt from the compiled goals (ids only): yours may carry names or comments too, and a line shows the `only` this list adds to it elsewhere (search for it without that). Work through a file from its last step to its first so the numbers above stay right while you edit.

455 changes in 95 files.

## guides/alliance/01-dun-morogh-1-15.guide

- step 3: add the class/race limit to these goals: `accept 3106 only Dwarf,Warrior`, `accept 3109 only Dwarf,Rogue`, `accept 3110 only Dwarf,Priest`, `accept 3107 only Paladin`, `accept 3108 only Hunter`, `accept 3114 only Mage`, `accept 3112 only Gnome,Warrior`, `accept 3115 only Warlock`, `accept 3113 only Gnome,Rogue`
- step 8: add the class/race limit to this goal: `turnin 3106 only Dwarf,Warrior`
- steps 8, 9, 10, 11, 12, 13, 14, 15: make them one step, `step Anvilmar`, holding the goals of all of them in this order (they were `Thran Khorman`, `Solm Hargrin`, `Branstock Khalder`, `Bromos Grummner`, `Thorgas Grimson`, `Thran Khorman`, `Solm Hargrin`, `Marryk Nurribit`)
- step 9: add the class/race limit to this goal: `turnin 3109 only Dwarf,Rogue`
- step 10: add the class/race limit to this goal: `turnin 3110 only Dwarf,Priest`
- step 11: add the class/race limit to this goal: `turnin 3107 only Paladin`
- step 12: add the class/race limit to this goal: `turnin 3108 only Hunter`
- step 13: add the class/race limit to this goal: `turnin 3112 only Gnome,Warrior`
- step 14: add the class/race limit to this goal: `turnin 3113 only Gnome,Rogue`
- step 15: add the class/race limit to this goal: `turnin 3114 only Mage`
- step 16: add the class/race limit to these goals: `turnin 3115 only Warlock`, `accept 1599 only Warlock`, `collect 6753 x3 quest 1599.1 only Warlock`
- step 23: add the class/race limit to this goal: `turnin 1599 only Warlock`
- steps 35, 36: make them one step, `step Tannok Frosthammer`, holding the goals of all of them in this order (they were `Tannok Frosthammer`, `Innkeeper Belm`)
- steps 47, 48: make them one step, `step Steelgrill's Depot`, holding the goals of all of them in this order (they were `Pilot Bellowfiz`, `Pilot Stonegear`)
- step 66: add the class/race limit to these goals: `accept 6064 only Hunter`, `kill 1126 quest 6064.1 only Hunter`
- step 68: add the class/race limit to these goals: `turnin 6064 only Hunter`, `accept 6084 only Hunter`, `kill 1201 quest 6084.1 only Hunter`
- step 70: add the class/race limit to these goals: `turnin 6084 only Hunter`, `accept 6085 only Hunter`, `kill 1196 quest 6085.1 only Hunter`
- step 72: add the class/race limit to these goals: `turnin 6085 only Hunter`, `accept 6086 only Hunter`
- step 73: add the class/race limit to this goal: `turnin 6086 only Hunter`
- step 77: add the class/race limit to this goal: `accept 1715 only Warlock`
- step 78: add the class/race limit to these goals: `turnin 1715 only Warlock`, `accept 1688 only Warlock`, `collect 6810 quest 1688.1 only Warlock`
- step 78: take `collect 6810 quest 1688.1 only Warlock` out (it held the step until done on another map); it goes to step 79
- step 79: add `collect 6810 quest 1688.1 only Warlock` (from step 78), before the quest's turn-in if the step has it
- step 80: add the class/race limit to these goals: `turnin 1688 only Warlock`, `accept 1689 only Warlock`, `kill 5676 quest 1689.1 only Warlock`
- step 82: add the class/race limit to this goal: `turnin 1689 only Warlock`
- step 83: add the class/race limit to this goal: `accept 5635 only Priest`
- steps 86, 87: make them one step, `step Gol'Bolar Quarry`, holding the goals of all of them in this order (they were `Senator Mehr Stonehallow`, `Foreman Stonebrow`)
- step 98: take `collect 3110 x12 quest 416.1` out (it held the step until done on another map); it goes to step 103
- step 101: add the class/race limit to this goal: `accept 6387 only Paladin`
- step 103: add `collect 3110 x12 quest 416.1` (from step 98), before the quest's turn-in if the step has it
- step 107: add the class/race limit to these goals: `turnin 6387 only Paladin`, `accept 6391 only Paladin`
- step 109: add the class/race limit to these goals: `turnin 6391 only Paladin`, `accept 6388 only Paladin`
- step 110: add the class/race limit to this goal: `turnin 6388 only Paladin`
- step 114: add the class/race limit to this goal: `accept 1646 only Paladin`
- step 116: add the class/race limit to these goals: `turnin 1646 only Paladin`, `accept 1647 only Paladin`
- step 117: add the class/race limit to these goals: `turnin 1647 only Paladin`, `accept 1648 only Paladin`, `collect 2589 x10 quest 1648.1 only Paladin`
- step 119: add the class/race limit to these goals: `turnin 1648 only Paladin`, `accept 1778 only Paladin`
- step 120: add the class/race limit to these goals: `turnin 1778 only Paladin`, `accept 1779 only Paladin`
- step 121: add the class/race limit to these goals: `turnin 1779 only Paladin`, `accept 1783 only Paladin`, `kill 6177 quest 1783.1 only Paladin`
- step 123: add the class/race limit to these goals: `turnin 1783 only Paladin`, `accept 1784 only Paladin`, `collect 6847 quest 1784.1 only Paladin`
- step 124: add the class/race limit to these goals: `turnin 1784 only Paladin`, `accept 1785 only Paladin`
- step 125: add the class/race limit to this goal: `turnin 1785 only Paladin`
- steps 128, 129: make them one step, `step Monty`, holding the goals of all of them in this order (they were `Monty`, `Nipsy`)
- step 131: add the class/race limit to this goal: `turnin 5635 only Priest`

## guides/alliance/02-elwynn-forest-1-15.guide

- step 8: add the class/race limit to these goals: `accept 3104 only Mage`, `accept 3100 only Warrior`, `accept 3105 only Warlock`, `accept 3102 only Rogue`, `accept 3103 only Priest`, `accept 3101 only Paladin`
- step 9: add the class/race limit to this goal: `turnin 3104 only Mage`
- step 10: add the class/race limit to this goal: `turnin 3100 only Warrior`
- steps 10, 11: make them one step, `step Northshire Abbey`, holding the goals of all of them in this order (they were `Llane Beshere`, `Brother Sammuel`)
- step 11: add the class/race limit to this goal: `turnin 3101 only Paladin`
- step 12: add the class/race limit to this goal: `turnin 3103 only Priest`
- step 14: add the class/race limit to these goals: `turnin 3105 only Warlock`, `accept 1598 only Warlock`, `collect 6785 quest 1598.1 only Warlock`
- step 15: add the class/race limit to this goal: `turnin 3102 only Rogue`
- step 16: add the class/race limit to this goal: `turnin 1598 only Warlock`
- steps 29, 30: make them one step, `step Innkeeper Farley`, holding the goals of all of them in this order (they were `Innkeeper Farley`, ``)
- steps 34, 35: make them one step, `step The Stonefield Farm`, holding the goals of all of them in this order (they were `Billy Maclure`, `Gramma Stonefield`)
- steps 42, 43: make them one step, `step Goldshire`, holding the goals of all of them in this order (they were `Remy Two Times`, `Marshal Dughan`)
- steps 53, 54, 55: make them one step, `step Goldshire`, holding the goals of all of them in this order (they were `William Pestle`, `Maybell Maclure`, `Marshal Dughan`)
- step 65: add the class/race limit to this goal: `accept 1638 only Warrior`
- step 66: add the class/race limit to this goal: `accept 1685 only Warlock`
- step 69: add the class/race limit to these goals: `turnin 1638 only Warrior`, `accept 1639 only Warrior`
- step 70: add the class/race limit to these goals: `turnin 1639 only Warrior`, `accept 1640 only Warrior`, `kill 6090 quest 1640.1 only Warrior`
- step 71: add the class/race limit to these goals: `turnin 1640 only Warrior`, `accept 1665 only Warrior`
- steps 71, 72: make them one step, `step Bartleby and Harry Burlguard`, holding the goals of all of them in this order (they were `Beat Bartleby`, `Harry Burlguard`)
- step 72: add the class/race limit to this goal: `turnin 1665 only Warrior`
- step 73: add the class/race limit to these goals: `turnin 1685 only Warlock`, `accept 1688 only Warlock`, `collect 6810 quest 1688.1 only Warlock`
- step 75: add the class/race limit to these goals: `turnin 1688 only Warlock`, `accept 1689 only Warlock`, `kill 5676 quest 1689.1 only Warlock`
- step 77: add the class/race limit to this goal: `turnin 1689 only Warlock`
- steps 87, 88: make them one step, `step Gol'Bolar Quarry`, holding the goals of all of them in this order (they were `Senator Mehr Stonehallow`, `Foreman Stonebrow`)
- step 98: take `collect 3110 x12 quest 416.1` out (it held the step until done on another map); it goes to step 101
- step 101: add `collect 3110 x12 quest 416.1` (from step 98), before the quest's turn-in if the step has it
- step 106: add the class/race limit to this goal: `accept 2998 only Paladin`
- step 107: add the class/race limit to this goal: `turnin 2998 only Paladin`
- step 109: add the class/race limit to this goal: `accept 1642 only Paladin`
- step 110: add the class/race limit to these goals: `turnin 1642 only Paladin`, `accept 1643 only Paladin`
- step 111: add the class/race limit to these goals: `turnin 1643 only Paladin`, `accept 1644 only Paladin`, `collect 2589 x10 quest 1644.1 only Paladin`
- step 113: add the class/race limit to these goals: `turnin 1644 only Paladin`, `accept 1780 only Paladin`
- step 114: add the class/race limit to these goals: `turnin 1780 only Paladin`, `accept 1781 only Paladin`
- step 115: add the class/race limit to these goals: `turnin 1781 only Paladin`, `accept 1786 only Paladin`, `kill 6172 quest 1786.1 only Paladin`
- step 117: add the class/race limit to these goals: `turnin 1786 only Paladin`, `accept 1787 only Paladin`, `collect 6846 quest 1787.1 only Paladin`
- step 118: add the class/race limit to these goals: `turnin 1787 only Paladin`, `accept 1788 only Paladin`
- step 119: add the class/race limit to this goal: `turnin 1788 only Paladin`

## guides/alliance/03-teldrassil-1-17.guide

- steps 3, 4: make them one step, `step Aldrassil`, holding the goals of all of them in this order (they were `Iverron`, `Tarindrella`)
- step 5: add the class/race limit to these goals: `accept 3116 only Warrior`, `accept 3118 only Rogue`, `accept 3119 only Priest`, `accept 3117 only Hunter`, `accept 3120 only Druid`
- step 6: add the class/race limit to this goal: `turnin 3116 only Warrior`
- step 7: add the class/race limit to this goal: `turnin 3118 only Rogue`
- step 8: add the class/race limit to this goal: `turnin 3119 only Priest`
- step 9: add the class/race limit to this goal: `turnin 3117 only Hunter`
- steps 9, 10: make them one step, `step Aldrassil`, holding the goals of all of them in this order (they were `Ayanna Everstride`, `Mardant Strongoak`)
- step 10: add the class/race limit to this goal: `turnin 3120 only Druid`
- step 69: add the class/race limit to this goal: `accept 5629 only Priest`
- step 70: add the class/race limit to these goals: `accept 6063 only Hunter`, `kill 1998 quest 6063.1 only Hunter`
- step 72: add the class/race limit to these goals: `turnin 6063 only Hunter`, `accept 6101 only Hunter`, `kill 2043 quest 6101.1 only Hunter`
- step 74: add the class/race limit to these goals: `turnin 6101 only Hunter`, `accept 6102 only Hunter`, `kill 1996 quest 6102.1 only Hunter`
- step 76: add the class/race limit to these goals: `turnin 6102 only Hunter`, `accept 6103 only Hunter`
- step 77: add the class/race limit to this goal: `turnin 6103 only Hunter`
- step 79: add the class/race limit to this goal: `accept 5921 only Druid`
- step 80: add the class/race limit to these goals: `turnin 5921 only Druid`, `accept 5929 only Druid`, `kill 11956 quest 5929.1 only Druid`
- step 82: add the class/race limit to these goals: `turnin 5929 only Druid`, `accept 5931 only Druid`
- step 84: add the class/race limit to these goals: `turnin 5931 only Druid`, `accept 6001 only Druid`, `kill 12144 quest 6001.1 only Druid`
- step 84: take `kill 12144 quest 6001.1 only Druid` out (it held the step until done on another map); it goes to step 86
- step 86: add the class/race limit to this goal: `turnin 6001 only Druid`
- step 86: add `kill 12144 quest 6001.1 only Druid` (from step 84), before the quest's turn-in if the step has it
- step 95: add the class/race limit to this goal: `turnin 5629 only Priest`

## guides/alliance/05-darkshore-12-20.guide

- step 36: add the class/race limit to this goal: `accept 6121 only NightElf,Druid`
- step 37: add the class/race limit to these goals: `turnin 6121 only NightElf,Druid`, `accept 6122 only NightElf,Druid`, `collect 15845 quest 6122.1 only NightElf,Druid`
- step 39: add the class/race limit to these goals: `turnin 6122 only NightElf,Druid`, `accept 6123 only NightElf,Druid`, `collect 15851 x12 quest 6123.2 only NightElf,Druid`
- step 40: add the class/race limit to these goals: `turnin 6123 only NightElf,Druid`, `accept 6124 only NightElf,Druid`, `kill 12298 x10 quest 6124.1 only NightElf,Druid`
- step 42: add the class/race limit to these goals: `turnin 6124 only NightElf,Druid`, `accept 6125 only NightElf,Druid`
- step 43: add the class/race limit to this goal: `turnin 6125 only NightElf,Druid`
- step 74: add the class/race limit to this goal: `accept 26 only NightElf,Druid`
- step 75: add the class/race limit to these goals: `turnin 26 only NightElf,Druid`, `accept 29 only NightElf,Druid`, `interact 15885 quest 29.1 only NightElf,Druid`
- step 77: add the class/race limit to these goals: `turnin 29 only NightElf,Druid`, `accept 272 only NightElf,Druid`, `collect 15885 quest 272.1 only NightElf,Druid`

## guides/alliance/06-loch-modan-17-18.guide

- steps 4, 5: make them one step, `step Jern Hornhelm`, holding the goals of all of them in this order (they were `Innkeeper Hearthstove`, `Magmar Fellhew`)
- steps 29, 30: make them one step, `step Shoni the Shilent and Furen Longbeard`, holding the goals of all of them in this order (they were `Shoni the Shilent`, `Furen Longbeard`)
- step 32: end `use 15883` with `optional` (no quest to follow it to); it held the step until done in another zone
- step 33: add the class/race limit to these goals: `turnin 272 only NightElf,Druid`, `accept 5061 only NightElf,Druid`
- step 34: add the class/race limit to this goal: `turnin 5061 only NightElf,Druid`

## guides/alliance/07-redridge-mountains-18-24.guide

- steps 11, 12: make them one step, `step Darcy`, holding the goals of all of them in this order (they were `Innkeeper Brianna`, `Guard Parker`)
- step 31: add the class/race limit to this goal: `accept 1716 only Warlock`
- step 33: add the class/race limit to these goals: `turnin 1716 only Warlock`, `accept 1738 only Warlock`, `collect 6912 quest 1738.1 only Warlock`
- step 34: add the class/race limit to these goals: `turnin 1738 only Warlock`, `accept 1739 only Warlock`, `kill 5677 quest 1739.1 only Warlock`
- step 36: add the class/race limit to this goal: `turnin 1739 only Warlock`

## guides/alliance/08-darkshore-20-21.guide

- steps 6, 7: make them one step, `step Onu`, holding the goals of all of them in this order (they were `Onu`, `Therylune`)

## guides/alliance/11-ashenvale-21-27.guide

- steps 2, 3: make them one step, `step Astranaar`, holding the goals of all of them in this order (they were `Kaela Shadowspear`, `Keeper Albagorm`)
- step 15: take `collect 5808 x12 quest 1134.1` out (it held the step until done on another map); it goes to `guides/alliance/12-stonetalon-mountains-22-23.guide` step 8

## guides/alliance/12-stonetalon-mountains-22-23.guide

- step 8: add `collect 5808 x12 quest 1134.1` (from `guides/alliance/11-ashenvale-21-27.guide` step 15), before the quest's turn-in if the step has it

## guides/alliance/15-wetlands-24-31.guide

- step 2: replace `collect 2594 quest 288.1` with `buy 2594 x1 npc 1464` (Flagon of Mead: buy from Innkeeper Helbrek (npc 1464) on map 1437, as forever/alliance/07-thousand-needles)
- steps 29, 30: make them one step, `step Captain Stoutfist`, holding the goals of all of them in this order (they were `Captain Stoutfist`, `War Banners`)
- steps 44, 45: make them one step, `step Sara Balloo`, holding the goals of all of them in this order (they were `Sara Balloo`, `King Magni Bronzebeard`)
- step 46: end `collect 2455 x4 quest 1073.1` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- step 49: take `collect 4521 x5 quest 689.1` out (it held the step until done on another map); it goes to a new step in `guides/alliance/21-hillsbrad-foothills-31-34.guide`, after step 15
- step 51: take `collect 2779 quest 335.1` out (it held the step until done on another map); it goes to `guides/alliance/17-duskwood-27-35.guide` step 1
- step 52: add the class/race limit to this goal: `accept 2360 only Rogue`
- step 54: add the class/race limit to these goals: `turnin 2360 only Rogue`, `accept 2359 only Rogue`, `collect 7923 quest 2359.2 only Rogue`
- step 55: add the class/race limit to these goals: `turnin 2359 only Rogue`, `accept 2607 only Rogue`
- step 56: add the class/race limit to these goals: `turnin 2607 only Rogue`, `accept 2608 only Rogue`
- steps 56, 57: make them one step, `step Doc Mixilpixil`, holding the goals of all of them in this order (they were `Doc Mixilpixil`, `The Touch of Zanzil`)
- step 57: add the class/race limit to this goal: `turnin 2608 only Rogue`

## guides/alliance/17-duskwood-27-35.guide

- step 1: add `collect 2779 quest 335.1` (from `guides/alliance/15-wetlands-24-31.guide` step 51), before the quest's turn-in if the step has it
- step 8: replace `collect 4371 quest 174.1` with `buy 4371 x1 npc 3133` (Bronze Tube: buy from Herble Baubbletump (npc 3133) on map 1431, as forever/alliance/05-duskwood)
- steps 27, 28, 29: make them one step, `step Darkshire`, holding the goals of all of them in this order (they were `Clerk Daltry`, `Sirra Von'Indi`, `Commander Althea Ebonlocke`)
- steps 30, 31: make them one step, `step Darkshire`, holding the goals of all of them in this order (they were `Calor`, `Jonathan Carevin`)
- steps 55, 56, 57: make them one step, `step Darkshire`, holding the goals of all of them in this order (they were `Sirra Von'Indi`, `Wait for Sirra to Finish`, `Lord Ello Ebonlocke`)
- steps 60, 61: make them one step, `step Bishop Farthing and Thomas`, holding the goals of all of them in this order (they were `Bishop Farthing`, `Bishop DeLavey`)
- step 68: add the class/race limit to this goal: `accept 1718 only Warrior`

## guides/alliance/19-ashenvale-30-32.guide

- step 5: add the class/race limit to these goals: `turnin 1718 only Warrior`, `accept 1719 only Warrior`, `kill 6238 quest 1719.1 only Warrior`
- step 6: add the class/race limit to this goal: `turnin 1719 only Warrior`

## guides/alliance/20-wetlands-31-31.guide

- step 9: take `interact 2704 quest 633.1` out (it held the step until done on another map); it goes to step 10
- step 10: add `interact 2704 quest 633.1` (from step 9), before the quest's turn-in if the step has it

## guides/alliance/21-hillsbrad-foothills-31-34.guide

- after step 15: a new step, `step Alterac Granite`, with `collect 4521 x5 quest 689.1` (from `guides/alliance/15-wetlands-24-31.guide` step 49, 114 yd from step 15)

## guides/alliance/22-duskwood-33-35.guide

- steps 4, 5, 6: make them one step, `step Darkshire`, holding the goals of all of them in this order (they were `Tavernkeep Smitts`, `Commander Althea Ebonlocke`, `Clerk Daltry`)

## guides/alliance/23-stranglethorn-vale-33-40.guide

- steps 19, 20: make them one step, `step Barnil Stonepot`, holding the goals of all of them in this order (they were `Chapter IV`, `Barnil Stonepot`)
- step 21: end `collect 4278 x4 quest 627.1` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- steps 22, 23: make them one step, `step Booty Bay`, holding the goals of all of them in this order (they were `Favor for Krazek`, `Baron Revilgaz`)

## guides/alliance/24-thousand-needles-34-39.guide

- steps 10, 11: make them one step, `step Mirage Raceway`, holding the goals of all of them in this order (they were `Fizzle Brassbolts`, `Wizzle Brassbolts`)

## guides/alliance/25-desolace-34-39.guide

- steps 17, 18: make them one step, `step Nijel's Point`, holding the goals of all of them in this order (they were `Kreldig Ungor`, `Corporal Melkins`)
- step 34: take `collect 6190 quest 1373.1` out (it held the step until done on another map); it goes to `guides/alliance/32-swamp-of-sorrows-41-45.guide` step 12

## guides/alliance/26-stranglethorn-vale-36-41.guide

- steps 21, 22, 23, 24, 25, 26: make them one step, `step Ajeck Rouack`, holding the goals of all of them in this order (they were `Ajeck Rouack`, `Barnil Stonepot`, ``, `Barnil Stonepot`, ``, `Jaquilina Dramet`)
- steps 36, 37: make them one step, `step Rebel Camp`, holding the goals of all of them in this order (they were `Corporal Sethman`, `Lieutenant Doren`)
- steps 38, 39, 40, 41: make them one step, `step Barnil Stonepot`, holding the goals of all of them in this order (they were `Barnil Stonepot`, ``, `Barnil Stonepot`, ``)
- steps 43, 44, 45: make them one step, `step Booty Bay`, holding the goals of all of them in this order (they were `Krazek`, `Kebok`, `Baron Revilgaz`)

## guides/alliance/27-hillsbrad-foothills-37-38.guide

- steps 11, 12, 13: make them one step, `step Southshore`, holding the goals of all of them in this order (they were `Quae`, `Marshal Redpath`, `Magistrate Henry Maleb`)

## guides/alliance/28-dustwallow-marsh-38-40.guide

- steps 12, 13, 14: make them one step, `step Captain Garran Vimes`, holding the goals of all of them in this order (they were `Captain Garran Vimes`, `Lieutenant Paval Reethe`, `Captain Garran Vimes`)
- step 15: take `collect 5938 x12 quest 1258.1` out (it held the step until done on another map); it goes to `guides/alliance/32-swamp-of-sorrows-41-45.guide` step 16
- steps 17, 18, 19: make them one step, `step Captain Garran Vimes and Adjutant Tesoran`, holding the goals of all of them in this order (they were `Captain Garran Vimes`, `Adjutant Tesoran`, `Captain Garran Vimes`)

## guides/alliance/29-arathi-highlands-38-41.guide

- steps 21, 22: make them one step, `step Faldir's Cove`, holding the goals of all of them in this order (they were `Captain Steelgut`, `Doctor Draxlegauge`)
- steps 27, 28, 29: make them one step, `step Mirage Raceway`, holding the goals of all of them in this order (they were `Fizzle Brassbolts`, `Delivery to the Gnomes`, `Krazek`)
- step 31: take `collect 5862 quest 1187.1` out (it held the step until done on another map); it goes to a new step in `guides/alliance/34-stranglethorn-vale-42-50.guide`, after step 23

## guides/alliance/30-stranglethorn-vale-39-43.guide

- step 4: take `collect 5803 x10 quest 1116.1` out (it held the step until done on another map); it goes to a new step in `guides/alliance/32-swamp-of-sorrows-41-45.guide`, after step 7
- steps 4, 5: make them one step, `step Booty Bay`, holding the goals of all of them in this order (they were `Krazek`, `Fleet Master Seahorn`)

## guides/alliance/31-badlands-40-45.guide

- step 11: end `collect 4611 x9 quest 705.1` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- step 18: end `collect 3829 quest 713.1` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- step 19: end `collect 4389 quest 714.1` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- step 21: end `collect 3823 quest 715.2` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- step 27: end `collect 2868 quest 716.1` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- steps 28, 29: make them one step, `step The Dustbowl`, holding the goals of all of them in this order (they were `Stone Is Better than Cloth`, `Lotwil Veriatus`)

## guides/alliance/32-swamp-of-sorrows-41-45.guide

- after step 7: a new step, `step Speck of Dream Dust`, with `collect 5803 x10 quest 1116.1` (from `guides/alliance/30-stranglethorn-vale-39-43.guide` step 4, 225 yd from step 7)
- step 12: add `collect 6190 quest 1373.1` (from `guides/alliance/25-desolace-34-39.guide` step 34), before the quest's turn-in if the step has it
- steps 14, 15: make them one step, `step Magtoor`, holding the goals of all of them in this order (they were `Magtoor`, `Masat T'andr`)
- step 16: add `collect 5938 x12 quest 1258.1` (from `guides/alliance/28-dustwallow-marsh-38-40.guide` step 15), before the quest's turn-in if the step has it

## guides/alliance/34-stranglethorn-vale-42-50.guide

- steps 2, 3: make them one step, `step Krazek`, holding the goals of all of them in this order (they were `Krazek`, `Kravel Koalbeard`)
- step 12: take `collect 3900 quest 580.1` out (it held the step until done on another map); it goes to `guides/alliance/38-the-hinterlands-46-52.guide` step 14
- steps 13, 14, 15, 16: make them one step, `step Booty Bay`, holding the goals of all of them in this order (they were `Kebok`, `Deeg`, `Fleet Master Seahorn`, `Archmage Ansirem Runeweaver`)
- steps 18, 19, 20: make them one step, `step Booty Bay`, holding the goals of all of them in this order (they were `Sea Wolf MacKinley`, `Stoley`, `Drizzlik`)
- after step 23: a new step, `step Seaforium Booster`, with `collect 5862 quest 1187.1` (from `guides/alliance/29-arathi-highlands-38-41.guide` step 31, 751 yd from step 23)

## guides/alliance/35-tanaris-43-47.guide

- steps 4, 5: make them one step, `step Curgle Cranklehop`, holding the goals of all of them in this order (they were `Erelas Ambersky`, `Innkeeper Fizzgrimble`)
- steps 9, 10: make them one step, `step Mirage Raceway`, holding the goals of all of them in this order (they were `Crank Fizzlebub`, `Fizzle Brassbolts`)
- steps 11, 12: make them one step, `step Mirage Raceway`, holding the goals of all of them in this order (they were `Razzeric`, `Pozzik`)
- step 17: take `kill 8612 x3 quest 3520.1` out (it held the step until done on another map); it goes to `guides/alliance/36-feralas-44-48.guide` step 6
- steps 35, 36: make them one step, `step Steamwheedle Port`, holding the goals of all of them in this order (they were `Security Chief Bilgewhizzle`, `Stoley`)

## guides/alliance/36-feralas-44-48.guide

- steps 3, 4: make them one step, `step Feathermoon Stronghold`, holding the goals of all of them in this order (they were `Ginro Hearthkindle`, `Shandris Feathermoon`)
- step 6: add `kill 8612 x3 quest 3520.1` (from `guides/alliance/35-tanaris-43-47.guide` step 17), before the quest's turn-in if the step has it
- steps 15, 16: make them one step, `step Feathermoon Stronghold`, holding the goals of all of them in this order (they were `Latronicus Moonspear`, `Vestia Moonspear`)
- steps 17, 18: make them one step, `step Quintis Jonespyre`, holding the goals of all of them in this order (they were `Quintis Jonespyre`, `Ginro Hearthkindle`)
- steps 31, 32: make them one step, `step Feathermoon Stronghold`, holding the goals of all of them in this order (they were `Angelas Moonbreeze`, `Ginro Hearthkindle`)
- step 36: take `collect 10819 x15 quest 3661.1` out (it held the step until done on another map); it goes to `guides/alliance/38-the-hinterlands-46-52.guide` step 8
- steps 36, 37, 38, 39: make them one step, `step Rut'theran Village`, holding the goals of all of them in this order (they were `Erelas Ambersky`, `Daryn Lightwind`, `Feralas: A History`, `Daryn Lightwind`)

## guides/alliance/38-the-hinterlands-46-52.guide

- step 8: add `collect 10819 x15 quest 3661.1` (from `guides/alliance/36-feralas-44-48.guide` step 36), before the quest's turn-in if the step has it
- step 10: take `collect 6257 x3 quest 1452.1` out (it held the step until done on another map); it goes to `guides/alliance/42-tanaris-49-54.guide` step 8
- step 10: take `collect 6258 x3 quest 1452.2` out (it held the step until done on another map); it goes to `guides/alliance/41-feralas-48-55.guide` step 14
- step 10: take `collect 6259 x3 quest 1452.3` out (it held the step until done on another map); it goes to `guides/alliance/41-feralas-48-55.guide` step 14
- step 14: add `collect 3900 quest 580.1` (from `guides/alliance/34-stranglethorn-vale-42-50.guide` step 12), before the quest's turn-in if the step has it
- step 19: take `collect 10563 quest 3449.1` out (it held the step until done on another map); it goes to a new step in `guides/alliance/46-azshara-53-53.guide`, after step 2
- step 19: take `collect 10564 quest 3449.2` out (it held the step until done on another map); it goes to a new step in `guides/alliance/46-azshara-53-53.guide`, after step 2
- step 19: take `collect 10565 quest 3449.3` out (it held the step until done on another map); it goes to a new step in `guides/alliance/46-azshara-53-53.guide`, after step 2
- step 19: take `collect 10566 quest 3449.4` out (it held the step until done on another map); it goes to a new step in `guides/alliance/46-azshara-53-53.guide`, after step 2

## guides/alliance/39-stranglethorn-vale-46-47.guide

- steps 2, 3, 4, 5: make them one step, `step Booty Bay`, holding the goals of all of them in this order (they were `Sea Wolf MacKinley`, `Whiskey Slim`, `Crank Fizzlebub`, `Innkeeper Skindle`)

## guides/alliance/40-searing-gorge-47-55.guide

- step 6: take `collect 11723 quest 4450.4` out (it held the step until done on another map); it goes to step 41
- step 6: take `collect 11724 quest 4450.3` out (it held the step until done on another map); it goes to a new step in `guides/alliance/42-tanaris-49-54.guide`, after step 2
- steps 21, 22, 23: make them one step, `step Thorium Point`, holding the goals of all of them in this order (they were `Hansel Heavyhands`, `Taskmaster Scrange`, `Master Smith Burninate`)
- steps 25, 26, 27: make them one step, `step Kalaran Windblade`, holding the goals of all of them in this order (they were `The Torch of Retribution`, `Kalaran Windblade`, `Squire Maltrake`)
- steps 32, 33: make them one step, `step Trinkets...`, holding the goals of all of them in this order (they were `Trinkets...`, ``)
- step 41: add `collect 11723 quest 4450.4` (from step 6), before the quest's turn-in if the step has it
- step 42: end `collect 11947 x6 quest 4512.1` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- step 42: end `collect 11949 x6 quest 4512.2` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- steps 43, 44: make them one step, `step Rut'theran Village`, holding the goals of all of them in this order (they were `Erelas Ambersky`, `Daryn Lightwind`)

## guides/alliance/41-feralas-48-55.guide

- steps 9, 10: make them one step, `step Zorbin Fandazzle`, holding the goals of all of them in this order (they were `Zorbin Fandazzle`, ``)
- step 14: add `collect 6258 x3 quest 1452.2` (from `guides/alliance/38-the-hinterlands-46-52.guide` step 10), before the quest's turn-in if the step has it
- step 14: add `collect 6259 x3 quest 1452.3` (from `guides/alliance/38-the-hinterlands-46-52.guide` step 10), before the quest's turn-in if the step has it

## guides/alliance/42-tanaris-49-54.guide

- after step 2: a new step, `step Overdue Package`, with `collect 11724 quest 4450.3` (from `guides/alliance/40-searing-gorge-47-55.guide` step 6, 154 yd from step 2)
- step 3: take `collect 11834 x12 quest 4504.1` out (it held the step until done on another map); it goes to `guides/alliance/45-un-goro-crater-51-56.guide` step 20
- step 8: add `collect 6257 x3 quest 1452.1` (from `guides/alliance/38-the-hinterlands-46-52.guide` step 10), before the quest's turn-in if the step has it
- step 8: take `collect 10556 quest 3444.1` out (it held the step until done on another map); it goes to `guides/alliance/44-the-hinterlands-50-57.guide` step 12
- step 14: take `collect 8526 quest 2641.1` out (it held the step until done on another map); it goes to a new step in `guides/alliance/44-the-hinterlands-50-57.guide`, after step 7
- steps 14, 15: make them one step, `step Gadgetzan`, holding the goals of all of them in this order (they were `Sprinkle`, `Alchemist Pestlezugg`)

## guides/alliance/44-the-hinterlands-50-57.guide

- after step 7: a new step, `step Violet Tragan`, with `collect 8526 quest 2641.1` (from `guides/alliance/42-tanaris-49-54.guide` step 14, 330 yd from step 7)
- steps 8, 9: make them one step, `step Agnar Beastamer`, holding the goals of all of them in this order (they were `Agnar Beastamer`, `Becoming a Parent`)
- step 12: add `collect 10556 quest 3444.1` (from `guides/alliance/42-tanaris-49-54.guide` step 8), before the quest's turn-in if the step has it
- step 12: take `collect 11829 x9 quest 4502.1` out (it held the step until done on another map); it goes to `guides/alliance/45-un-goro-crater-51-56.guide` step 61
- steps 17, 18: make them one step, `step Fallen Hero of the Horde`, holding the goals of all of them in this order (they were ``, `Fallen Hero of the Horde`)

## guides/alliance/45-un-goro-crater-51-56.guide

- steps 6, 7: make them one step, `step Marin Noggenfogger`, holding the goals of all of them in this order (they were `Marin Noggenfogger`, `Noggenfogger Elixir`)
- step 20: add `collect 11834 x12 quest 4504.1` (from `guides/alliance/42-tanaris-49-54.guide` step 3), before the quest's turn-in if the step has it
- step 25: end `collect 10561 quest 4244.1` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- steps 51, 52, 53, 54, 55: make them one step, `step Marshal's Refuge`, holding the goals of all of them in this order (they were `Muigin`, `Spraggle Frock`, `Spark Nilminer`, `Hol'anyee Marshal`, `Williden Marshal`)
- step 61: add `collect 11829 x9 quest 4502.1` (from `guides/alliance/44-the-hinterlands-50-57.guide` step 12), before the quest's turn-in if the step has it
- step 73: take `collect 12383 x10 quest 978.1` out (it held the step until done on another map); it goes to `guides/alliance/48-winterspring-54-59.guide` step 5

## guides/alliance/46-azshara-53-53.guide

- after step 2: a new step, `step Rubbing: Rune of Beth'Amara`, with `collect 10563 quest 3449.1` (from `guides/alliance/38-the-hinterlands-46-52.guide` step 19, 164 yd from step 2), `collect 10564 quest 3449.2` (from `guides/alliance/38-the-hinterlands-46-52.guide` step 19, 326 yd from step 2), `collect 10565 quest 3449.3` (from `guides/alliance/38-the-hinterlands-46-52.guide` step 19, 153 yd from step 2), `collect 10566 quest 3449.4` (from `guides/alliance/38-the-hinterlands-46-52.guide` step 19, 218 yd from step 2)

## guides/alliance/48-winterspring-54-59.guide

- step 5: add `collect 12383 x10 quest 978.1` (from `guides/alliance/45-un-goro-crater-51-56.guide` step 73), before the quest's turn-in if the step has it

## guides/alliance/49-felwood-54-55.guide

- step 4: take `collect 5646 quest 4441.1` out (it held the step until done on another map); it goes to a new step in `guides/alliance/55-western-plaguelands-58-58.guide`, after step 22
- steps 4, 5: make them one step, `step Emerald Sanctuary`, holding the goals of all of them in this order (they were `Eridan Bluewind`, `Taronn Redfeather`)

## guides/alliance/50-winterspring-54-59.guide

- steps 4, 5, 6: make them one step, `step Everlook`, holding the goals of all of them in this order (they were `Innkeeper Vizzie`, `Argent Officer Pureheart`, `Pamela Redpath`)
- step 20: take `kill 10977 quest 5163.3` out (it held the step until done on another map); it goes to a new step in `guides/alliance/55-western-plaguelands-58-58.guide`, after step 31
- step 20: take `kill 7583 quest 5163.2` out (it held the step until done on another map); it goes to a new step in `guides/alliance/55-western-plaguelands-58-58.guide`, after step 29

## guides/alliance/51-western-plaguelands-55-55.guide

- step 4: take `collect 11954 x10 quest 4513.1` out (it held the step until done on another map); it goes to `guides/alliance/55-western-plaguelands-58-58.guide` step 31

## guides/alliance/52-burning-steppes-55-56.guide

- steps 22, 23: make them one step, `step Highlord Bolvar Fordragon`, holding the goals of all of them in this order (they were `Lady Katrana Prestor`, `Highlord Bolvar Fordragon`)

## guides/alliance/53-western-plaguelands-56-60.guide

- step 15: take `collect 16003 quest 6185.1` out (it held the step until done on another map); it goes to a new step in `guides/alliance/54-eastern-plaguelands-57-60.guide`, after step 5
- step 15: take `collect 16001 quest 6185.2` out (it held the step until done on another map); it goes to a new step in `guides/alliance/54-eastern-plaguelands-57-60.guide`, after step 5
- step 15: take `collect 16002 quest 6185.3` out (it held the step until done on another map); it goes to a new step in `guides/alliance/54-eastern-plaguelands-57-60.guide`, after step 5

## guides/alliance/54-eastern-plaguelands-57-60.guide

- after step 5: a new step, `step SI:7 Insignia (Rutger)`, with `collect 16003 quest 6185.1` (from `guides/alliance/53-western-plaguelands-56-60.guide` step 15, 123 yd from step 5), `collect 16001 quest 6185.2` (from `guides/alliance/53-western-plaguelands-56-60.guide` step 15, 164 yd from step 5), `collect 16002 quest 6185.3` (from `guides/alliance/53-western-plaguelands-56-60.guide` step 15, 185 yd from step 5)
- steps 11, 12: make them one step, `step Chillwind Camp`, holding the goals of all of them in this order (they were `High Priestess MacDonnell`, `Flint Shadowmore`)
- steps 28, 29: make them one step, `step Chillwind Camp`, holding the goals of all of them in this order (they were `Highlord Bolvar Fordragon`, `Nathaniel Dumah`)

## guides/alliance/55-western-plaguelands-58-58.guide

- after step 22: a new step, `step Vial of Blessed Water`, with `collect 5646 quest 4441.1` (from `guides/alliance/49-felwood-54-55.guide` step 4, 539 yd from step 22)
- steps 26, 27: make them one step, `step Eridan Bluewind`, holding the goals of all of them in this order (they were `Purified!`, `Eridan Bluewind`)
- after step 29: a new step, `step Sprinkle`, with `kill 7583 quest 5163.2` (from `guides/alliance/50-winterspring-54-59.guide` step 20, 80 yd from step 29)
- step 31: add `collect 11954 x10 quest 4513.1` (from `guides/alliance/51-western-plaguelands-55-55.guide` step 4), before the quest's turn-in if the step has it
- after step 31: a new step, `step Quixxil`, with `kill 10977 quest 5163.3` (from `guides/alliance/50-winterspring-54-59.guide` step 20, 79 yd from step 31)

## guides/horde/01-durotar-1-13.guide

- step 2: add the class/race limit to these goals: `accept 1485 only Warlock`, `collect 6487 x6 quest 1485.1 only Warlock`
- step 5: add the class/race limit to these goals: `accept 792 only Warrior,Paladin,Hunter,Rogue,Priest,Shaman,Mage,Druid`, `kill 3101 x12 quest 792.1 only Warrior,Paladin,Hunter,Rogue,Priest,Shaman,Mage,Druid`
- step 6: add the class/race limit to these goals: `accept 2383 only Orc,Warrior`, `accept 3089 only Orc,Shaman`, `accept 3088 only Orc,Rogue`, `accept 3087 only Orc,Hunter`, `accept 3090 only Orc,Warlock`, `accept 3065 only Troll,Warrior`, `accept 3082 only Troll,Hunter`, `accept 3083 only Troll,Rogue`, `accept 3085 only Troll,Priest`, `accept 3084 only Troll,Shaman`, `accept 3086 only Troll,Mage`
- step 7: add the class/race limit to this goal: `turnin 3088 only Orc,Rogue`
- steps 7, 8, 9: make them one step, `step The Den`, holding the goals of all of them in this order (they were `Rwag`, `Encrypted Tablet`, `Nartok`)
- step 8: add the class/race limit to this goal: `turnin 3083 only Troll,Rogue`
- step 9: add the class/race limit to this goal: `turnin 3090 only Orc,Warlock`
- step 11: add the class/race limit to this goal: `turnin 3085 only Troll,Priest`
- steps 11, 12, 13, 14, 15, 16, 17, 18: make them one step, `step The Den`, holding the goals of all of them in this order (they were `Ken'jai`, `Frang`, `Simple Tablet`, `Shikrik`, `Rune-Inscribed Tablet`, `Jen'shan`, `Etched Tablet`, `Mai'ah`)
- step 12: add the class/race limit to this goal: `turnin 2383 only Orc,Warrior`
- step 13: add the class/race limit to this goal: `turnin 3065 only Troll,Warrior`
- step 14: add the class/race limit to this goal: `turnin 3089 only Orc,Shaman`
- step 15: add the class/race limit to this goal: `turnin 3084 only Troll,Shaman`
- step 16: add the class/race limit to this goal: `turnin 3087 only Orc,Hunter`
- step 17: add the class/race limit to this goal: `turnin 3082 only Troll,Hunter`
- step 18: add the class/race limit to this goal: `turnin 3086 only Troll,Mage`
- step 22: add the class/race limit to these goals: `turnin 1485 only Warlock`, `accept 1499 only Warlock`
- steps 22, 23: make them one step, `step The Den`, holding the goals of all of them in this order (they were `Ruzan`, `Zureetha Fargaze`)
- step 23: add the class/race limit to this goal: `turnin 1499 only Warlock`
- step 32: add the class/race limit to this goal: `turnin 792 only Warrior,Paladin,Hunter,Rogue,Priest,Shaman,Mage,Druid`
- step 33: add the class/race limit to these goals: `accept 1516 only Shaman`, `collect 6640 x2 quest 1516.1 only Shaman`
- steps 35, 36: make them one step, `step The Den`, holding the goals of all of them in this order (they were `Zureetha Fargaze`, `Canaga Earthcaller`)
- step 36: add the class/race limit to these goals: `turnin 1516 only Shaman`, `accept 1517 only Shaman`
- step 37: add the class/race limit to these goals: `turnin 1517 only Shaman`, `accept 1518 only Shaman`
- step 38: add the class/race limit to this goal: `turnin 1518 only Shaman`
- steps 46, 47: make them one step, `step Innkeeper Grosk`, holding the goals of all of them in this order (they were `Innkeeper Grosk`, ``)
- step 66: add the class/race limit to this goal: `accept 1505 only Warrior`
- step 67: add the class/race limit to these goals: `turnin 1505 only Warrior`, `accept 1498 only Warrior`, `collect 6486 x5 quest 1498.1 only Warrior`
- step 68: add the class/race limit to this goal: `turnin 1498 only Warrior`
- step 69: add the class/race limit to this goal: `accept 1506 only Warlock`
- step 70: add the class/race limit to these goals: `turnin 1506 only Warlock`, `accept 1501 only Warlock`, `collect 6535 quest 1501.1 only Warlock`
- step 71: add the class/race limit to this goal: `turnin 1501 only Warlock`
- step 73: add the class/race limit to this goal: `accept 2983 only Shaman`
- step 74: add the class/race limit to these goals: `turnin 2983 only Shaman`, `accept 1524 only Shaman`
- step 75: add the class/race limit to these goals: `turnin 1524 only Shaman`, `accept 1525 only Shaman`, `collect 6652 quest 1525.2 only Shaman`
- step 76: add the class/race limit to these goals: `turnin 1525 only Shaman`, `accept 1526 only Shaman`, `collect 6655 quest 1526.1 only Shaman`
- step 78: add the class/race limit to these goals: `turnin 1526 only Shaman`, `accept 1527 only Shaman`
- step 79: add the class/race limit to this goal: `turnin 1527 only Shaman`
- step 80: add the class/race limit to these goals: `accept 6062 only Hunter`, `kill 3099 quest 6062.1 only Hunter`
- step 82: add the class/race limit to these goals: `turnin 6062 only Hunter`, `accept 6083 only Hunter`, `kill 3107 quest 6083.1 only Hunter`
- step 84: add the class/race limit to these goals: `turnin 6083 only Hunter`, `accept 6082 only Hunter`, `kill 3126 quest 6082.1 only Hunter`
- step 86: add the class/race limit to these goals: `turnin 6082 only Hunter`, `accept 6081 only Hunter`
- step 87: add the class/race limit to this goal: `turnin 6081 only Hunter`
- step 88: add the class/race limit to this goal: `accept 5652 only Priest`
- step 89: add the class/race limit to this goal: `turnin 5652 only Priest`
- step 96: take `collect 4904 quest 812.1` out (it held the step until done on another map); it goes to step 99
- step 99: add `collect 4904 quest 812.1` (from step 96), before the quest's turn-in if the step has it

## guides/horde/02-mulgore-1-14.guide

- step 5: add the class/race limit to these goals: `accept 3091 only Warrior`, `accept 3093 only Shaman`, `accept 3092 only Hunter`, `accept 3094 only Druid`
- step 6: add the class/race limit to this goal: `turnin 3093 only Shaman`
- steps 6, 7, 8, 9, 10: make them one step, `step Camp Narache`, holding the goals of all of them in this order (they were `Meela Dawnstrider`, `Gart Mistrunner`, `Chief Hawkwind`, `Harutt Thunderhorn`, `Lanka Farshot`)
- step 7: add the class/race limit to this goal: `turnin 3094 only Druid`
- step 9: add the class/race limit to this goal: `turnin 3091 only Warrior`
- step 10: add the class/race limit to this goal: `turnin 3092 only Hunter`
- step 17: add the class/race limit to these goals: `accept 1519 only Shaman`, `collect 6634 x2 quest 1519.1 only Shaman`
- steps 19, 20, 21: make them one step, `step Camp Narache`, holding the goals of all of them in this order (they were `Brave Windfeather`, `Seer Ravenfeather`, `Chief Hawkwind`)
- step 20: add the class/race limit to these goals: `turnin 1519 only Shaman`, `accept 1520 only Shaman`
- step 22: add the class/race limit to these goals: `turnin 1520 only Shaman`, `accept 1521 only Shaman`
- step 23: add the class/race limit to this goal: `turnin 1521 only Shaman`
- steps 35, 36: make them one step, `step Mull Thunderhorn`, holding the goals of all of them in this order (they were `Mull Thunderhorn`, `Winterhoof Cleansing`)
- steps 55, 56: make them one step, `step Mull Thunderhorn`, holding the goals of all of them in this order (they were `Mull Thunderhorn`, `Wildmane Cleansing`)
- step 58: add the class/race limit to this goal: `accept 1505 only Warrior`
- step 61: add the class/race limit to these goals: `turnin 1505 only Warrior`, `accept 1498 only Warrior`, `collect 6486 x5 quest 1498.1 only Warrior`
- step 61: take `collect 6486 x5 quest 1498.1 only Warrior` out (it held the step until done on another map); it goes to a new step in `guides/horde/02-mulgore-1-14.guide`, before step 62
- step 62: add the class/race limit to this goal: `turnin 1498 only Warrior`
- before step 62: a new step, `step Singed Scale`, with `collect 6486 x5 quest 1498.1 only Warrior` (from `guides/horde/02-mulgore-1-14.guide` step 61, 74 yd from step 62)
- step 66: add the class/race limit to this goal: `accept 1524 only Shaman`
- step 67: add the class/race limit to these goals: `turnin 1524 only Shaman`, `accept 1525 only Shaman`, `collect 6652 quest 1525.2 only Shaman`
- step 68: add the class/race limit to these goals: `turnin 1525 only Shaman`, `accept 1526 only Shaman`, `collect 6655 quest 1526.1 only Shaman`
- step 70: add the class/race limit to these goals: `turnin 1526 only Shaman`, `accept 1527 only Shaman`
- step 71: add the class/race limit to this goal: `turnin 1527 only Shaman`
- step 72: add the class/race limit to these goals: `accept 6061 only Hunter`, `kill 2956 quest 6061.1 only Hunter`
- step 74: add the class/race limit to these goals: `turnin 6061 only Hunter`, `accept 6087 only Hunter`, `kill 2959 quest 6087.1 only Hunter`
- step 76: add the class/race limit to this goal: `turnin 6087 only Hunter`
- step 78: add the class/race limit to these goals: `accept 6088 only Hunter optional`, `kill 2970 quest 6088.1 only Hunter`, `turnin 6088 only Hunter optional`
- step 79: add the class/race limit to this goal: `accept 6089 only Hunter`
- step 80: add the class/race limit to this goal: `turnin 6089 only Hunter`
- step 81: add the class/race limit to this goal: `accept 5926 only Druid`
- step 82: add the class/race limit to these goals: `turnin 5926 only Druid`, `accept 5922 only Druid`
- step 83: add the class/race limit to these goals: `turnin 5922 only Druid`, `accept 5930 only Druid`, `kill 11956 quest 5930.1 only Druid`
- step 86: add the class/race limit to these goals: `turnin 5930 only Druid`, `accept 5932 only Druid`
- step 87: add the class/race limit to these goals: `turnin 5932 only Druid`, `accept 6002 only Druid`, `kill 12144 quest 6002.1 only Druid`
- step 88: end `use 15710` with `optional` (no quest to follow it to); it held the step until done in another zone
- step 89: add the class/race limit to this goal: `turnin 6002 only Druid`
- step 99: end `use 5416` with `optional` (no quest to follow it to); it held the step until done in another zone
- steps 110, 111: make them one step, `step Thork`, holding the goals of all of them in this order (they were `Thork`, `Devrak`)

## guides/horde/03-tirisfal-glades-1-12.guide

- step 3: add the class/race limit to these goals: `accept 1470 only Warlock`, `collect 6281 x3 quest 1470.1 only Warlock`
- step 5: add the class/race limit to these goals: `accept 3095 only Warrior`, `accept 3099 only Warlock`, `accept 3096 only Rogue`, `accept 3097 only Priest`, `accept 3098 only Mage`
- step 7: add the class/race limit to this goal: `turnin 3095 only Warrior`
- step 8: add the class/race limit to this goal: `turnin 3099 only Warlock`
- steps 8, 9: make them one step, `step Maximillion and Venya Marthand`, holding the goals of all of them in this order (they were `Maximillion`, `Venya Marthand`)
- step 9: add the class/race limit to this goal: `turnin 1470 only Warlock`
- step 10: add the class/race limit to this goal: `turnin 3096 only Rogue`
- step 11: add the class/race limit to this goal: `turnin 3097 only Priest`
- steps 11, 12: make them one step, `step Dark Cleric Duesten and Isabella`, holding the goals of all of them in this order (they were `Dark Cleric Duesten`, `Isabella`)
- step 12: add the class/race limit to this goal: `turnin 3098 only Mage`
- steps 35, 36: make them one step, `step Innkeeper Renee`, holding the goals of all of them in this order (they were `Innkeeper Renee`, ``)
- steps 43, 44: make them one step, `step Calvin Montague`, holding the goals of all of them in this order (they were `Calvin Montague`, `A Rogue's Deal`)
- steps 47, 48: make them one step, `step Brill`, holding the goals of all of them in this order (they were `Coleman Farthing`, `Yvette Farthing`)
- step 57: add the class/race limit to this goal: `accept 5658 only Priest`
- steps 57, 58: make them one step, `step Aelthalyste`, holding the goals of all of them in this order (they were `Aelthalyste`, `Touch of Weakness`)
- step 58: add the class/race limit to this goal: `turnin 5658 only Priest`
- step 60: add the class/race limit to these goals: `accept 1473 only Warlock`, `collect 6285 quest 1473.1 only Warlock`
- step 61: add the class/race limit to these goals: `turnin 1473 only Warlock`, `accept 1471 only Warlock`, `kill 5676 quest 1471.1 only Warlock`
- step 63: add the class/race limit to this goal: `turnin 1471 only Warlock`
- step 65: add the class/race limit to these goals: `accept 1819 only Warrior`, `kill 6390 quest 1819.1 only Warrior`
- step 66: add the class/race limit to these goals: `turnin 1819 only Warrior`, `accept 1820 only Warrior`
- step 67: add the class/race limit to this goal: `turnin 1820 only Warrior`
- steps 67, 68: make them one step, `step Brill`, holding the goals of all of them in this order (they were `Coleman Farthing`, `Captured Scarlet Zealot`)

## guides/horde/04-silverpine-forest-1-21.guide

- steps 5, 6, 7: make them one step, `step Sepulcher`, holding the goals of all of them in this order (they were `Shadow Priest Allister`, `Innkeeper Bates`, `Karos Razok`)
- steps 12, 13: make them one step, `step Gordon Wendham and Michael Garrett`, holding the goals of all of them in this order (they were `Gordon Wendham`, `Michael Garrett`)

## guides/horde/05-the-barrens-12-20.guide

- steps 1, 2: make them one step, `step Far Watch Post`, holding the goals of all of them in this order (they were `Kargal Battlescar`, `Ak'Zeloth`)
- steps 9, 10: make them one step, `step Devrak`, holding the goals of all of them in this order (they were `Devrak`, `Meats to Orgrimmar`)
- step 25: add the class/race limit to this goal: `accept 6126 only Tauren,Druid`
- step 26: add the class/race limit to these goals: `turnin 6126 only Tauren,Druid`, `accept 6127 only Tauren,Druid`, `collect 15843 quest 6127.1 only Tauren,Druid`
- step 28: add the class/race limit to these goals: `turnin 6127 only Tauren,Druid`, `accept 6128 only Tauren,Druid`, `collect 15852 x5 quest 6128.2 only Tauren,Druid`
- step 29: add the class/race limit to these goals: `turnin 6128 only Tauren,Druid`, `accept 6129 only Tauren,Druid`, `kill 12296 x10 quest 6129.1 only Tauren,Druid`
- step 31: add the class/race limit to these goals: `turnin 6129 only Tauren,Druid`, `accept 6130 only Tauren,Druid`
- step 32: add the class/race limit to this goal: `turnin 6130 only Tauren,Druid`

## guides/horde/07-the-barrens-16-30.guide

- step 2: add the class/race limit to these goals: `accept 27 only Tauren,Druid optional`, `turnin 27 only Tauren,Druid optional`
- step 3: add the class/race limit to these goals: `accept 28 only Tauren,Druid`, `interact 15885 quest 28.1 only Tauren,Druid`
- step 5: add the class/race limit to these goals: `turnin 28 only Tauren,Druid`, `accept 30 only Tauren,Druid`, `collect 15885 quest 30.1 only Tauren,Druid`
- step 7: end `use 15883` with `optional` (no quest to follow it to); it held the step until done in another zone
- step 8: add the class/race limit to these goals: `turnin 30 only Tauren,Druid`, `accept 31 only Tauren,Druid`
- step 9: add the class/race limit to this goal: `turnin 31 only Tauren,Druid`
- step 37: take `collect 5570 x15 quest 1069.1` out (it held the step until done on another map); it goes to `guides/horde/08-stonetalon-mountains-21-26.guide` step 4
- step 52: add the class/race limit to this goal: `accept 1507 only Warlock`
- step 53: add the class/race limit to these goals: `turnin 1507 only Warlock`, `accept 1508 only Warlock`
- step 54: add the class/race limit to these goals: `turnin 1508 only Warlock`, `accept 1509 only Warlock`
- step 55: add the class/race limit to these goals: `turnin 1509 only Warlock`, `accept 1510 only Warlock`
- step 56: add the class/race limit to these goals: `turnin 1510 only Warlock`, `accept 1511 only Warlock`
- step 57: add the class/race limit to these goals: `turnin 1511 only Warlock`, `accept 1515 only Warlock`
- step 58: add the class/race limit to these goals: `turnin 1515 only Warlock`, `accept 1512 only Warlock`
- step 59: add the class/race limit to these goals: `turnin 1512 only Warlock`, `accept 1513 only Warlock`, `kill 5677 quest 1513.1 only Warlock`
- step 60: end `use 6626` with `optional` (no quest to follow it to); it held the step until done in another zone
- step 61: add the class/race limit to this goal: `turnin 1513 only Warlock`
- step 68: take `collect 5868 quest 1195.1` out (it held the step until done on another map); it goes to a new step in `guides/horde/13-ashenvale-25-27.guide`, after step 7

## guides/horde/08-stonetalon-mountains-21-26.guide

- step 4: add `collect 5570 x15 quest 1069.1` (from `guides/horde/07-the-barrens-16-30.guide` step 37), before the quest's turn-in if the step has it

## guides/horde/09-ashenvale-22-23.guide

- step 1: add the class/race limit to this goal: `accept 1528 only Shaman`
- step 2: add the class/race limit to these goals: `turnin 1528 only Shaman`, `accept 1530 only Shaman`
- step 3: add the class/race limit to these goals: `turnin 1530 only Shaman`, `accept 1535 only Shaman`, `collect 7769 quest 1535.1 only Shaman`
- step 5: add the class/race limit to these goals: `turnin 1535 only Shaman`, `accept 1536 only Shaman`, `collect 7771 quest 1536.1 only Shaman`
- step 5: end `collect 7771 quest 1536.1 only Shaman` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- step 10: add the class/race limit to these goals: `turnin 1536 only Shaman`, `accept 1534 only Shaman`, `collect 7770 quest 1534.1 only Shaman`

## guides/horde/10-the-barrens-22-27.guide

- step 3: add the class/race limit to these goals: `turnin 1534 only Shaman`, `accept 220 only Shaman`
- step 4: add the class/race limit to these goals: `turnin 220 only Shaman`, `accept 63 only Shaman`, `collect 7812 quest 63.1 only Shaman`
- step 4: take `collect 7812 quest 63.1 only Shaman` out (it held the step until done on another map); it goes to step 6
- step 6: add the class/race limit to these goals: `turnin 63 only Shaman`, `accept 100 only Shaman`
- step 6: add `collect 7812 quest 63.1 only Shaman` (from step 4), before the quest's turn-in if the step has it
- step 7: add the class/race limit to these goals: `turnin 100 only Shaman`, `accept 96 only Shaman`
- step 8: add the class/race limit to this goal: `turnin 96 only Shaman`
- steps 18, 19: make them one step, `step Camp Taurajo`, holding the goals of all of them in this order (they were `Jorn Skyseer`, `Mangletooth`)

## guides/horde/13-ashenvale-25-27.guide

- after step 7: a new step, `step Filled Etched Phial`, with `collect 5868 quest 1195.1` (from `guides/horde/07-the-barrens-16-30.guide` step 68, 82 yd from step 7)
- step 28: add the class/race limit to these goals: `accept 2460 only Rogue`, `kill 3401 quest 2460.1 only Rogue`
- step 29: add the class/race limit to these goals: `turnin 2460 only Rogue`, `accept 2458 only Rogue`
- step 31: add the class/race limit to these goals: `turnin 2458 only Rogue`, `accept 2478 only Rogue`, `kill 7308 x2 quest 2478.3 only Rogue`, `collect 8073 quest 2478.6 only Rogue`
- step 32: add the class/race limit to these goals: `turnin 2478 only Rogue`, `accept 2479 only Rogue`
- step 36: add the class/race limit to these goals: `turnin 2479 only Rogue`, `accept 2480 only Rogue`
- step 37: add the class/race limit to this goal: `turnin 2480 only Rogue`

## guides/horde/16-thousand-needles-28-37.guide

- step 8: end `interact 175944 quest 5088.2` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- steps 9, 10: make them one step, `step Cliffwatcher Longhorn`, holding the goals of all of them in this order (they were `Cliffwatcher Longhorn`, `Innkeeper Abeqwa`)
- step 22: take `collect 5811 quest 1136.1` out (it held the step until done on another map); it goes to `guides/horde/25-alterac-mountains-37-38.guide` step 3

## guides/horde/18-arathi-highlands-30-34.guide

- step 9: add the class/race limit to this goal: `accept 1718 only Warrior`
- step 10: add the class/race limit to these goals: `turnin 1718 only Warrior`, `accept 1719 only Warrior`, `kill 6238 quest 1719.1 only Warrior`
- step 11: add the class/race limit to this goal: `turnin 1719 only Warrior`
- step 12: add the class/race limit to this goal: `accept 1531 only Shaman`
- step 13: add the class/race limit to this goal: `turnin 1531 only Shaman`

## guides/horde/19-thousand-needles-31-37.guide

- steps 9, 10, 11: make them one step, `step Mirage Raceway`, holding the goals of all of them in this order (they were `Kravel Koalbeard`, `Fizzle Brassbolts`, `Wizzle Brassbolts`)

## guides/horde/20-stranglethorn-vale-31-40.guide

- steps 18, 19: make them one step, `step Barnil Stonepot`, holding the goals of all of them in this order (they were `Chapter IV`, `Barnil Stonepot`)

## guides/horde/21-desolace-32-39.guide

- steps 43, 44: make them one step, `step Ghost Walker Post`, holding the goals of all of them in this order (they were `Takata Steelblade`, `The Corrupter`)
- step 48: take `collect 6190 quest 1373.1` out (it held the step until done on another map); it goes to `guides/horde/29-swamp-of-sorrows-39-45.guide` step 11

## guides/horde/22-dustwallow-marsh-34-37.guide

- steps 2, 3: make them one step, `step Lieutenant Paval Reethe`, holding the goals of all of them in this order (they were `Lieutenant Paval Reethe`, `Krog`)
- steps 4, 5: make them one step, `step Brackenwall Village`, holding the goals of all of them in this order (they were `Suspicious Hoofprints`, `Do'gol`)

## guides/horde/23-stranglethorn-vale-34-41.guide

- steps 21, 22, 23, 24: make them one step, `step Barnil Stonepot`, holding the goals of all of them in this order (they were `Barnil Stonepot`, ``, `Barnil Stonepot`, ``)
- steps 27, 28, 29, 30: make them one step, `step Barnil Stonepot`, holding the goals of all of them in this order (they were `Barnil Stonepot`, ``, `Barnil Stonepot`, ``)
- steps 32, 33, 34: make them one step, `step Booty Bay`, holding the goals of all of them in this order (they were `Kebok`, `Krazek`, `Baron Revilgaz`)
- steps 36, 37, 38, 39: make them one step, `step Grom'gol Base Camp`, holding the goals of all of them in this order (they were `Commander Aggro'gosh`, `Far Seer Mok'thardin`, `Nimboya`, `Zengu`)

## guides/horde/24-arathi-highlands-36-38.guide

- steps 4, 5: make them one step, `step Zengu`, holding the goals of all of them in this order (they were `Innkeeper Adegwa`, `Zengu`)
- steps 13, 14: make them one step, `step Gor'mul`, holding the goals of all of them in this order (they were `Gor'mul`, `Tor'gan`)

## guides/horde/25-alterac-mountains-37-38.guide

- step 3: add `collect 5811 quest 1136.1` (from `guides/horde/16-thousand-needles-28-37.guide` step 22), before the quest's turn-in if the step has it

## guides/horde/26-thousand-needles-38-41.guide

- steps 2, 3, 4, 5: make them one step, `step Mirage Raceway`, holding the goals of all of them in this order (they were `Kravel Koalbeard`, `Fizzle Brassbolts`, `Delivery to the Gnomes`, `Krazek`)
- steps 6, 7: make them one step, `step Mirage Raceway`, holding the goals of all of them in this order (they were `Pozzik`, `Razzeric`)
- step 7: take `collect 5862 quest 1187.1` out (it held the step until done on another map); it goes to a new step in `guides/horde/28-stranglethorn-vale-39-44.guide`, after step 8

## guides/horde/27-dustwallow-marsh-38-45.guide

- step 8: end `collect 3713 x3 quest 1218.1` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- steps 12, 13: make them one step, `step Brackenwall Village`, holding the goals of all of them in this order (they were `Do'gol`, `Krog`)
- steps 17, 18: make them one step, `step "Swamp Eye" Jarl`, holding the goals of all of them in this order (they were `Jarl Needs a Blade`, `Nazeer Bloodpike`)

## guides/horde/28-stranglethorn-vale-39-44.guide

- step 4: take `collect 5803 x10 quest 1116.1` out (it held the step until done on another map); it goes to a new step in `guides/horde/29-swamp-of-sorrows-39-45.guide`, after step 7
- after step 8: a new step, `step Seaforium Booster`, with `collect 5862 quest 1187.1` (from `guides/horde/26-thousand-needles-38-41.guide` step 7, 223 yd from step 8)
- step 8: take `collect 5942 quest 1261.1` out (it held the step until done on another map); it goes to a new step in `guides/horde/34-dustwallow-marsh-43-44.guide`, after step 3
- steps 15, 16: make them one step, `step Booty Bay`, holding the goals of all of them in this order (they were `First Mate Crazz`, `Sea Wolf MacKinley`)

## guides/horde/29-swamp-of-sorrows-39-45.guide

- after step 7: a new step, `step Speck of Dream Dust`, with `collect 5803 x10 quest 1116.1` (from `guides/horde/28-stranglethorn-vale-39-44.guide` step 4, 63 yd from step 7)
- step 11: add `collect 6190 quest 1373.1` (from `guides/horde/21-desolace-32-39.guide` step 48), before the quest's turn-in if the step has it

## guides/horde/30-arathi-highlands-40-40.guide

- steps 10, 11: make them one step, `step Faldir's Cove`, holding the goals of all of them in this order (they were `Captain Steelgut`, `Doctor Draxlegauge`)

## guides/horde/31-badlands-40-45.guide

- step 1: end `collect 4611 x9 quest 705.1` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- step 7: end `collect 3829 quest 713.1` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- step 8: end `collect 4389 quest 714.1` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone

## guides/horde/33-stranglethorn-vale-42-45.guide

- steps 13, 14, 15, 16: make them one step, `step Booty Bay`, holding the goals of all of them in this order (they were `Kebok`, `Kravel Koalbeard`, `Deeg`, `Fleet Master Seahorn`)
- steps 18, 19: make them one step, `step Grom'gol Base Camp`, holding the goals of all of them in this order (they were `Kin'weelay`, `Nimboya`)

## guides/horde/34-dustwallow-marsh-43-44.guide

- after step 3: a new step, `step Jeweled Pendant`, with `collect 5942 quest 1261.1` (from `guides/horde/28-stranglethorn-vale-39-44.guide` step 8, 423 yd from step 3)

## guides/horde/36-tanaris-44-46.guide

- steps 8, 9: make them one step, `step Mirage Raceway`, holding the goals of all of them in this order (they were `Crank Fizzlebub`, `Fizzle Brassbolts`)
- steps 10, 11, 12: make them one step, `step Mirage Raceway`, holding the goals of all of them in this order (they were `Razzeric`, `Pozzik`, `Zamek`)
- step 17: take `kill 8612 x3 quest 3520.1` out (it held the step until done on another map); it goes to a new step in `guides/horde/37-feralas-45-53.guide`, after step 20
- steps 34, 35: make them one step, `step Steamwheedle Port`, holding the goals of all of them in this order (they were `Security Chief Bilgewhizzle`, `Stoley`)

## guides/horde/37-feralas-45-53.guide

- after step 20: a new step, `step Screecher Spirit`, with `kill 8612 x3 quest 3520.1` (from `guides/horde/36-tanaris-44-46.guide` step 17, 70 yd from step 20)
- step 35: take `collect 9594 x10 quest 3123.1` out (it held the step until done on another map); it goes to `guides/horde/39-the-hinterlands-46-48.guide` step 6

## guides/horde/38-azshara-46-52.guide

- step 5: take `interact 144071 quest 2995.1` out (it held the step until done on another map); it goes to `guides/horde/39-the-hinterlands-46-48.guide` step 5
- step 5: take `interact 144073 quest 2995.3` out (it held the step until done on another map); it goes to `guides/horde/39-the-hinterlands-46-48.guide` step 2
- step 5: take `interact 144072 quest 2995.2` out (it held the step until done on another map); it goes to a new step in `guides/horde/39-the-hinterlands-46-48.guide`, after step 15

## guides/horde/39-the-hinterlands-46-48.guide

- step 2: add `interact 144073 quest 2995.3` (from `guides/horde/38-azshara-46-52.guide` step 5), before the quest's turn-in if the step has it
- step 5: add `interact 144071 quest 2995.1` (from `guides/horde/38-azshara-46-52.guide` step 5), before the quest's turn-in if the step has it
- step 6: add `collect 9594 x10 quest 3123.1` (from `guides/horde/37-feralas-45-53.guide` step 35), before the quest's turn-in if the step has it
- after step 15: a new step, `step Highvale Notes`, with `interact 144072 quest 2995.2` (from `guides/horde/38-azshara-46-52.guide` step 5, 62 yd from step 15)
- steps 21, 22: make them one step, `step Revantusk Village`, holding the goals of all of them in this order (they were `Another Message to the Wildhammer`, `Huntsman Markhor`)

## guides/horde/40-stranglethorn-vale-48-48.guide

- steps 7, 8, 9, 10: make them one step, `step Barnil Stonepot`, holding the goals of all of them in this order (they were `Barnil Stonepot`, ``, `Barnil Stonepot`, ``)
- steps 12, 13, 14, 15: make them one step, `step Barnil Stonepot`, holding the goals of all of them in this order (they were `Barnil Stonepot`, ``, `Barnil Stonepot`, ``)
- steps 17, 18, 19: make them one step, `step Booty Bay`, holding the goals of all of them in this order (they were `Innkeeper Skindle`, `Crank Fizzlebub`, `Sea Wolf MacKinley`)

## guides/horde/41-searing-gorge-48-52.guide

- step 2: take `collect 11723 quest 4450.4` out (it held the step until done on another map); it goes to `guides/horde/43-swamp-of-sorrows-49-57.guide` step 11
- step 2: take `collect 11724 quest 4450.3` out (it held the step until done on another map); it goes to a new step in `guides/horde/44-dustwallow-marsh-49-51.guide`, after step 2
- steps 15, 16, 17: make them one step, `step Thorium Point`, holding the goals of all of them in this order (they were `Hansel Heavyhands`, `Taskmaster Scrange`, `Master Smith Burninate`)
- steps 19, 20, 21: make them one step, `step Kalaran Windblade`, holding the goals of all of them in this order (they were `The Torch of Retribution`, `Kalaran Windblade`, `Squire Maltrake`)
- steps 25, 26: make them one step, `step Trinkets...`, holding the goals of all of them in this order (they were `Trinkets...`, ``)

## guides/horde/42-feralas-49-55.guide

- step 3: take `kill 8957 x12 quest 4120.1` out (it held the step until done on another map); it goes to `guides/horde/52-felwood-54-56.guide` step 10
- step 3: take `kill 8961 x12 quest 4120.2` out (it held the step until done on another map); it goes to a new step in `guides/horde/52-felwood-54-56.guide`, after step 9
- steps 21, 22, 23: make them one step, `step Camp Mojache`, holding the goals of all of them in this order (they were `Witch Doctor Uzer'i`, `Weapons of Spirit`, `Jangdor Swiftstrider`)

## guides/horde/43-swamp-of-sorrows-49-57.guide

- steps 4, 5: make them one step, `step Fallen Hero of the Horde`, holding the goals of all of them in this order (they were ``, `Fallen Hero of the Horde`)
- step 11: add `collect 11723 quest 4450.4` (from `guides/horde/41-searing-gorge-48-52.guide` step 2), before the quest's turn-in if the step has it
- steps 12, 13: make them one step, `step Fallen Hero of the Horde`, holding the goals of all of them in this order (they were ``, `Fallen Hero of the Horde`)
- step 14: take `collect 3900 quest 580.1` out (it held the step until done on another map); it goes to `guides/horde/47-the-hinterlands-51-55.guide` step 1

## guides/horde/44-dustwallow-marsh-49-51.guide

- after step 2: a new step, `step Overdue Package`, with `collect 11724 quest 4450.3` (from `guides/horde/41-searing-gorge-48-52.guide` step 2, 320 yd from step 2)

## guides/horde/45-tanaris-50-54.guide

- step 1: take `collect 11834 x12 quest 4504.1` out (it held the step until done on another map); it goes to `guides/horde/49-un-goro-crater-52-56.guide` step 19
- step 8: take `collect 10556 quest 3444.1` out (it held the step until done on another map); it goes to `guides/horde/47-the-hinterlands-51-55.guide` step 11
- step 15: take `collect 8526 quest 2641.1` out (it held the step until done on another map); it goes to a new step in `guides/horde/47-the-hinterlands-51-55.guide`, after step 5
- steps 15, 16: make them one step, `step Gadgetzan`, holding the goals of all of them in this order (they were `Sprinkle`, `Alchemist Pestlezugg`)

## guides/horde/46-azshara-51-56.guide

- step 16: take `collect 11477 x8 quest 4300.1` out (it held the step until done on another map); it goes to `guides/horde/49-un-goro-crater-52-56.guide` step 38
- steps 19, 20, 21: make them one step, `step Undercity`, holding the goals of all of them in this order (they were `Thersa Windsong`, `Seeping Corruption`, `Apothecary Zinge`)

## guides/horde/47-the-hinterlands-51-55.guide

- step 1: add `collect 3900 quest 580.1` (from `guides/horde/43-swamp-of-sorrows-49-57.guide` step 14), before the quest's turn-in if the step has it
- after step 5: a new step, `step Violet Tragan`, with `collect 8526 quest 2641.1` (from `guides/horde/45-tanaris-50-54.guide` step 15, 415 yd from step 5)
- step 11: add `collect 10556 quest 3444.1` (from `guides/horde/45-tanaris-50-54.guide` step 8), before the quest's turn-in if the step has it
- step 11: take `collect 11829 x9 quest 4502.1` out (it held the step until done on another map); it goes to `guides/horde/49-un-goro-crater-52-56.guide` step 65

## guides/horde/48-blasted-lands-52-55.guide

- steps 5, 6: make them one step, `step Bloodmage Lynnore and Bloodmage Drazial`, holding the goals of all of them in this order (they were `Bloodmage Lynnore`, `Bloodmage Drazial`)

## guides/horde/49-un-goro-crater-52-56.guide

- steps 2, 3: make them one step, `step Sprinkle`, holding the goals of all of them in this order (they were `Sprinkle`, `Marin Noggenfogger`)
- steps 5, 6: make them one step, `step Marin Noggenfogger`, holding the goals of all of them in this order (they were `Marin Noggenfogger`, `Noggenfogger Elixir`)
- step 19: add `collect 11834 x12 quest 4504.1` (from `guides/horde/45-tanaris-50-54.guide` step 1), before the quest's turn-in if the step has it
- step 25: end `collect 10561 quest 4244.1` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- step 38: add `collect 11477 x8 quest 4300.1` (from `guides/horde/46-azshara-51-56.guide` step 16), before the quest's turn-in if the step has it
- steps 55, 56, 57, 58: make them one step, `step Marshal's Refuge`, holding the goals of all of them in this order (they were `Spraggle Frock`, `Spark Nilminer`, `Hol'anyee Marshal`, `Williden Marshal`)
- step 65: add `collect 11829 x9 quest 4502.1` (from `guides/horde/47-the-hinterlands-51-55.guide` step 11), before the quest's turn-in if the step has it

## guides/horde/50-burning-steppes-54-54.guide

- steps 8, 9: make them one step, `step Cyrus Therepentous`, holding the goals of all of them in this order (they were ``, `Cyrus Therepentous`)

## guides/horde/52-felwood-54-56.guide

- step 6: take `kill 7451 x15 quest 4521.1` out (it held the step until done on another map); it goes to `guides/horde/53-winterspring-55-58.guide` step 6
- after step 9: a new step, `step Felpaw Ravager`, with `kill 8961 x12 quest 4120.2` (from `guides/horde/42-feralas-49-55.guide` step 3, 107 yd from step 9)
- step 10: add `kill 8957 x12 quest 4120.1` (from `guides/horde/42-feralas-49-55.guide` step 3), before the quest's turn-in if the step has it

## guides/horde/53-winterspring-55-58.guide

- step 6: add `kill 7451 x15 quest 4521.1` (from `guides/horde/52-felwood-54-56.guide` step 6), before the quest's turn-in if the step has it
- steps 7, 8, 9, 10: make them one step, `step Everlook`, holding the goals of all of them in this order (they were `Innkeeper Vizzie`, `Argent Officer Garush`, `Pamela Redpath`, `Felnok Steelspring`)

## guides/horde/54-felwood-55-56.guide

- steps 13, 14: make them one step, `step Bloodvenom Post`, holding the goals of all of them in this order (they were `Corrupted Sabers`, `Dreka'Sur`)

## guides/horde/55-western-plaguelands-56-58.guide

- step 5: take `collect 12291 quest 4642.1` out (it held the step until done on another map); it goes to a new step in `guides/horde/58-western-plaguelands-58-60.guide`, after step 31
- step 7: take `collect 15043 x100 quest 5901.1` out (it held the step until done on another map); it goes to a new step in `guides/horde/57-eastern-plaguelands-57-60.guide`, after step 18
- steps 8, 9: make them one step, `step The Bulwark`, holding the goals of all of them in this order (they were `High Executor Derrington`, `Argent Officer Garush`)

## guides/horde/56-winterspring-56-58.guide

- step 2: take `kill 7583 quest 5163.2` out (it held the step until done on another map); it goes to `guides/horde/58-western-plaguelands-58-60.guide` step 29
- step 2: take `kill 10977 quest 5163.3` out (it held the step until done on another map); it goes to a new step in `guides/horde/58-western-plaguelands-58-60.guide`, after step 31

## guides/horde/57-eastern-plaguelands-57-60.guide

- steps 10, 11: make them one step, `step Smokey LaRue`, holding the goals of all of them in this order (they were `That's Asking A Lot`, `Georgia`)
- after step 18: a new step, `step Plagueland Termites`, with `collect 15043 x100 quest 5901.1` (from `guides/horde/55-western-plaguelands-56-58.guide` step 7, 67 yd from step 18)

## guides/horde/58-western-plaguelands-58-60.guide

- step 22: end `collect 14619 x15 quest 964.1` with `optional` (no later step of the route is on that map before the turn-in); it held the step until done in another zone
- step 27: take `collect 22201 quest 5527.1` out (it held the step until done on another map); it goes to `guides/horde/59-silithus-58-59.guide` step 3
- step 29: add `kill 7583 quest 5163.2` (from `guides/horde/56-winterspring-56-58.guide` step 2), before the quest's turn-in if the step has it
- after step 31: a new step, `step Merged Ooze Sample`, with `collect 12291 quest 4642.1` (from `guides/horde/55-western-plaguelands-56-58.guide` step 5, 294 yd from step 31), `kill 10977 quest 5163.3` (from `guides/horde/56-winterspring-56-58.guide` step 2, 79 yd from step 31)

## guides/horde/59-silithus-58-59.guide

- step 3: add `collect 22201 quest 5527.1` (from `guides/horde/58-western-plaguelands-58-60.guide` step 27), before the quest's turn-in if the step has it
- step 8: take `kill 7453 x13 quest 4741.1` out (it held the step until done on another map); it goes to a new step in `guides/horde/60-winterspring-59-60.guide`, before step 6

## guides/horde/60-winterspring-59-60.guide

- before step 6: a new step, `step Moontouched Owlbeast`, with `kill 7453 x13 quest 4741.1` (from `guides/horde/59-silithus-58-59.guide` step 8, 100 yd from step 6)

## Quest titles

These titles come from the reference data, not from the .guide files: they differ from the titles Polestar's newer data gives the same quests only in case or punctuation. A fresh `node tools/polestar.js data build` before compiling should bring the same; or write the title in the .guide line.

- quest 305: In Search of The Excavation Team → In Search of the Excavation Team
- quest 306: In Search of The Excavation Team → In Search of the Excavation Team
- quest 275: Blisters on The Land → Blisters on the Land
- quest 180: Wanted: Lieutenant Fangore → WANTED: Lieutenant Fangore
- quest 174: Look To The Stars → Look to the Stars
- quest 175: Look To The Stars → Look to the Stars
- quest 177: Look To The Stars → Look to the Stars
- quest 4641: Your Place In The World → Your Place in the World
- quest 398: Wanted: Maggot Eye → WANTED: Maggot Eye
- quest 5147: Wanted - Arnak Grimtotem → WANTED: Arnak Grimtotem
