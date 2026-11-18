# Sprint Review Report: Sprint 2

*Copy this file into `scrum/review/` using your team's naming format. Fill in every field. Replace the italic guidance with your team's information. Due by 11:59 p.m. on the day of the review.*

---

## 1. Meeting Details

**Date:** 11/18/26

**Scrum Master:** Anna

**Attendees:** Nic, Sam, Brandon

**Absent:** N/A

**Presenter:** Anna

**Deployed build reviewed:** (https://jmu-cs345.github.io/F26Team3/)

**Release PR into `production`:** Done!

---

## 2. Sprint Goal

*Tell the stakeholder whether the sprint delivered what it set out to.*

**The goal we set:** A player is able to choose their mage and enter the first dungeon from the selection screen. 

**Did we meet it?** *(Yes / Partly / No, and one sentence explaining why)*

Yes because we are able to select a smiski and move around a randomly generated dungeon. 

---

## 3. Committed Items: Done or Not Done

*Done means the item meets every point of your Definition of Done, including "works in the deployed build." There is no "mostly done."*

*The presenter credits the members who built each story during the demo.*

| Issue # | User story | Estimate | Owner | Done? | Built by |
|---------|------------|----------|-------|-------|----------|
| 40        |    As a user I want to be able to choose a mage before I start playing the game, so that I know what kind of powers I have        |   5       |    Sam   |   Yes    |      Sam     |
|   14      |    As a user, I want to move the character with the keyboard, so that I can explore the dungeon        |    1      |    Nic   | Yes      |       Nic    |
|     39    |    As a user, I want a title screen so I have an introduction to the game         |       2   |    Anna   |   Yes    |     Anna      |
|    38     |     As a user, I want to randomly generate a dungeon so that I can infinately play the game       |    3      |    Brandon   |    Yes   |    Brandon       |
|     44    |   As a user, I want there to be walls in the dungeon so that I cannot walk out of bounds         |     3     | Nic      |   Yes    |   Nic        |

---

## 4. Metrics

| | Points |
|---|---|
| Committed | 14 |
| Completed |14 |
| Completion rate | 100% |

**Velocity history:**

| Sprint | Committed | Completed |
|--------|-----------|-----------|
| 1      |    8       |     6      |
| 2      |    14       |   14        |
| 3      |           |           |
| 4      |           |           |

**What explains the difference between committed and completed?** There is no difference this time, we completed all of our committed points. 

---

## 5. Demo

*For each completed story, list the acceptance criteria and show that each one passed in the deployed build.*

*Presenter: be ready to explain and answer questions about every completed story, including work you didn't build.*

### Issue #40: Mage Type Picker Mechanic
- [ x] Draw background for selection screen
- [x ] Draw flower sprites (to be used to change the color of the puddle)
- [ x] Implement the interaction mechanic by allowing the user to pick up the flower by pressing E to change their type
- [x ] Bring the flower to the puddle and change the puddle color
- [x ] Create a temporary screen to display what kind of mage they are
- [x ] Run tests to make sure each mage type is implemented
- [ x] Create a pull request to main

### Issue #14: Keyboard based movement

- [x ] Assign different images based on the key pressed (direction)
- [x ] Run tests to make sure the directions change
- [x ] Create a pull request to main

### Issue #39: Title Screen

- [ x] Write a blurb about what our game does
- [x ] Make the title screen and display the blurb
- [ x] Implement the play button to take the user to the mage picking screen
- [ x] Run tests to make sure the title screen works and progresses
- [ x] Create a pull request to main

### Issue #38: Procedurally generated dungeon

- [ x] Choose a type of generation
- [ x] Make sure the paths are not being cut off by the walls 
- [x ] Unit testing to make sure the generation works
- [x ] Create a pull request to main

### Issue #44: Walls and player collision

- [x ] Create a function in the player class that checks if the player is allowed to be there (boolean value)
- [x ] Checks the collision in the update function - updates the player in that place if it is not a wall, or keeps them in place if they have reached a wall
- [ x] Run tests to make sure the collision function works
- [x ] Create a pull request to main

---

## 6. Incomplete Work

*What happens to each item that is not done? Return it to the backlog and re-estimate it, even if the estimate stays the same. (Sprint 4: write "n/a")*

No incomplete work for this sprint.

| Issue # | What remains | New estimate | Back in backlog? |
|---------|--------------|--------------|------------------|
|         |              |              | [ ]              |
|         |              |              | [ ]              |

---

## 7. Stakeholder Feedback

*Record what the instructor said: what they liked, what should change, and any new priorities. (Sprint 4: write "n/a")*

We need to fix the misspelling in the ice Smiski picking section. The stakeholder enjoyed the picking mechanic and the dungeon generation. No further priorities were given. 

---

## 8. Backlog Changes

*How did the backlog change in response to the feedback? (Sprint 4: write "n/a")*

**New stories added:** Make the overworld more interactive - 66

**Priorities changed:** N/A

**Stories removed:** N/A

**If no change was needed, why not?** We were not given any new priotrities from the stakeholder. We will proceed with what we already have in the backlog, and add one story to the backlog.

---

## 9. Quality

*Give the stakeholder an honest picture of the build's quality.*

**CI status on `production`:** Passing!!

**Number of specs:** 73

**Known bugs in the deployed build:** N/A

---

## 10. Checklist

- [ x] Demo given from the deployed GitHub Pages build
- [ x] Demo given by one presenter, crediting the members who built each story
- [x ] Release PR merged before the review begins
- [ x] Every committed item marked Done or Not Done
- [x ] Every item marked Done has all its acceptance criteria checked in section 5
- [x ] Metrics filled in, with the committed/completed difference explained
- [ X] Stakeholder feedback recorded (Sprint 4: n/a)
- [x ] Backlog updated, or the reason no change was needed explained (Sprint 4: n/a)
- [x ] Report committed to `scrum/review/` via pull request by 11:59 p.m. on the day of the review
