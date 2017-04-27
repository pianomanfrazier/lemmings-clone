# game_dev_final
# Lemmings

A Lemmings clone using HTML5 and Javascript

# programmers
 - Seth Bertlshofer
 - Ryan Frazier

# check list
- [x] -(25) (required) Gameplay
- [x] -(10) (required) Menuing
- [x] -(10) (required) Reconfigurable keyboard controls
- [x] -(15) (required) Particle effects
- [x] -(10) Animation, spritesheet or otherwise
- [x] -(5) Sound & music
- [ ] (15) AI: Pathfinding or Attract Mode
- [ ] (50) Multiplayer; server-based game model with connected clients
- [x] -(10) Server-based persistent high scores
- [x] -(15) Tile rendering
- [ ] -(10) Generalized collision detection
- [x] (20) Procedural level generation
- [ ] (20) Physics integration

120 / 150

# working


# not working
Hotkeys work, however on the speed up and slow down there is a bug where it will change out of control

# run project
- install all node_modules (we use yarn `yarn` at project root)
- go to server/ run `nodemon`
- open a new terminal, go to project root and run `gulp`
- open your browser to `localhost:3001` (if it automatially opens your browser manually refresh the page once to make sure everything is loaded)


## Sprite Sheets

- one animation strip per image
- animation rate 200

- walker
  - 50x50 with 8 frames
- blocker
  - 50x50 with 16 frames
- umbrella
  - 85x85 with 12 frames
- exploding
  - 50x50 with 14 frames
- climber
  - 55x55 with 16 frames
  - first 7 climbing
  - 8-16 climb over ridge animation
- splatting
  - 80x50 with 16 frames
- drowning
  - 50x50 with 16 frames
- builder
  - 64x64 with 16 frames
- digger
  - 64x64 with 16 frames
  - speed 150
- timeup
  - 50x50 with 16 frames

### Trap sprites

- 10tons
  - 192x250 with 12 frames
- hanging
  - 107x250 with 34 frames

### GATES

- opening
  - 100x70 with 10 frames
- closing
  - 100x70 with 6 frames

### BLOCKS

10 32 x 32 square images

scale the image down to the size you want (ie 10x10) when calling the sprite api.

7-8 are ornamental and drawn to the background. The lemming can walk through it.

1. rock-grass
2. rock
3. dirt-grass
4. dirt
5. dirt-skull
6. dirt-diamonds
7. flower-yellow
8. mushroom-red
9. mushroom-white
10. flower-white

## Lemming

### API notes

lemming.on('click').activate(type)

  - manage the type numbers in menu bar

lemming.on('hover').drawBox()

### Component Design

- TYPE
  - through surfaces
    - digger
    - picker
    - basher
  - builder -- num of bricks
  - blocker -- for lifetime of lemming
  - umbrella -- activate when falling
  - climber -- activate when hits a wall
  - bomb -- can be chosen at any time, explodes with countdown, activates explosion particles

- GAME CONTROLS
  - pause game
  - quit game -- A-bomb
  - release rate
    - increase
    - decrease

- Ways to die
  - drown (ie contact with water)
  - fall and splat
  - suicide bomb
  - traps

- BLOCKS
  - dirt
  - stone
  - steel
  - water
  - trap
  - ornamental (no collision detection) (trees, clouds, ...)

- WORLD representation
  - json config
  - 2d array of types
  - pan view with mouse
  - on click and drag
  - on click show grab hand

- mini-map
  - need abstract representation of world (lemmings, platforms)
  - pass in game model
  - viewing frame (red box)
  - lemmings (green dots)
  - platforms (brown mass)

## Tooling

- nodemon to run the server and refresh when changes happen
  - run nodemon in the express-server directory
- browser-sync to refresh to web page when pages happen
  - run `browser-sync start --proxy "localhost:3000" --files "game_dev_final"`
- sass to compile scss in styles/ don't mess with the styles in the express server
  - run `sass --watch styles/main.scss:express_server/public/stylesheets/main.css`
- watchify to run browserify as changes are made
  - run `watchify -t [ hbsfy -t ] js/main.js -o express_server/public/javascripts/bundle.js -v`
  - you need `[hbsfy -t]` to get the handlebars templates

Now a better way to do this would be to set up Gulp or some task runner and do this all in one command. I have had problems with easily getting gulp to work consistantly/easily.
