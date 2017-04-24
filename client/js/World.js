let _               = require("lodash");
let $               = require("jquery");
let Globals         = require("./Globals.js");
let Graphics        = Globals.graphics;
let Sprite          = require("./Sprite.js");
let spriteConfig    = require('./config.js').sprites;
let block           = spriteConfig.block;
let blocksImg       = document.getElementById('blocks');
let blockNum        = 0; //this toggles the block 0 is cross hairs, 1 is box, updated in onHover handler
blocksImg.onload = ()=>{
    'use strict';
    // console.log("blocks ready");
    block.ready = true;
};

let World = (()=>{
    'use strict';

    let that = {
        lemmingsSaved: 0,
        level: 0,
        start: {},
        finish: {},
        numLemmings: 0,
        lemmingGoal: 0,
        lemmingTypes: {},
        sprites: [],
        map: []
    };

    that.init = (spec)=>{
        that.lemmingGoal        = spec.lemmingGoal;
        that.lemmingTypes       = spec.lemmingTypes;
        that.map                = spec.map;

        _.each(that.map, (row, j)=>{
            let iS = _.findIndex(row, (obj)=>{
                return obj === 'start';
            });
            let iF = _.findIndex(row, (obj)=>{
                return obj === 'end';
            });

            if(iS !== -1) { that.start  = {x: iS, y: j}; }
            if(iF !== -1) { that.finish = {x: iF, y: j}; }
        });
        let gateImgs = $('#gates img');
        console.log(gateImgs);
        _.each(gateImgs, (img, i)=>{
            console.log(img, i);
            let spriteSpec = spriteConfig[img.id];
            that.sprites.push(Sprite({
                reverse: false,
                img: img,
                width: spriteSpec.width * ((spriteSpec.scaleFactor) ? spriteSpec.scaleFactor : spriteConfig.SCALE_FACTOR), //width to be drawn
                height: spriteSpec.height * ((spriteSpec.scaleFactor) ? spriteSpec.scaleFactor : spriteConfig.SCALE_FACTOR), //height to be drawn
                startX: (spriteSpec.startX) ? spriteSpec.startX : 0, //top left corner of sprite
                startY: (spriteSpec.startY) ? spriteSpec.startY : 0,
                frameWidth: spriteSpec.width, //width of image
                frameHeight: spriteSpec.height,
                numFrames: spriteSpec.frames,
                animationRate: (spriteSpec.speed) ? spriteSpec.speed : spriteConfig.ANIMATION_SPEED
            }));

            let x = 0;
            let y = 0;
            if(i === 0) {
                x = that.start.x;
                y = that.start.y;
            } else if (i === 1) {
                x = that.finish.x;
                y = that.finish.y;
            }
            that.sprites[i].center = {
                x: x * block.width  + (block.width / 2),
                y: y * block.height + block.height - (spriteSpec.height * spriteSpec.scaleFactor / 2)
            };
        });
    };

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
                blockNum = Globals.blockTypes[cell];

                if(blockNum <= 0 && blockNum >= 9 && blockNum !== "") {
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
})();

module.exports = World;
