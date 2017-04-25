let _               = require("lodash");
let Globals         = require("./Globals.js");
let Graphics        = Globals.graphics;
let sprites         = require('./config.js').sprites;
let block           = sprites.block;
let blocksImg       = document.getElementById('blocks');
let blockNum        = 0; //this toggles the block 0 is cross hairs, 1 is box, updated in onHover handler
blocksImg.onload = ()=>{
    'use strict';
    // console.log("blocks ready");
    block.ready = true;
};

let World = (spec)=>{
    'use strict';

    let that = {
        lemmingsSaved: 0
    };

    that.lemmingGoal    = spec.lemmingGoal;
    that.lemmingTypes   = spec.lemmingTypes;
    that.lemmingCount   = spec.lemmingCount;
    that.map            = spec.map;

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

    that.update = (elapsedTime)=>{

    };

    that.render = ()=>{
        _.each(that.map, (row, i)=>{
            _.each(row, (cell, j)=>{
                if(cell === "" && cell === "start" && cell === "end") return;
                blockNum = sprites.blockTypes[cell];

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
};

module.exports = World;
