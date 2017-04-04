////////////////////////////////
// This object will be passed into the Graphics.drawSprite(sprite)
// Need to guarantee that the img is an Image object ready to go
//
//    context.drawImage(
//    		sprite.img,
//        sprite.sx,
//        sprite.sy,
//        sprite.sw,
//        sprite.sh,
//        sprite.dx,
//        sprite.dy,
//        sprite.dw,
//        sprite.dh
//    );
////////////////////////////////
let Graphics = require("Globals").graphics;

let Sprite = function(spec) {
    'use strict';
    let that = {};
    let accumTime = 0;
    let frameNumber = 0;
    let numFrames = spec.numFrames;

    that.update = function(elapsedTime) {
        accumTime += elapsedTime;
        if (accumTime > spec.animationRate) {
            accumTime = 0;
            if (frameNumber < numFrames) {
                frameNumber++;
            } else {
                frameNumber = 0;
            }
        }
    };
    //need to ensure that the image is ready
    that.render = function() {
        Graphics.drawSprite({
            img: spec.image,
            sx: spec.startX + (spec.frameWidth + spec.spacer) * frameNumber,
            sy: spec.startY,
            sw: spec.frameHeight,
            sh: spec.frameWidth,
            dx: spec.center.x - spec.width/2,
            dy: spec.center.y - spec.height/2,
            dw: spec.width,
            dh: spec.height
        });
    };

    return that;
};

module.exports = Sprite; //generates a new sprite with given specs
