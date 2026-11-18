# Sprint Retrospective Report: Sprint _

*Copy this file into `scrum/retrospective/` using your team's naming format. Fill in every field. Replace the italic guidance with your team's information. Due by 11:59 p.m. on the day of the retrospective.*

---

## 1. Meeting Details

**Date:** 11/9

**Facilitator:** Anna   

**Attendees:** Nic, Sam, Brandon, Anna

**Absent:** N/A

---

## 2. Last Sprint's Action Items

*Did we do what we said we would? Did it help? (Sprint 1: write "n/a")* N/A

| Action item | Owner | Done? | Did it help? |
|-------------|-------|-------|--------------|
|             |       |       |              |
|             |       |       |              |

---

## 3. The Sprint in Numbers

*Use these to ground the discussion in evidence.*

**Points committed / completed:** 8 / 6

**PRs merged:** All of them

**CI runs failed / total:** 29 / 7 *(In your repo's **Actions** tab, count the runs from this sprint's dates. Use the **Status** filter to find the failed ones.)*

**Stories carried over:** 1

---

## 4. Observations

*Every member contributes at least one item. Be specific: "three PRs waited more than two days for review" is more useful than "communication could be better."*

*A concrete observation says what happened and backs it up with a specific PR, story, date, or number. Filling in section 3 isn't enough on its own: use its numbers in your observations where they help explain what happened.*

### What went well

- Everyone finished their stories
- Everyone asked for their pull requests to be reviewed in the text chain as per the contract.
- Our game shows up on local runs

### What did not go well

- One of our stories was left unfinished and no one noticed. 
- The production branch link did not work for the demo, losing us points. 
- People are not following the naming conventions set in the constitution. 

### What puzzled us or what we want to try

- Nic was unable to merge main into production, Sam had to do it, why?
-

---

## 5. Root Cause

*Pick the most important problem from above and ask "why?" until you reach something the team can change.*

**Problem:** Production branch did not work

**Why?** Main had a missing curly brace in the sketch file

**Why?** Someone must have deleted it

**Why?** It was an accident

**Root cause:** Not checking to make sure main worked fully before sending it to production. 

---

## 6. Action Items for Next Sprint

*Two or three items. Each one has an owner and a way to tell whether it worked. (Sprint 4: write "n/a")*

| Action item | Owner | How we will know it worked |
|-------------|-------|----------------------------|
|   Fix the image with directions problem          | Nic      |  The smiski will show up on screen instead of the temp image                          |
|  Dungeon generation     | Nic      |   A random dungeon will be generated                        |
|   Start work on the Mage selection          |  Sam     | A mage selection screen will allow the user to choose which mage they want to be                      |

---

## 7. Constitution Changes

*Did this retrospective show that a rule in CONSTITUTION.md isn't working? If so, propose the change here and make it through a pull request. If not, explain why no change is needed. (Sprint 4: write "n/a")*

**Proposed change:** none

**Pull request:** none

**If no change is needed, why not?** Our current rules are working because we are all following the consitiution and haven't exploded any of our computers or killed each other. 

---

## 8. Checklist

- [X] Every member contributed observations
- [X] Last sprint's action items reviewed
- [X] A root cause identified
- [X] Action items have owners and success measures (Sprint 4: n/a)
- [X] Action items added to the board or next planning report (Sprint 4: n/a)
- [X] Constitution change proposed through a pull request, or the reason none is needed explained (Sprint 4: n/a)
- [X] Report committed to `scrum/retrospective/` via pull request by 11:59 p.m. on the day of the retrospective
