# Sprint Planning Report: Sprint 2

*Copy this file into `scrum/planning/` using your team's naming format. Fill in every field. Replace the italic guidance with your team's information.*

---

## 1. Meeting Details

**Date:** 11/11/26

**Scrum Master:** Anna

**Attendees:** Anna, Nic, Sam, Brandon

**Absent:** N/A

---

## 2. Sprint Goal

A player is able to choose their mage and enter the first dungeon from the overworld. 

---

## 3. Capacity and Velocity

**Sprint dates:** 11 to 19

**Velocity last sprint (points completed):** 6 

**Average velocity so far:** 6

**Known absences or reduced availability this sprint:** N/A

**Points committed this sprint:** 14

**Why this commitment is realistic:** *(Compare it to your velocity and capacity. If you are committing more than last sprint's velocity, explain why.)*

Even though the points committed are far higher than those completed last sprint, our team was finished with time to spare last sprint, allowing us to consider adding more to our plates. We believe that each person will be able to complete their task on time despite the high amount of points. 

---

## 4. Committed Backlog Items

*Every item listed here must meet the Definition of Ready in your constitution. Items should be taken from the top of the product backlog in priority order. If you skipped a higher-priority item, explain why under "Notes".* 
****Each story needs to have acceptance criteria and an estimate in Github!************

| Issue # | User story | Estimate | Owner | Ready? |
|---------|------------|----------|-------|--------|
| 40        |  As a user I want to be able to choose a mage before I start playing the game, so that I know what kind of powers I have          |   5       | Sam      | [X]    |
| 14       |  As a user, I want to move the character with the keyboard, so that I can explore the dungeon      |    1      |   Nic    | [X]  |
|  39       |  As a user, I want a title screen so I have an introduction to the game          |   2       |  Anna     | [X]    |
| 38        |   As a user, I want to randomly generate a dungeon so that I can infinately play the game         |   3       |   Brandon    | [X]    |
|   44      |     As a user, I want there to be walls in the dungeon so that I cannot walk out of bounds       |    3      |    Nic   | [X]    |

**Total points:** 14

**Notes:** _

---

## 5. Task Breakdown

*Break each story into tasks. Include tasks for writing tests and reviewing PRs, not only coding.*

### Issue #40: Mage Type Picker Mechanic
- [ ] Draw background for selection screen
- [ ] Draw flower sprites (to be used to change the color of the puddle)
- [ ] Implement the interaction mechanic by allowing the user to pick up the flower by pressing E to change their type
- [ ] Bring the flower to the puddle and change the puddle color
- [ ] Create a temporary screen to display what kind of mage they are

### Issue #14: Keyboard based movement

- [ ] Assign different images based on the key pressed (direction)
- [ ]
- [ ]

### Issue #39: Title Screen

- [ ] Write a blurb about what our game does
- [ ] Make the title screen and display the blurb
- [ ] Implement the play button to take the user to the mage picking screen

### Issue #38: Procedurally generated dungeon

- [ ] Choose a type of generation
- [ ] Make sure the paths are not being cut off by the walls 
- [ ] Unit testing

### Issue #44: Walls and player collision

- [ ] Create a function in the player class that checks if the player is allowed to be there (boolean value)
- [ ] Checks the collision in the update function - updates the player in that place if it is not a wall, or keeps them in place if they have reached a wall
- [ ]
 
---

## 6. Work Distribution

| Member | Stories owned | Points |
|--------|---------------|--------|
|    Anna    |    1           |    2    |
|   Nic     |     2          |  4      |
|     Sam   |        1       |   5     |
|   Brandon     |      1         |    3    |

*If the work is not balanced, explain why:*

Some of our more simple stories still need to be implemented, while other people need to move on to more complex tasks. 

---

## 7. Stories Split or Deferred

*Did you split any stories that were too large for one sprint, or move stories back to the backlog? List them and say why.*

Story 14 got moved back to the backlog because we did not fully implement the direction mechanic. The character is not yet draw on the screen, the player was left as a temporary image. 

---

## 8. Retrospective Follow-Through

*Which action items from last sprint's retrospective are part of this sprint's plan, and how? (Sprint 1: write "n/a")*

| Action item | How it shows up in this sprint |
|-------------|--------------------------------|
| Adding the image directions for the player            |    Making sure that the player can see their character and that it changes directions                            |
|   Procedurally generating dungeon for the player to go through          |     We will implement the generating dungeon and make sure it looks correct and works correctly                           |
| Start working on mage selection | We have a story to create the mage selection screen and mechanic |

---

## 9. Risks and Dependencies

*What might stop the team from meeting the sprint goal? Which stories depend on others being finished first?*

The procedural generation depends on the collision mechanic working. Part of the acceptance criteria for both stories is that a player cannot run through the walls, which falls to wall generation. 

---

## 10. Checklist

- [X] Sprint goal written
- [X] Every committed story meets the Definition of Ready
- [X] Every story has an owner
- [X] Board updated: committed stories in the sprint, tasks created
- [X] Commitment compared to velocity
- [X] Report committed to `scrum/planning/` via pull request
