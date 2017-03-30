# game_dev_final
# Lemmings

A Lemmings clone using HTML5 and Javascript

# programmers
 - Seth Bertlshofer
 - Ryan Frazier

# check list
- [ ] -(25) (required) Gameplay
- [ ] -(10) (required) Menuing
- [ ] -(10) (required) Reconfigurable keyboard controls
- [ ] -(15) (required) Particle effects
- [ ] -(10) Animation, spritesheet or otherwise
- [ ] -(5) Sound & music
- [ ] (15) AI: Pathfinding or Attract Mode
- [ ] (50) Multiplayer; server-based game model with connected clients
- [ ] -(10) Server-based persistent high scores
- [ ] -(15) Tile rendering
- [ ] -(10) Generalized collision detection
- [ ] (20) Procedural level generation
- [ ] (20) Physics integration

0 / 150

# working


# not working


# notes

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
