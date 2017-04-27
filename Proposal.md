# CS5410 Final Project Proposal

## Team Members

- Ryan Frazier
- Seth Bertlshofer

## Game to Implement

We will be implementing the [Lemmings game](https://www.youtube.com/watch?v=xIuxB1oR2WQ)

# run project
- install all node_modules (we use yarn `yarn` at project root)
- go to server/ run `nodemon`
- open a new terminal, go to project root and run `gulp`
- open your browser to `localhost:3001`

## Milestone Points

- menu system
- reconfigurable controls
- mouse clicks work to change lemming type
- render sprites

### Extra

- mongo database for highscores, the highscores fetch and display
- settings saved to local storage

## Overview of Features

- (10) Game Menu system
  - Choose Level
  - Settings
    - Music
    - Sounds
    - Controls
  - High Scores
  - Credits
- (25) Gameplay
  - multiple levels (maybe generate levels)
  - control panel
    - decrease lemming release speed
    - increase lemming release speed
    - climber
    - umbrella
    - bomb
    - blocker
    - pause
    - atomic bomb
  - mini map?
  - status bar (lemmings out, % complete, timer)
  - click lemming
  - (10) key shortcuts for types of lemmings (reconfigurable)
- (15) Particle effects
  - flames for exit
  - water tile overlay
  - clouds in sky?
- (10) Sprite sheets
  - every lemming and trap refers to a sprite sheet
- (5) Sound and Music
  - sound effects for lemming motions
    - exploding
    - splatting
    - drowning
  - separate music theme for each level
- (10) persistant scores with MongoLab mongodb
- (15) tile rendering
- (10) collision detection
- (20) level generation (haven't planned out how this is going to work yet)

**Total: 130/134**

## Considerations

Since there is a lot of logic involved on the behavior of the different actions a lemming can make, we would appreciate some more points in this area.
