//A Lemming will contain:
// sprites -- access the sprite hash from Game Model
// state: umbrella, climbing, walking, blocking, falling(count how long, set some thresh-hold then splat on impact)
// bomb: start countdown
//
// Lemming.die(death_type) show the sprite sequence, remove from Lemmings array
//   isAlive boolean flag
//   death_types = [ 'drown', 'splat', 'explode', 'trap' ]
//
// Lemming.changeType(type)
//   activate new sprite
//
// need Lemming generator that returns a Lemming object
//  Lemming.update(elapsedTime) //update position, process collisions, death events, mouse hover events
//  ??isHover boolean flag??
//  Lemming.render() //render the active sprite at the location of the lemming
//
//Components
//
// Lemming:
//  state (walking, falling, climbing, umbrella, exploding, drowning, blocking...)
//  types (umbrella, climber)
//
// Traps:
//  types: 10tons, hanger
//  activate when lemming contacts the center
//
// Game Level Objects:
//  platforms:
//   can be walked on
//   if walk of ledge, if too far splat at bottom, if umbrella start don't splat
//  walls:
//   reverse walker
//   starts climber going up (when center reaches top, start climb over animation)
//  opening gate:
//   release lemming at specified rate
//  destination gate:
//   on lemming contact start walking away animation, update score
let Lemming = {};

Lemming.spriteType = "falling"; //defaults to falling
//hash of all the sprite strips
Lemming.sprites = require("./GenSpriteSet.js")();

Lemming.update = (elapsedTime)=>{
    'use strict';
    Lemming.sprites[Lemming.type].update(elapsedTime);
};
Lemming.render = ()=>{
    'use strict';
    Lemming.sprites[Lemming.type].render();
};

module.exports = Lemming;
