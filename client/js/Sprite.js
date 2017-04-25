////////////////////////////////
// This object will be passed into the Graphics.drawSprite(sprite)
// Need to guarantee that the img is an Image object ready to go
//
//    context.drawImage(
//        sprite.img,
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
let Graphics = require("./Globals.js").graphics;

let Sprite = (spec)=>{
    'use strict';
    let that = {},
        accumTime = 0,
        frameNumber = 0,
        numFrames = spec.numFrames;
        // TODO: the following attributes can be taken out.  I was using them for
        // the inputs but these will need to be referred to in the Lemming's obj
    that.speed      = spec.animationRate;
    that.reverse    = false;
    that.center     = spec.center;
    that.callback   = spec.callback; //when defined animation will cycle once and terminate with the callback
    that.isFinished = false;

    that.update = (elapsedTime)=>{
        if(!that.isFinished){
            accumTime += elapsedTime;
            if (accumTime > spec.animationRate) {
                accumTime = 0;
                if (frameNumber < numFrames - 1) {
                    frameNumber++;
                } else if(that.callback) {
                    that.isFinished = true;
                    that.callback();
                } else {
                    frameNumber = 0;
                }
            }
        }
    };
    //need to ensure that the image is ready
    that.render = ()=>{
        if(!that.center) return;//when switch between sprites 'that' is undefined
        Graphics.drawSprite({
            reverse: that.reverse,
            center: that.center,
            image: spec.img,
            sx: spec.startX + (spec.frameWidth * frameNumber),
            sy: spec.startY,
            sw: spec.frameWidth,
            sh: spec.frameHeight,
            dx: that.center.x - spec.width/2,
            dy: that.center.y - spec.height/2,
            dw: spec.width,
            dh: spec.height
        });
    };

    return that;
};

module.exports = Sprite; //generates a new sprite with given specs
