# Human visual review checklist

**Why this file exists.** The analysis report was produced without the agent ever seeing an image: the model cannot accept image input. Every visual claim in it therefore comes from the package's text reports, from OCR, or from pixel statistics. This checklist lets a person (or a vision-capable model) verify the visual questions against the actual frames.

**How to use it.**

1. Open `index.html` in a browser (all previews, grouped by short), or open the previews in `sheets/` and `frames/` directly.
2. For each short, answer the fields below from the **original** image if detail matters. The previews are 900 x 960 (a sheet tile is only 90 x 160), so use the untouched original at `references/sheets/shortNN_sheet.jpg` for close reading.
3. Fill the same fields in `review-form.csv` (one row per short) so the answers can be merged back into the analysis.
4. Mark anything uncertain as `?`. Do not copy the OCR text into a visual field: OCR is machine text, not a description of what is on screen.

**Fields.** `venue`, `time_of_day`, `weather`, `foreground`, `middle_ground`, `background`, `architecture_storeys`, `props_vehicles`, `shot_sizes`, `transitions`, `notes`.

**The questions that most need eyes, in priority order** (from section I.3 of the report):

1. Confirm or correct the venue of each short (ship deck vs galley, palace vs temple, shop vs casino, bedroom vs other interior).
2. Record the architectural skin and storey count per street/set (plaster, timber, clapboard, stone, brick, metal), and the roof types.
3. Note which scenes belong to which short; the lighting report's `d/s/n/i` IDs cannot be mapped without the missing `labels.csv`.
4. Count how many shorts use storm, snow, fog, dust or rain.
5. Estimate crowd sizes (0, 3-5, 10-15, 30-50) and whether they stand still.
6. Note foreground framing objects (rail, chain, flag, shoulder, hat, machine, animal) and roughly what fraction of the frame edge they cover.
7. Record visible vehicles (ship, horse, cart, car, truck, train, bicycle, aircraft).
8. Note interior ceiling height, wall finish and window placement.
9. Note the dominant material and accent colour of each set.

---

## short01

- Sheet: `short01_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short01_sheet_preview.jpg`
- Frames in package: short01_0060.jpg, short01_0180.jpg
- Machine stats: mean luma 0.393, mean saturation 0.636, top #927e7b, mid #60517b, bottom #384dc0
- OCR (raw, may be wrong): IA / cooking / the sea / so / them— / laughing. / captain / collar / tovget / makingrsoup?b / he doesn'ktk / ElÖuds / Dt@io / he gets / then a / 'Mheel: / Tan / couldn't / Why waste / when the storm / free? / in / taller...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short02

- Sheet: `short02_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short02_sheet_preview.jpg`
- Frames in package: short02_0060.jpg, short02_0180.jpg
- Machine stats: mean luma 0.449, mean saturation 0.429, top #7d8ea6, mid #896d5c, bottom #755359
- OCR (raw, may be wrong): i • slowest / UILEEVX i / laughingat,Kim / OO / long he / a single / He just / smiling / he has / what's / —to,do? / the iacetra€k / hillJ! / his buddy / öö / with / he could / åfterl / favorite / hill / he'll / try / *a...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short03

- Sheet: `short03_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short03_sheet_preview.jpg`
- Frames in package: short03_0060.jpg, short03_0180.jpg
- Machine stats: mean luma 0.491, mean saturation 0.442, top #8e97a3, mid #6e6675, bottom #7e954d
- OCR (raw, may be wrong): a button / ofatown / to / townis / around it / circles. / fa•ciiigJ+ / sits / case / ' guards / eyes / all of / ever / a glow / side. / every year / dimmer. / always / weird / glass, / 47 tiny / scratches / explain. / to...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short04

- Sheet: `short04_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short04_sheet_preview.jpg`
- Frames in package: short04_0060.jpg, short04_0180.jpg
- Machine stats: mean luma 0.429, mean saturation 0.465, top #7288a4, mid #92726a, bottom #534759
- OCR (raw, may be wrong): fastest / Never / standing / at noon / down / everyone / Eddie. / are at / hasn't / at his gun. / nods / says / SOJyou / your gun / ever / your life, / face / in the dirt / holster. / possible? / fast. / to / a guy / two...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short05

- Sheet: `short05_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short05_sheet_preview.jpg`
- Frames in package: short05_0060.jpg, short05_0180.jpg
- Machine stats: mean luma 0.368, mean saturation 0.504, top #544962, mid #5a5269, bottom #816b72
- OCR (raw, may be wrong): happiest / stranger / sun / a counter. / money / every corner / whilz pu wc / one / 00 / birthdays / øöøs / to ride / Ofsplit / giant / some guy over o o / Bahamas. / times / uuuu / On / stare / 00 / 8 soto / themselves,...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short06

