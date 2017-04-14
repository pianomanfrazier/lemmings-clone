let $ = require("jquery");

let spriteConfig = require("./config.js").sprite;
let Sprite = require("./Sprite.js");

let startPosition = {x:100, y:100};

//load all the sprites into hash object
//sprites['walking'].render()
function GenSpriteSet(){
    'use strict';
    let sprites = {};
    $("#images img").each((i, img)=>{
        img.onload = ()=>{
            let type = img.id.slice(8); //remove "lemming_" from id
            let spec = spriteConfig[type];
            sprites[type] = Sprite({
                reverse: false,
                img: img,
                center: startPosition, //this is arbitrary for testing
                width: spec.width * ((spec.scaleFactor) ? spec.scaleFactor : spriteConfig.SCALE_FACTOR), //width to be drawn
                height: spec.height * ((spec.scaleFactor) ? spec.scaleFactor : spriteConfig.SCALE_FACTOR), //height to be drawn
                startX: (spec.startX) ? spec.startX : 0, //top left corner of sprite
                startY: (spec.startY) ? spec.startY : 0,
                frameWidth: spec.width, //width of image
                frameHeight: spec.height,
                numFrames: spec.frames,
                animationRate: (spec.speed) ? spec.speed : spriteConfig.ANIMATION_SPEED
            });
        };
    });
    return sprites;
};

module.exports = GenSpriteSet; //returns generator function
