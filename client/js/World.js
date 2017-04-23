let _               = require("lodash");
let Globals         = require("./Globals.js");
let Graphics        = Globals.graphics;
let sprites         = require('./config.js').sprites;
let block           = sprites.block;
let entranceGate    = sprites.entranceGate;
let exitGate        = sprites.exitGate;
let blocksImg       = document.getElementById('blocks');
let blockNum        = 0; //this toggles the block 0 is cross hairs, 1 is box, updated in onHover handler
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
        _.each(that.map, (row, j)=>{
            var length = row.length;
            _.each(row, (col, i)=>{

                blockNum = Globals.blockTypes[col];

                if(blockNum <= 0 && blockNum >= 9 && blockNum !== "") {
                    console.log("invalid block type");
                }

                let width = Globals.canvas.width / length;
                let height = Globals.canvas.height / that.map.length;

                let x = (i * width) + (width / 2);
                let y = (j * height) + (height / 2);
                let dx = i * width;
                let dy = j * height;

                if(block.ready) {
                    switch(col) {
                        case 'start':

                            break;
                        case 'end':

                            break;
                        default:
                            Graphics.drawSprite({
                                center: {x, y},
                                image: blocksImg,
                                sx: width * blockNum,
                                sy: 0,
                                sw: width,
                                sh: height,
                                dx,
                                dy,
                                dw: width,
                                dh: height
                            });
                    }
                }
            });
        });
    };

    return that;
})();

module.exports = World;