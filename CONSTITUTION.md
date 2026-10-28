# Team Constitution

*This document records how our team works together on Mage Quest. Fill in every field. Replace the italic guidance with your team's decisions. Changes to this document go through a pull request like any other change.*

---

## 1. Team and Roles

### Team Number: 3

### Team Name: Smissquad

_

### Members

| Name    | GitHub username | Preferred contact | Usual availability |
|---------|-----------------|-------------------|--------------------|
| Anna    | AnnaBBurg       |                   |  Evenings                  |
| Sam     | sfingz52-lgtm   |                   |  Mornings                  |
| Nic     | nmcicchi        |                   |  Evenings                  |
| Brandon | brandonsalandy  |                   |  mornings                  |

### Scrum Master

**Sprint 1 Scrum Master:** Anna!

**Does the role rotate?** *(e.g., rotates each sprint in the order listed above; or one person for the whole project)*
No
_

### Product Owner

*Choose one team member who will interact with the instructor (stakeholder) to clarify and prioritize stories, and to collect new ones.*
Sam
_

### Other Responsibilities

Who is responsible for maintaining the project board / backlog in good order? *(Scrum Master?)* Anna

Who is responsible for deploying the main branch to production to update GitHub pages? Nic

### Decision Making

*(How do we decide things: consensus, majority vote, Scrum Master decides? What happens if we are deadlocked?)*
Majority vote, if there's a tie, Anna chooses
_

---

## 2. Scrum Process

### Sprint Length and Dates

| Sprint | Start | End | Review / Retro date |
|--------|-------|-----|---------------------|
| 1 | 11/2 | 11/8 | 11/9 |
| 2 | 11/9 | 11/15 | 11/16 |
| 3 | 11/16 | 11/29 | 11/30 |
| 4 | 11/30 | 12/6 | 12/7 |
| 5 | 12/7 | presentation day | presentation day | 

### Meetings

| Meeting | When |
|---------|------|
| Daily standup | Wed/Fri |
| Sprint planning | Mon |
| Sprint review | Mon |
| Sprint retrospective | Mon |


_

### Definition of Ready

*A backlog item may be pulled into a sprint only when:*

- [x ] it is written as a user story
- [ x] it has acceptance criteria
- [x ] it has an estimate

### Definition of Done

*An item is done only when:*

- [x ] code is reviewed and approved by at least one teammate
- [x ] all tests pass in CI
- [ x] merged to `main`
- [ x] works in the deployed build
- [x ] the issue is closed
- [ ]

### Estimation

**Method:** *(story points, t-shirt sizes, hours)*
story points - measures relative size by numbers - effort, complexity, uncertainty
**Scale:** *(e.g., 1, 2, 3, 5, 8, 13)*
yeah
_

### Backlog and Board

**Where the backlog lives:** *(e.g., GitHub Projects board, link here)*
In the documents directory in GitHub
**Board columns:** *(e.g., To Do → In Progress → In Review → Done)*
To Do → In Progress → In Review → Done
_

---

## 3. Communication

### Primary Channel

**Channel:** *(Discord, Slack, GroupMe, ...)* 
Text

**Expected response time:** *(e.g., within 12 hours on weekdays)* 
within 7 work hours of text

### What Goes Where

*(What is discussed in the chat channel vs. in GitHub issues vs. in PR comments?)*
Chat channel is for clarifying, issues are for adding features, PR comments for when you added new things
_

### Reporting Blockers or Falling Behind

*(How and how early does a member tell the team they are stuck or behind?)*
Tell them asap on the text chain
_

### Absences

