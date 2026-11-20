# Sprint Planning Report: Sprint 3

*Copy this file into `scrum/planning/` using your team's naming format. Fill in every field. Replace the italic guidance with your team's information.*

---

## 1. Meeting Details

**Date:** 11/20/26

**Scrum Master:** Anna

**Attendees:** Anna, Brandon, Sam, Nic

**Absent:** N/A

---

## 2. Sprint Goal

*One or two sentences describing a playable outcome, not a list of tickets. e.g., "A player can create a character and enter the first dungeon."*

Our goal for this sprint is to have foes to fight in the dungeons, a walking animation and the ability to go into different dungeons through the over world. 

---

## 3. Capacity and Velocity

**Sprint dates:** 11/20 to 12/6

**Velocity last sprint (points completed):** 14 

**Average velocity so far:** 10

**Known absences or reduced availability this sprint:** N/A

**Points committed this sprint:** 17

**Why this commitment is realistic:** *(Compare it to your velocity and capacity. If you are committing more than last sprint's velocity, explain why.)*

Based on the previous sprint where we committed 14 points, we believe that we can push ourselves ever so slightly more than before because we were able to get it done with enough time to spare. 

---

## 4. Committed Backlog Items

*Every item listed here must meet the Definition of Ready in your constitution. Items should be taken from the top of the product backlog in priority order. If you skipped a higher-priority item, explain why under "Notes".*

| Issue # | User story | Estimate | Owner | Ready? |
|---------|------------|----------|-------|--------|
|  66       |   As a user, I want the overworld to be more interactive, so that it feels more alive when I play         |   3       |  Anna     | [X]    |
|    18     | As a user, I want smiski to change colors based on his mage type, so that I can know what kind of mage I am playing as           |   1       |  Sam     | [X]    |
|   68      |  As a developer, I want smiski to have a sprite sheet so that I can make a walking animation         |    3      |    Sam   | [X]    |
|   69      |  As a user, I want my character to have a walking animation, so that my character looks more alive and doesn't just slide around          |    5      |     Nic | [X]    |
|    70     |   As a user, I want there to be enemy encounters and chest encounters, so that there is something to do when I enter the dungeon         |   5      |    Brandon   | [X]    |

**Total points:** 15

**Notes:** _

---

## 5. Task Breakdown

*Break each story into tasks. Include tasks for writing tests and reviewing PRs, not only coding.*

### Issue #66: Make Overworld more interactive 

- [ ] Draw cave image on ipad
- [ ] Draw shop image on ipad
- [ ] make the images visible in the overworld 
- [ ] Make the player appear out of one of the caves in the overworld after the dungeon
- [ ] Make the player able to walk into another cave to go to another dungeon
- [ ] Create tests to make sure the appearing works
- [ ] Create a pull request

### Issue #18: Smiskiness (Mage colors)

- [ ] Complete walk animation (Issue 68)
- [ ] Adjust the colors of the image for each element
- [ ] Make colored assests available for use
- [ ] Create a pull request

### Issue #68: Smiski animation sprite sheet

- [ ] Draw the sprite sheet in green
- [ ] Each row is a sprite sheet for different directions
- [ ] Make 3 more sprite sheets where every color is a different sprite sheet
- [ ] Upload Sprite sheets for use
- [ ] Create a pull request

### Issue #69: Walking animation

- [ ] Wait for sprite sheet
- [ ] Make an animation function that accepts a sprite sheet as a parameter
- [ ] Call the funciton in the appropriate movement call in the character class
- [ ] Write tests to make sure the animation is working correctly
- [ ] Create a pull request 

### Issue #70: Enemies and chests

- [ ] Check if the user is in the dungeon
- [ ] Randomly load in enemies and chests into the rooms *NOT IN THE WALLS*
- [ ] Check if the user is interacting with the enemy or the chest
- [ ] Create "fight screen" and "unlock chest screen" as place holders for combat and puzzles
- [ ] Make sure they can enter and exit the fight or unlock screen
- [ ] Create and run tests
- [ ] Create a pull request

*(Repeat for each committed story.)*

---

## 6. Work Distribution

| Member | Stories owned | Points |
|--------|---------------|--------|
|  Anna      |   1            |      3  |
|   Sam     |       2        | 4       |
|   Nic     |          1     |    5    |
|    Brandon    |        1       |    5    |

*If the work is not balanced, explain why:*

The overworld does not take much effort but does have to be done, and the other stories are more in depth than that. 

---

## 7. Stories Split or Deferred

*Did you split any stories that were too large for one sprint, or move stories back to the backlog? List them and say why.*

N/A

---

## 8. Retrospective Follow-Through

*Which action items from last sprint's retrospective are part of this sprint's plan, and how? (Sprint 1: write "n/a")*

| Action item | How it shows up in this sprint |
|-------------|--------------------------------|
|     Implement a walk animation        |  Issues 68 and 69 where we draw the animation and implement it in the character class  |
|   Create caves and buildings for the over world          |   These will be drawn for Issue 66 |
---

## 9. Risks and Dependencies

*What might stop the team from meeting the sprint goal? Which stories depend on others being finished first?*

Issue 18 depends on the sprite sheet created by issue 68, so it will have to wait until that is done. 
Issue 69 depends on the sprite sheet created by issue 68, and also 18 because the colors will be different for each element. 
Risk: Dungeon generation could break when we try to add enemies and chests because of the way it is generated. 

---

## 10. Checklist

- [X] Sprint goal written
- [X] Every committed story meets the Definition of Ready
- [X] Every story has an owner
- [X] Board updated: committed stories in the sprint, tasks created
- [X] Commitment compared to velocity
- [X] Report committed to `scrum/planning/` via pull request
