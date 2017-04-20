let $ = require("jquery");

let spriteConfig = require("./config.js").sprites;
let Sprite = require("./Sprite.js");

//load all the sprites into hash object
//sprites['walking'].render()
//BEWARE!: must call this only if the images are loaded
let spriteImgs = $("#images img");
function GenSpriteSet(){
    'use strict';
    let sprites = {};
    spriteImgs.each((i, img)=>{
        let type = img.id.slice(8); //remove "lemming_" from id
        let spec = spriteConfig[type];
        sprites[type] = Sprite({
            reverse: false,
            img: img,
            width: spec.width * ((spec.scaleFactor) ? spec.scaleFactor : spriteConfig.SCALE_FACTOR), //width to be drawn
            height: spec.height * ((spec.scaleFactor) ? spec.scaleFactor : spriteConfig.SCALE_FACTOR), //height to be drawn
            startX: (spec.startX) ? spec.startX : 0, //top left corner of sprite
            startY: (spec.startY) ? spec.startY : 0,
            frameWidth: spec.width, //width of image
            frameHeight: spec.height,
            numFrames: spec.frames,
            animationRate: (spec.speed) ? spec.speed : spriteConfig.ANIMATION_SPEED
        });
    });
    return sprites;
}

module.exports = GenSpriteSet; //returns generator function