*(How much notice is required? How is the absent member's work covered?)*
A day's notice, absent member's work is divided evenly
_

---

## 4. Git and GitHub Workflow

### Branch Naming

**Format:** *(e.g., `type/issue-short-description`)* 'type/issue-discription'

**Allowed types:** *(e.g., `feature`, `fix`, `docs`, `refactor`, `test`, `chore`)* `feature`, `fix`, `docs`, `refactor`, `test`

**Examples:**
'fix/game-doesn't-crash-when-fireball-cast'
-
-

### Branch Protection on `main`

- [x] No direct pushes to `main`
- [x] Required approvals before merge: _ Nic
- [X] CI must pass before merge
- [X] Same protection on `production`

### Commit Messages

*(Format and style, e.g., imperative mood: "Add rune puzzle validation". Do we follow Conventional Commits?)*
No details or questions, just saying what you change
_

### Pull Requests

**Maximum size:** *(e.g., aim for under 300 changed lines)* 
300
**Description template:** *(e.g., What / Why / How to test / Screenshot)* 
No screenshot needed unless art, just explain what it is, why you need to change it and how to test it
**Linking issues:** *(e.g., every PR includes `Closes #N`)*
'closes issue number'
_

### Code Review

**Review turnaround:** *(e.g., within 24 hours of being requested)*
Within 24 hours of being requested.
**Who reviews what:** *(e.g., any teammate; or a rotating assignment)*
Nic reviews Anna, Anna reviews Sam, Sam reviews Brandon, Brandon reviews Nic
_

### Merging

**Merge style:** *(merge commit, squash and merge, or rebase and merge)*
Squash and merge -> makes commits into one commit
**Who merges:** *(the author after approval, or the reviewer)*
Reviewer 
**After merge:** *(e.g., delete the branch)*
Delete the branch
_

---

## 5. Code Conventions

### Naming

| Kind | Convention | Example |
|------|------------|---------|
| Variables and functions | Camel case | annaIsCool |
| Classes | Uppercase camel case | ClassName |
| Constants | All caps with underscores|MAX_NUMBER |
| Files | Dash seperated | my-file |
| Test files | name of class + test | ClassNameTest |

### Formatting

**Indentation:** *(2 spaces, 4 spaces, tabs)*
2 space tab
**Semicolons:** *(always / never)*
ALWAYS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
**Quotes:** *(single / double)*
Double for Strings, single for Chars
**Maximum line length:** _
100 characters
**Tools:** *(e.g., Prettier and ESLint, with config files committed to the repo)*
Prettier and ESLint
_

### Project Structure

*(Where does each kind of file live?)*

```
src/
  model/        (e.g., game logic, no p5 drawing calls)
  view/         (e.g., drawing code)
  controller/   (e.g., input handling)
assets/
spec/
```

### Architecture Rules

*(e.g., game logic never calls p5 drawing functions directly, so it can be unit tested)*
Keep model view and controller separate and small
-
-

### Comments and Documentation

*(When are comments or JSDoc required?)*
Comments are required at the top of functions, comments throughout are requested 
_

### Assets

**File naming:** *(e.g., all lowercase, hyphens, no spaces)*
all lowercase with dashes 
**Licensing and attribution:** *(Where do we record the source and license of art, sound, and fonts we did not make?)*

_Licensing to Sam

---

## 6. Testing and Quality

**Test framework:** Jasmine

**Where tests live:** Next to the file they test

**What must have tests:** *(e.g., all model code; every bug fix gets a test that reproduces it; combat and puzzle rules)*

_All functions and every bug

**Coverage expectations:** 95+%

**Continuous integration:** *(What does GitHub Actions run on each PR?)* 

_make sure the game doesn't crash, make sure written tests pass

**Rule for failing CI:** *(e.g., nothing merges while CI is red)*

_

**Manual playtesting:** *(Who plays the build before each sprint review, and how are bugs reported?)*

_Everybody has game time, at least two people on it before each review 

---

## 7. Deployment

**Where the game is deployed:** GitHub Pages, URL here

**What triggers a deploy:** *(e.g., a release PR from `main` into `production`, opened by the Scrum Master after each sprint review)*

**Who checks the deployed build, and when:** After the pull request

---

## 8. AI Tool Usage

**Allowed tools:** Any coding AI

**Allowed uses:** *(e.g., code generation, tests, documentation, review)* Testing and documentation

_

**Not allowed:** Image generation, music generation

**Disclosure:** *(e.g., note AI assistance in the PR description)*
Yes
_

**Responsibility:** *(e.g., whoever submits AI-generated code must understand it and is accountable for it)*

Yeah

---

## 9. Working Agreements and Conflict

### Expected Effort

3 hours outside of class per person per week

_

### Fair Contribution

*(What counts as contributing, and how is it tracked? e.g., PRs merged, reviews done, story points completed.)*
Reviews done
_

### Conflict Resolution

*(What steps do we follow when there is a disagreement or a problem with a teammate?)*

1. Talk to the person directly
2. Scrum master mediates
3. Escalate to instructor

### Missed Commitments

*(What happens when a member repeatedly misses commitments?)*
Talk to the instructor 
_

### Amending This Constitution

*(How can this document be changed? e.g., proposed by PR, approved by team vote at a retrospective.)*
Group vote on changing it
_

---

## 10. Sign-Off

*By signing, each member agrees to follow this constitution.*

| GitHub name | Signature (type your name) | Date |
|------|----------------------------|------|
| AnnaBburg      | Anna Brandenburg                           | 10/28     |
| sfingz52-lgtm     | Sam Wandler                           | 10/28     |
|  nmcicchi    |   Nicolas Cicchi                         | 10/28     |
|  brandonsalandy    |     Brandon Salandy                       |  10/28    |
