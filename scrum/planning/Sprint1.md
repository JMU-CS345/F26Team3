# Sprint Planning Report: Sprint _

*Copy this file into `scrum/planning/` using your team's naming format. Fill in every field. Replace the italic guidance with your team's information.*

---

## 1. Meeting Details

**Date:** 11/2/26

**Scrum Master:** Anna

**Attendees:** Nic, Sam, Brandon

**Absent:**  N/A

---

## 2. Sprint Goal

*One or two sentences describing a playable outcome, not a list of tickets. e.g., "A player can create a character and enter the first dungeon."*

Character moving on screen which has a background. 

---

## 3. Capacity and Velocity

**Sprint dates:** Nov 2 to Nov 10

**Velocity last sprint (points completed):** n/a

**Average velocity so far:** n/a

**Known absences or reduced availability this sprint:** n/a

**Points committed this sprint:** 5

**Why this commitment is realistic:** *(Compare it to your velocity and capacity. If you are committing more than last sprint's velocity, explain why.)*

Because our goal is pretty simple, we know how to do it, we just need to do the steps. 

---

## 4. Committed Backlog Items

*Every item listed here must meet the Definition of Ready in your constitution. Items should be taken from the top of the product backlog in priority order. If you skipped a higher-priority item, explain why under "Notes".*

| Issue # | User story | Estimate | Owner | Ready? |
|---------|------------|----------|-------|--------|
|  25   |   As a user, I want to see a character that I play as         |   2       |  Sam     | [ ]    |
|  8       |  As a user, I want to be able to see much of the world in front of me, so I know where I am going          |  2        |   Anna    | [ ]    |
|  14       |  As a user, I want to move the character with the keyboard, so that I can explore the dungeon          |    2      |   Nic    | [ ]    |
| 26        |   As a user, I want to be able to see my health bar, so I know how much health I have left         |     2     |  Brandon     | [ ]    |
|         |            |          |       | [ ]    |

**Total points:** 8

**Notes:** All of these tasks can be completed individually. 

---

## 5. Task Breakdown

*Break each story into tasks. Include tasks for writing tests and reviewing PRs, not only coding.*

### Issue #25: Drawing a Character

- [ ] Draw the character on ipad
- [ ] Upload image to the repository src -> assests -> character
- [ ]

### Issue #8: World Building

- [ ] Draw the background image
- [ ] Upload image into repository src -> assets -> environment
- [ ] Display background on the p5.js

### Issue #14: Keyboard Based Movement

- [ ] Draw a png on the screen
- [ ] Read keyboard inputs for movement
- [ ] Make png move
- [ ] Make character move once Sam uploads image

### Issue #26: Health Bar

- [ ] Make red rectangle with p5
- [ ] Give bar a value - "health points"
- [ ] Make rectangle shrink based on health points


---

## 6. Work Distribution

| Member | Stories owned | Points |
|--------|---------------|--------|
|   Anna     |       8       |   2     |
|   Nic     |        14       |   2     |
|    Sam    |        25       |   2     |
|  Brandon      |          26     |   2     |

*If the work is not balanced, explain why:*

---

## 7. Stories Split or Deferred

*Did you split any stories that were too large for one sprint, or move stories back to the backlog? List them and say why.*

No, each story is small

---

## 8. Retrospective Follow-Through

*Which action items from last sprint's retrospective are part of this sprint's plan, and how? (Sprint 1: write "n/a")*

N/A

---

## 9. Risks and Dependencies

*What might stop the team from meeting the sprint goal? Which stories depend on others being finished first?*

- Lack of motivation and lack of knowledge of GIT and how it works

- Nic's story depends on Sam's story being finished first

---

## 10. Checklist

- [ X ] Sprint goal written
- [ X ] Every committed story meets the Definition of Ready
- [ X ] Every story has an owner
- [ X ] Board updated: committed stories in the sprint, tasks created
- [ X ] Commitment compared to velocity
- [ X ] Report committed to `scrum/planning/` via pull request
