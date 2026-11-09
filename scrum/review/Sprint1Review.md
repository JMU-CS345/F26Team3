# Sprint Review Report: Sprint _

*Copy this file into `scrum/review/` using your team's naming format. Fill in every field. Replace the italic guidance with your team's information.*

---

## 1. Meeting Details

**Date:** 11/9

**Scrum Master:** Anna

**Attendees:** Nic, Sam, Brandon, Anna

**Absent:** N/A

**Deployed build reviewed:** https://jmu-cs345.github.io/F26Team3/

**Release PR into `production`:** 7f22e23 

---

## 2. Sprint Goal

**The goal we set:** To get a good base to jump off of. Including, having a drawing for the character, a basic background and movement. 

**Did we meet it?** *(Yes / Partly / No, and one sentence explaining why)*

Partly, we did not implement the directional images for demo, even though we had created them.

---

## 3. Committed Items: Done or Not Done

*Done means the item meets every point of your Definition of Done, including "works in the deployed build." There is no "mostly done."*

| Issue # | User story | Estimate | Owner | Done? | Demoed by |
|---------|------------|----------|-------|-------|-----------|
|   8      |  As a user I want to be able to see much of the world in front of me so I know where I am going          |    2      | Anna      |   Yes    |     Nic      |
|   26       | As a user I want to be able to see my healthbar so I know how much health I have left.           |   2       |  Brandon     |    Yes   | Nic          |
|  25       |  As a user I want to see a unique character that I play as.       |     2      | Sam     |   Yes    |     N/A      |
|    14     |    As a user, I want to move my character with the keyboard, so that I can explore the dungeon        |    2      |      Nic |  Partly     |    Nic       |
|         |            |          |       |       |           |

---

## 4. Metrics

| 8| Points |
|---|---|
| Committed |8 |
| Completed |6 |
| Completion rate | 75% |

**Velocity history:**

| Sprint | Committed | Completed |
|--------|-----------|-----------|
| 1      | 8          |    6      |
| 2      |           |           |
| 3      |           |           |
| 4      |           |           |
| 5      |           |           |


## 5. Demo

*For each completed story, list the acceptance criteria and show that each one passed in the deployed build.*

### Issue #25: Drawing a Character

- [X] Draw the character on ipad
- [X] Upload image to the repository src -> assests -> character

### Issue #8: World Building

- [X] Draw the background image
- [X] Upload image into repository src -> assets -> environment
- [X] Display background on the p5.js

### Issue #14: Keyboard Based Movement

- [X] Draw a png on the screen
- [X] Read keyboard inputs for movement
- [X] Make png move
- [ ] Make character move once Sam uploads image

### Issue #26: Health Bar

- [X] Make red rectangle with p5
- [X] Give bar a value - "health points"
- [X] Make rectangle shrink based on health points

---

## 6. Incomplete Work

*What happens to each item that is not done? Return it to the backlog and re-estimate it if needed.*

| Issue # | What remains | New estimate | Back in backlog? |
|---------|--------------|--------------|------------------|
|   14     |   Adding the character to the screen           |    1          | [X]              |
|         |              |              | [ ]              |

---

## 7. Stakeholder Feedback

*Record what the instructor said: what they liked, what should change, and any new priorities.*

We need to add an indication of where we are on the map, and start working on a mage 

---

## 8. Backlog Changes

**New stories added:** 38 - Procedural Generating dungeon, 40 - Create mage picking screen, 39 - title screen

**Priorities changed:** N/A

**Stories removed:** 25, 26, 8

---

## 9. Quality

**CI status on `production`:** failing

**Number of specs:** 5

**Known bugs in the deployed build:** Missing curly brace

---

## 10. Checklist

- [ ] Demo given from the deployed GitHub Pages build
- [X] Every committed item marked Done or Not Done
- [X] Metrics filled in
- [X] Product Owner feedback recorded
- [X] Backlog updated
- [X] Report committed to `scrum/review/` via pull request
