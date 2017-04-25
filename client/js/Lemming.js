let _ = require("lodash");
//hash of all the sprite strips
let SpriteGen = require("./GenSpriteSet.js");
let block     = require("./config.js").sprites.block;

let LEMMING_HEIGHT = 50;
let LEMMING_WIDTH = 50;
let SCALE_FACTOR = 0.3;
let LEMMING_FALL_DISTANCE = block.height * 3.3;
let SAFE_LANDING = ['grass_cement', 'cement', 'grass_dirt', 'dirt', 'bones', 'jewels'];


function GenerateLemming(World) {
    'use strict';
    let that = {};
    //these can be dynamically changed
    that.isAlive = true;
    that.type = "falling"; //defaults to falling
    that.center = {x: 250, y: 300}; //default
    //this is for testing, should be loaded from config.js lemming width/heigh * scaleFactor
    that.width = LEMMING_WIDTH * SCALE_FACTOR;
    that.height = LEMMING_HEIGHT * SCALE_FACTOR;
    //available types the lemming can switch to
    //these are set to true when user clicks from climber or umbrella
    that.canClimb = true;
    that.canUmbrella = true;

    let accumTime = 0;
    let accumFallDistance = 0;

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
        that.isAlive = false;
        //destroy to the left and to the right of the lemming
        //if the blocks are dirt or diamond or bones
        //World.map[i-1][j] = "";
        //World.map[i+1][j] = "";
    };
    sprites.climb_over.callback = ()=>{
        that.type = "walking";
    };

    that.update = (elapsedTime)=>{
        let sprite = sprites[that.type];
        sprite.update(elapsedTime);
        sprite.center = that.center;
        accumTime+=elapsedTime;
        //utility functions for collision detection
        function checkBottom() {
            let point = {
                x: that.center.x,
                y: that.center.y + (LEMMING_HEIGHT * SCALE_FACTOR) / 2
            };
            return World.pointCollide(point);

        }
        function checkLeft() {
            let point = {
                x: that.center.x - (LEMMING_WIDTH * SCALE_FACTOR),
                y: that.center.y
            };
            return World.pointCollide(point);
        }
        function checkCenter(){
            let point = {
                x: that.center.x,
                y: that.center.y
            };
            return World.pointCollide(point);
        }
        function checkRight() {
            let point = {
                x: that.center.x + (LEMMING_WIDTH * SCALE_FACTOR),
                y: that.center.y
            };
            return World.pointCollide(point);
        }
        /////////////////////////
        //lemming switching logic
        /////////////////////////
        //FALLING/UMBRELLA
        //if falling or umbrella -- check lemming.bottom collision
        //check how far has been falling if too far splat, else that.type = walking
        //if umbrella, that.type = walking
        if(that.type === "falling" || that.type === "umbrella") {
            if(accumFallDistance > LEMMING_FALL_DISTANCE/2 && that.canUmbrella) {
                that.type = "umbrella";
            }
            let collision = checkBottom();
            if(collision !== "") console.log(collision);
            if(_.includes(SAFE_LANDING, collision)) {
                if(accumFallDistance < LEMMING_FALL_DISTANCE || that.type === "umbrella") {
                    that.type = "walking";
                } else {
                    that.type = "splatting";
                }
            }
        }

        //WALKING
        //check the bottom to see if start falling
        //also checks for drowing
        if(that.type === "walking"){
            let bottom = checkBottom();
            if(bottom === ""){
                that.type = "falling";
            } else if (bottom === "waves" || bottom === "water") {
                that.type = "drowning";
            } else {
                let center = checkCenter();
                if(_.includes(SAFE_LANDING, center)) {
                    if(that.canClimb){
                        that.type = "climbing";
                        sprites.climbing.reverse = sprite.reverse;
                        sprites.climb_over.reverse = sprite.reverse;
                    } else if (sprite.reverse){
                        sprite.reverse = !sprite.reverse;
                        //this is to avoid getting stuck in walls
                        sprite.center.x += 2;
                    } else {
                        sprite.reverse = !sprite.reverse;
                        sprite.center.x -= 2;
                    }
                }
            }
        }
        //CLIMBING
        if(that.type === "climbing") {
            let center = checkCenter();
            if(center === "") {
                that.type = "climb_over";
            }
        }

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
            }else if (that.type === "umbrella") {
                that.center.y += 1;
                accumFallDistance = 0;
            }else if (that.type === "climbing"){
                that.center.y -= 1;
            }
        }
    };
    that.render = ()=>{
        sprites[that.type].render();
    };
    return that;
}

module.exports = GenerateLemming;
