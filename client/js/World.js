let _           = require("lodash");
let Globals     = require("./Globals.js");
let Graphics    = Globals.graphics;
let sprites     = require('./config.js').sprites;
let block       = sprites.block;
let blocksImg   = document.getElementById('blocks');
let blockNum    = 0; //this toggles the block 0 is cross hairs, 1 is box, updated in onHover handler
blocksImg.onload = ()=>{
    'use strict';
    block.ready = true;
};

let World = (()=>{
    'use strict';

    let that = {
        lemmingsSaved: 0,
        level: 0,
        numLemmings: 0,
        lemmingGoal: 0,
        lemmingTypes: {},
        map: []
    };

    that.init = (spec)=>{
        that.lemmingGoal        = spec.lemmingGoal;
        that.lemmingTypes       = spec.lemmingTypes;
        that.map                = spec.map;
    };

    that.update = (elapsedTime)=>{

    };

    that.render = ()=>{
        _.each(that.map, (row, y)=>{
            _.each(row, (col, x)=>{
                blockNum = Globals.blockTypes[col];

                if(blockNum <= 0 && blockNum >= 9 && blockNum !== "") {
                    console.log("invalid block type");
                }

                x = (x * block.width) + (block.width / 2);
                y = (y * block.height) + (block.height / 2);

                //draw the appropriate block at mouse position
                if(block.ready) {
                    Graphics.drawSprite({
                        center: {x, y},
                        image: blocksImg,
                        sx: block.width * blockNum,
                        sy: 0,
                        sw: block.width,
                        sh: block.height,
                        dw: block.width * block.scaleFactor,
                        dh: block.height * block.scaleFactor
                    });
                }
            });
        });
    };

    return that;
})();

module.exports = World;