- Sheet: `short06_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short06_sheet_preview.jpg`
- Frames in package: short06_0060.jpg, short06_0180.jpg
- Machine stats: mean luma 0.412, mean saturation 0.435, top #856955, mid #605056, bottom #756e7b
- OCR (raw, may be wrong): -••••••qthese / One's / yet / to tell / .30 / 19 24: / 11 / either / -all started / fired / five / scratch / *home. / scnartN / Vaaaåt / GüsrsV / • $500,01 / $20 / $100 / and / SCRATCH / nvt / $1 / VauTC / $500,000 / I b...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short07

- Sheet: `short07_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short07_sheet_preview.jpg`
- Frames in package: short07_0060.jpg, short07_0180.jpg
- Machine stats: mean luma 0.404, mean saturation 0.512, top #7f5c55, mid #695a8d, bottom #a27d88
- OCR (raw, may be wrong): bTned / with / his / %scared / Giaves / 8) / bell / Vd by / the bodies / s HOLT / Except / s no:.T / ringing / Ehåiiiiiiiiiiiiliiiililfni / the morning. / probably / / I/iiin* / Then it / whole / (their / 'You gov•-• / N...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short08

- Sheet: `short08_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short08_sheet_preview.jpg`
- Frames in package: short08_0060.jpg, short08_0180.jpg
- Machine stats: mean luma 0.512, mean saturation 0.431, top #ab9475, mid #808996, bottom #615d72
- OCR (raw, may be wrong): ticket, / REEL. / •CASH / •WIN up ro •x.ooo.ooot / had won• / x YLE / Sorry, / KYLE / a winner. / shrugs, / says / life / out. / closes, / cashier / "did, / deep / can, / back / iOto / been / t ålöna / he's / KEEPEPSÉ / ...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short09

- Sheet: `short09_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short09_sheet_preview.jpg`
- Frames in package: short09_0060.jpg, short09_0180.jpg
- Machine stats: mean luma 0.516, mean saturation 0.431, top #8f9094, mid #7f899b, bottom #454586
- OCR (raw, may be wrong): FIRE / impossible / ;In8 / companies / ways / 111 / walks / "00M / to a / t ROO_Y / with / and•no / 12 / 11 / 10 / ticking / a guy / '"scrolling / nets on / Your new / your boss / nothing. / until / thinkihg; / Then / xe...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short10

- Sheet: `short10_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short10_sheet_preview.jpg`
- Frames in package: short10_0060.jpg, short10_0180.jpg
- Machine stats: mean luma 0.547, mean saturation 0.434, top #766f90, mid #7c7398, bottom #84796d
- OCR (raw, may be wrong): soucW / house / and / single / Rinch / The first / nobody / because / n/ / their couch? / caa / is / Y-pretty / Iqsing his mind. / The'officer / the couch, / so / '-y broke / furniture / all / to his car. / log I / locki...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short11

- Sheet: `short11_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short11_sheet_preview.jpg`
- Frames in package: short11_0060.jpg, short11_0180.jpg
- Machine stats: mean luma 0.427, mean saturation 0.399, top #7a6054, mid #70606d, bottom #947163
- OCR (raw, may be wrong): bronze / a dragon's / —the emperor, / this ever / run. / The whole court / laughing. / eight¯ / coiled / b xootø / holding / a frogs / the emperor / and / Weeks / föll, / @app6ned. / ripple / even / 'The Empero•r / most ...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short12

- Sheet: `short12_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short12_sheet_preview.jpg`
- Frames in package: short12_0060.jpg, short12_0180.jpg
- Machine stats: mean luma 0.487, mean saturation 0.461, top #929190, mid #926e6c, bottom #86998a
- OCR (raw, may be wrong): -la cannonbill, / be one / ooøs. / -kbi / ((1700s;n / round / smash / wall / Splinters / half, / proper / —they fired.., / langrage; / word / the Navy / idea / Shot. / cannonballs / a furnace / red, / with / behind / wou...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short13

- Sheet: `short13_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short13_sheet_preview.jpg`
- Frames in package: short13_0060.jpg, short13_0180.jpg
- Machine stats: mean luma 0.536, mean saturation 0.438, top #949198, mid #9a826a, bottom #ad8761
- OCR (raw, may be wrong): knight / Uaråon / (tie hadn't / Nardon / Ont Crime / Next / yet. / uaråon / absobes thc beater of thc sin of / One Crime / to be committed / Next Week / see,- / Fcc paid +0 coins! / from / to town / forgiveness / 12 / St...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short14

- Sheet: `short14_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short14_sheet_preview.jpg`
- Frames in package: short14_0060.jpg, short14_0180.jpg
- Machine stats: mean luma 0.502, mean saturation 0.432, top #8e98a5, mid #86735e, bottom #997756
- OCR (raw, may be wrong): iAQsblacksmith / spear / pierce / a $to_one / ' worst / kinÉdOms. / been / YEARS AT WAR / for 100 / YEARS AT WAR / -each' / finally / weapon / field. / at the / and / the other. / ' jn6body / ..ewhole week / went by / 10...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short15

- Sheet: `short15_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short15_sheet_preview.jpg`
- Frames in package: short15_0060.jpg
- Machine stats: mean luma 0.433, mean saturation 0.504, top #a18a8a, mid #99535c, bottom #a04f49
- OCR (raw, may be wrong): painkillers / 6ö / the gain / is? / swallow / a headache, / and / SPA / what / Willilh / ACID SPA / 98.6 / to btOOO / pull' / map? / All / ACID SPA / 98.6 •F / ACID SPA / 98.6 OF / NO OMNG NO RUS A'tER / .LOOO -• / in yo...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short16

- Sheet: `short16_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short16_sheet_preview.jpg`
- Frames in package: short16_0060.jpg, short16_0180.jpg
- Machine stats: mean luma 0.331, mean saturation 0.500, top #6b5b62, mid #8a6659, bottom #4e405c
- OCR (raw, may be wrong): Gambling / illegal / gambling / lin / almost / street / 11 / inside,' / thousands / flashing— / screaming / people / buckets / balls. / stroll / I'RIZE / door, / past / MACHINES / 1'R1zz / nobody / NEW MACHINES / PRIZE /...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short17

- Sheet: `short17_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short17_sheet_preview.jpg`
- Frames in package: short17_0060.jpg
- Machine stats: mean luma 0.419, mean saturation 0.590, top #90664b, mid #946046, bottom #6e6461
- OCR (raw, may be wrong): PLAY 3 CREDITS / You / MAX / nun / 'jackpot / .UCKY / Symbols / .UCRY / 00 / Iåfid.• / UCKV / thiid / iäi• / stepped —-— / $2 / —click / short. / $5 / GOLD / cat. / th-•t: / move to, / LUCK Y PROGRESCJVE / Otm / —next / ...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short18

- Sheet: `short18_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short18_sheet_preview.jpg`
- Frames in package: short18_0060.jpg, short18_0180.jpg
- Machine stats: mean luma 0.541, mean saturation 0.411, top #9e8f7e, mid #636a74, bottom #c09175
- OCR (raw, may be wrong): scientists / a tower / to find out / what / before / Apparently, / terrified; / aun / terrified} q / speeds / so much / the / world / People / GRASH SURVIVORS / crashes / GRASH SURVIVORS / swear / NASH SURVIVOR: / • TUES...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short19

- Sheet: `short19_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short19_sheet_preview.jpg`
- Frames in package: short19_0060.jpg, short19_0180.jpg
- Machine stats: mean luma 0.594, mean saturation 0.363, top #9d998c, mid #c0a380, bottom #9a7866
- OCR (raw, may be wrong): 'VREASURY / LLC / 22914 e / No. '04 / * 87,439. / ever / 412 / number, / ACCOUNTS PAYAOLE / 412 / 412 / 6ö / a human / 412 / " ze..a—..Otwotw / checks, / 4100k / - random, / still / VIOCO / well; / with / OVO / - 160kat ...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 

## short20

- Sheet: `short20_sheet.jpg` - 1800 x 1920 px - 10 x 6 grid = 60 tiles of 180 x 320 px
- Preview: `sheets/short20_sheet_preview.jpg`
- Frames in package: short20_0060.jpg, short20_0180.jpg
- Machine stats: mean luma 0.252, mean saturation 0.476, top #3d3730, mid #453e37, bottom #44302f
- OCR (raw, may be wrong): fall asleep / u' holding / steel balls, / .steel ballse- / wake up / a genius, / First / you put / metal / the iflodi, / tsit down / abovethem / holdta / pall in / hand. / Then / yourself / off. / here's / weird / The se...

- [ ] **venue:** 
- [ ] **time_of_day:** 
- [ ] **weather:** 
- [ ] **foreground:** 
- [ ] **middle_ground:** 
- [ ] **background:** 
- [ ] **architecture_storeys:** 
- [ ] **props_vehicles:** 
- [ ] **shot_sizes:** 
- [ ] **transitions:** 
- [ ] **notes:** 
