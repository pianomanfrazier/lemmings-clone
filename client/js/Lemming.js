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

//hash of all the sprite strips
let SpriteGen = require("./GenSpriteSet.js");
let block     = require("./config.js").sprites.block;

let LEMMING_HEIGHT = 50;
let LEMMING_WIDTH = 50;
let SCALE_FACTOR = 0.3;
let LEMMING_FALL_DISTANCE = block.height * 2;



function GenerateLemming(World) {
    'use strict';
    let that = {};

    let sprites = SpriteGen();
    //set some callbacks on the terminating lemmings
    let deathCallback = ()=>{
        console.log("death done");
        that.isAlive = false;
    };
    sprites.splatting.callback  = deathCallback;
    sprites.drowning.callback   = deathCallback;
    sprites.exploding.callback  = ()=>{
        console.log("exloding lemming");
        //destroy to the left and to the right of the lemming
        //if the blocks are dirt or diamond or bones
        //World.map[i-1][j] = "";
        //World.map[i+1][j] = "";
    };
    sprites.climb_over.callback = ()=>{
        that.type = "walking";
    };
    //these can be dynamically changed
    that.isAlive = true;
    that.type = "falling"; //defaults to falling
    that.center = {x:100, y:100}; //default
    //this is for testing, should be loaded from config.js lemming width/heigh * scaleFactor
    that.width = LEMMING_WIDTH * SCALE_FACTOR;
    that.height = LEMMING_HEIGHT * SCALE_FACTOR;
    //available types the lemming can switch to
    //these are set to true when user clicks from climber or umbrella
    that.canClimb = false;
    that.canUmbrella = false;

    let accumTime = 0;
    let accumFallDistance = 0;

    that.update = (elapsedTime)=>{
        let sprite = sprites[that.type];
        sprite.update(elapsedTime);
        sprite.center = that.center;
        accumTime+=elapsedTime;
        /////////////////////////
        //lemming switching logic
        /////////////////////////
        //FALLING/UMBRELLA
        //if falling or umbrella -- check lemming.bottom collision
        //check how far has been falling if too far splat, else that.type = walking
        //if umbrella, that.type = walking

        //WALKING
        //check the bottom to see if start falling
        //if that.type === "walking" && !sprite.reverse -- check lemming.right collision
        //if that.type === "walking" && sprite.reverse -- check lemming.left collision

        //CLIMBING
        //if sprite.reverse check left side of lemming
        //activate climb over reverse, then switch to walking left
        //else check right side
        //activate climb over, then switch to walking right

        /////////////////////////
        //lemming animation logic
        /////////////////////////
        if(accumTime > sprite.speed) {
            accumTime = 0;
            if(that.type === "walking"){
                if(sprite.reverse){
                    that.center.x -= 1;
                } else {
                    that.center.x += 1;
                }
                accumFallDistance = 0;
                //if collision is on right of lemming
                //sprite.reverse = true;
            }else if (that.type === "falling") {
                that.center.y += 2;
                accumFallDistance += 2;
                //splat on impact
                if(accumFallDistance > LEMMING_FALL_DISTANCE) {
                    that.type = "splatting";
                }
            }else if (that.type === "umbrella") {
                that.center.y += 1;
                accumFallDistance = 0;
            }else if (that.type === "climbing"){
                that.center.y -= 1;
                //if collision is on left side of lemming
                sprite.reverse = true; //climb a right facing wall
            }
        }
    };
    that.render = ()=>{
        sprites[that.type].render();
    };
    return that;
}

module.exports = GenerateLemming;
