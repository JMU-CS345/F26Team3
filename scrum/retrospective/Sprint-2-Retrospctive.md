# Sprint Retrospective Report: Sprint 2

*Copy this file into `scrum/retrospective/` using your team's naming format. Fill in every field. Replace the italic guidance with your team's information. Due by 11:59 p.m. on the day of the retrospective.*

---

## 1. Meeting Details

**Date:** 11/18/26

**Facilitator:** Anna

**Attendees:** Anna, Brandon, Nic, Sam

**Absent:** N/A

---

## 2. Last Sprint's Action Items

*Did we do what we said we would? Did it help? (Sprint 1: write "n/a")*

| Action item | Owner | Done? | Did it help? |
|-------------|-------|-------|--------------|
| Adding the image directions for the player            |  Nic   |    Yes | Yes|
|   Procedurally generating dungeon for the player to go through          |   Brandon  | Yes | Yes | 
| Start working on mage selection | Sam | Yes | Yes |

---

## 3. The Sprint in Numbers

*Use these to ground the discussion in evidence.*

**Points committed / completed:** 14 / 14

**PRs merged:** 16

**CI runs failed / total:** 5 / 37 *(In your repo's **Actions** tab, count the runs from this sprint's dates. Use the **Status** filter to find the failed ones.)*

**Stories carried over:** 0

---

## 4. Observations

*Every member contributes at least one item. Be specific: "three PRs waited more than two days for review" is more useful than "communication could be better."*

*A concrete observation says what happened and backs it up with a specific PR, story, date, or number. Filling in section 3 isn't enough on its own: use its numbers in your observations where they help explain what happened.*

### What went well

- Nic: We used live server and jasmine to make sure all of our tests passed, instead of leaving it to chance. PR 61: test/test-for-character
- Brandon: Generation on the dungeon works and the character is able to fit in all of the spaces. PR 62: Dungeon - exit - fix
- Sam: All of mage selection is complete and useable. PR 60: feature / mage select
- Anna: I changed the colors of the overworld flowers to match the title screen and smiski garden flower colors. Date: 11/16/26

### What did not go well

- Nic: I took a while to learn how merging worked because he did a few bad conflict resolutions and strange push tries to git. Date: 11/17/26
- Brandon: The algorithm kept on making too much play space, which created a big open area which would not be fun to play in. Date: 11/16/26
- Sam: There is a typo in the mage selection screen when the user want to use an ice smiski. It says "Smiksi" instead, and this problem was brought up during demo. Date: 11/18/26
- Anna: It was hard for me to get a branch to merge into production because I was trying to merge from main into production which wasn't working. Date: 11/18/26

### What puzzled us or what we want to try

- We don't really know how to make the collision box for the character. Should we base it on a tile or on the png? 
-

---

## 5. Root Cause

*Pick the most important problem from above and ask "why?" until you reach something the team can change.*

**Problem:** Typo in the mage selection for ice smiski.

**Why?** Sam mistyped

**Why?** Sam was on a deadline and was very stressed

**Root cause:** People were not looking out for spelling issues when checking PRs. 

---

## 6. Action Items for Next Sprint

*Two or three items. Each one has an owner and a way to tell whether it worked. (Sprint 4: write "n/a")*

| Action item | Owner | How we will know it worked |
|-------------|-------|----------------------------|
|     Implement a walk animation        |  Sam     |       The character looks like it is walking when we press the keys                     |
|   Create caves and buildings for the over world          |   Anna    |          There will be caves and buildings in the overworld and smiski will pop out of one cave when he exits a dungeon and can go through another when he wants to go to another dungeon.                  |
|             |       |                            |

---

## 7. Constitution Changes

*Did this retrospective show that a rule in CONSTITUTION.md isn't working? If so, propose the change here and make it through a pull request. If not, explain why no change is needed. (Sprint 4: write "n/a")*

**Proposed change:** No change needed 

**Pull request:** none

**If no change is needed, why not?** *(Explain why the current rules are working, citing something from this sprint.)* Our rules are working because everyone is communicating and reviewing pull requests in a timely manner. Something from the sprint is that Anna reviewed the character select screen as soon as Sam made a PR. 

---

## 8. Checklist

- [ x] Every member contributed observations
- [x ] Last sprint's action items reviewed
- [ x] A root cause identified
- [x ] Action items have owners and success measures (Sprint 4: n/a)
- [x ] Action items added to the board or next planning report (Sprint 4: n/a)
- [x ] Constitution change proposed through a pull request, or the reason none is needed explained (Sprint 4: n/a)
- [x ] Report committed to `scrum/retrospective/` via pull request by 11:59 p.m. on the day of the retrospective
