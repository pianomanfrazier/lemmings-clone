let _               = require("lodash");
let $               = require("jquery");
let Globals         = require("./Globals.js");
let Graphics        = Globals.graphics;
let Sprite          = require("./Sprite.js");
let spriteConfig    = require('./config.js').sprites;
let block           = spriteConfig.block;
let waves           = spriteConfig.waves;
let wavesImg        = document.getElementById('waves');
let blocksImg       = document.getElementById('blocks');
let blockNum        = 0; //this toggles the block 0 is cross hairs, 1 is box, updated in onHover handler
//load these from config somewhere
let WORLD_SIZE_X = 28;
let WORLD_SIZE_Y = 16;

blocksImg.onload = ()=>{
    'use strict';
    // console.log("blocks ready");
    block.ready = true;
};

let World = (spec)=>{
    'use strict';

    //need to reset the world
    //otherwise it's still there for another game
    let that = {
        start: {},
        finish: {},
        sprites: [],
        map: []
    };
    //this takes a pixel point and return the string type of the block location
    that.pointCollide = (point)=>{
        let x = Math.floor(point.x / block.width);
        let y = Math.floor(point.y / block.height);
        //console.log(x,y);
        //check out of bounds
        if(y < 0 || y > WORLD_SIZE_Y || x < 0 || x > WORLD_SIZE_X){
            return "";
        }
        return that.map[y][x];
    };

    that.lemmingGoal    = spec.lemmingGoal;
    that.lemmingTypes   = spec.lemmingTypes;
    that.lemmingCount   = spec.lemmingCount;
    that.map            = spec.map;

    _.each(that.map, (row, j)=>{
        _.each(row, (item, i)=>{
            if(item === "start") { that.start  = {x: i, y: j}; }
            if(item === "end") { that.finish = {x: i, y: j}; }
            if(item === "waves") {
                let spriteSpec = waves;
                that.sprites.push(Sprite({
                    img: wavesImg,
                    width: spriteSpec.width * ((spriteSpec.scaleFactor) ? spriteSpec.scaleFactor : spriteConfig.SCALE_FACTOR), //width to be drawn
                    height: spriteSpec.height * ((spriteSpec.scaleFactor) ? spriteSpec.scaleFactor : spriteConfig.SCALE_FACTOR), //height to be drawn
                    startX: (spriteSpec.startX) ? spriteSpec.startX : 0, //top left corner of sprite
                    startY: (spriteSpec.startY) ? spriteSpec.startY : 0,
                    frameWidth: spriteSpec.width, //width of image
                    frameHeight: spriteSpec.height,
                    numFrames: spriteSpec.frames,
                    animationRate: (spriteSpec.speed) ? spriteSpec.speed : spriteConfig.ANIMATION_SPEED,
                    center: {
                        x: i * block.width  + (block.width / 2),
                        y: j * block.height + (block.height / 2)
                    }
                }));
            }
        });
    });

    let gateImgs = $('#gates img');
    _.each(gateImgs, (img, i)=>{
        let spriteSpec = spriteConfig[img.id];
        let x;
        let y;
        let callback;
        if(i === 0) {
            x = that.start.x;
            y = that.start.y;
            callback = ()=>{
            };
        } else if (i === 1) {
            x = that.finish.x;
            y = that.finish.y;
        }
        let spec = {
            reverse: false,
            img: img,
            width: spriteSpec.width * ((spriteSpec.scaleFactor) ? spriteSpec.scaleFactor : spriteConfig.SCALE_FACTOR), //width to be drawn
            height: spriteSpec.height * ((spriteSpec.scaleFactor) ? spriteSpec.scaleFactor : spriteConfig.SCALE_FACTOR), //height to be drawn
            startX: (spriteSpec.startX) ? spriteSpec.startX : 0, //top left corner of sprite
            startY: (spriteSpec.startY) ? spriteSpec.startY : 0,
            frameWidth: spriteSpec.width, //width of image
            frameHeight: spriteSpec.height,
            numFrames: spriteSpec.frames,
            animationRate: (spriteSpec.speed) ? spriteSpec.speed : spriteConfig.ANIMATION_SPEED,
            center: {
                x: x * block.width  + (block.width / 2),
                y: y * block.height + block.height - (spriteSpec.height * spriteSpec.scaleFactor / 2)
            },
            callback: callback
        };
        that.sprites.push(Sprite(spec));
    });

    that.update = (elapsedTime)=>{
        //update the gates
        _.each(that.sprites, (sprite)=>{
            sprite.update(elapsedTime);
        });
    };

    that.render = ()=>{
        //render the gates
        _.each(that.sprites, (sprite)=>{
            sprite.render();
        });
        _.each(that.map, (row, i)=>{
            _.each(row, (cell, j)=>{
                if(cell === "" && cell === "start" && cell === "end") return;
                blockNum = spriteConfig.blockTypes[cell];

                if(blockNum <= 0 && blockNum >= 10 && blockNum !== "") {
                    console.log("invalid block type");
                }

                let x = (j * block.width) + (block.width / 2);
                let y = (i * block.height) + (block.height / 2);

                if(block.ready) {
                    Graphics.drawSprite({
                        center: {x, y},
                        image: blocksImg,
                        sx: block.width * blockNum,
                        sy: 0,
                        sw: block.width,
                        sh: block.height,
                        dx: x - block.width/2,
                        dy: y - block.height/2,
                        dw: block.width,
                        dh: block.height
                    });
                }
            });
        });
    };

    return that;
};

module.exports = World;
