let _                       = require("lodash");
let SpriteGen               = require("./GenSpriteSet.js");
let block                   = require("./config.js").sprites.block;
let LEMMING_HEIGHT          = 50;
let LEMMING_WIDTH           = 50;
let SCALE_FACTOR            = 0.3;
let LEMMING_FALL_DISTANCE   = block.height * 3.3;
let SAFE_LANDING            = ['blocking', 'grass_cement', 'cement', 'grass_dirt', 'dirt', 'bones', 'jewels'];

function GenerateLemming(World) {
    'use strict';
    let that = {};
    //these can be dynamically changed
    that.activeType         = "falling"; //defaults to falling
    that.availableTypes     = [];
    that.isAlive            = true;
    that.isSaved            = false;
    //console.log(World.start);
    that.center             = {x: 250, y: 300}; //default
    //this is for testing, should be loaded from config.js lemming width/heigh * scaleFactor
    that.width              = LEMMING_WIDTH * SCALE_FACTOR;
    that.height             = LEMMING_HEIGHT * SCALE_FACTOR;

    let accumTime = 0;
    let accumFallDistance = 0;

    let sprites = SpriteGen();
    //set some callbacks on the terminating lemmings
    let deathCallback = ()=>{
        console.log("death done");
        that.isAlive = false;
    };
    sprites.exit.callback = ()=>{
        console.log("You saved a lemming");
        that.isSaved = true;
    };
    sprites.splatting.callback  = deathCallback;
    sprites.drowning.callback   = deathCallback;
    sprites.exploding.callback  = ()=>{
        console.log("exloding lemming");
        that.isAlive = false;
        //destroy to the left and to the right of the lemming
        //if the blocks are dirt or diamond or bones
        World.explodeAtPoint(that.center);
    };
    sprites.climb_over.callback = ()=>{
        that.activeType = "walking";
        that.center.y -= 5;
    };

    that.update = (elapsedTime)=>{
        let sprite = sprites[that.activeType];
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
        function checkTop() {
            let point = {
                x: that.center.x,
                y: that.center.y - (LEMMING_HEIGHT * SCALE_FACTOR) / 2
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
        if(that.activeType === "falling" || that.activeType === "umbrella") {
            if((accumFallDistance > LEMMING_FALL_DISTANCE / 2) && (_.includes(that.availableTypes, 'umbrella'))) {
                that.activeType = "umbrella";
            }
            let collision = checkBottom();
            //if(collision !== "") console.log(collision);
            if(_.includes(SAFE_LANDING, collision) && collision !== "blocking") {
                if(accumFallDistance < LEMMING_FALL_DISTANCE || that.activeType === "umbrella") {
                    that.activeType = "walking";
                } else {
                    that.activeType = "splatting";
                }
            }
        }

        //WALKING
        //check the bottom to see if start falling
        //also checks for drowning
        if(that.activeType === "walking"){
            let bottom = checkBottom();
            if(bottom === ""){
                that.activeType = "falling";

            } else if (bottom === "waves" || bottom === "water") {
                that.activeType = "drowning";

            } else {
                let center = checkCenter();
                if(_.includes(SAFE_LANDING, center)) {
                    if(_.includes(that.availableTypes, 'climbing') && center !== "blocking"){
                        that.activeType = "climbing";
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

                } else if (center === "end") {
                    that.activeType = "exit";
                }
            }
        }
        //CLIMBING
        if(that.activeType === "climbing") {
            let center = checkCenter();
            if(center === "") {
                that.activeType = "climb_over";
            }
        }

        //BLOCKING
        if(that.activeType === "blocking") {
            World.setBlockingAtPoint(that.center);
        }

        /////////////////////////
        //lemming animation logic
        /////////////////////////
        if(accumTime > sprite.speed) {
            accumTime = 0;

            if(that.activeType === "walking"){
                if(sprite.reverse){
                    that.center.x -= 1;
                } else {
                    that.center.x += 1;
                }
                accumFallDistance = 0;
                //if collision is on right of lemming
                //sprite.reverse = true;
            } else if (that.activeType === "falling") {
                that.center.y += 2;
                accumFallDistance += 2;
                //splat on impact
            } else if (that.activeType === "umbrella") {
                that.center.y += 1;
                accumFallDistance = 0;
            } else if (that.activeType === "climbing"){
                that.center.y -= 1;
            }
        }
    };
    that.render = ()=>{
        sprites[that.activeType].render();
    };
    return that;
}

module.exports = GenerateLemming;
