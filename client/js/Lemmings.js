////////////////////////////////////////////////
// TODO: load images at runtime not on page load, remove from index.hbs
////////////////////////////////////////////////
let $ = require("jquery");
let _ = require("lodash");
let spriteConfig = require("./config.js").sprites;
var Sprite = require("./Sprite.js");

let Lemmings = {};
//for testing only
Lemmings.type = 'end_gate';

Lemmings.lemmings = []; //store all lemmings here
Lemmings.sprites = {};
//Lemmings.world = World(spec); //generate a level according to specs
//need to detect collisions between lemmings and world objects
Lemmings.score = 0;
Lemmings.user = "";

Lemmings.init = ()=>{
    'use strict';
    //load level
    //load all sprite sheets
    //reset variables
    //get all the images
    $("#images img").each((i, img)=>{
        img.onload = ()=>{
            let type = img.id.slice(8); //remove "lemming_" from id
            let spec = spriteConfig[type];
            Lemmings.sprites[type] = Sprite({
                reverse: false,
                img: img,
                center: {x: 100, y: 100}, //this is arbitrary for testing
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
};
//ajax call to server
//POST to /api/score --> {user : "name", score : 1234}
Lemmings.storeScore = ()=>{
    'use strict';
    $.ajax({
        type: "POST",
        dataType: 'json',
        data: {user: Lemmings.user, score: Lemmings.score},
        url: '/api/score',
        error: (e)=>{
            console.log(e);
        }
    }).done( (data)=>{
        console.log(data);
    });
};
Lemmings.update = (elapsedTime)=>{
    'use strict';
    _.each(Lemmings.lemmings, (lemming)=>{
        lemming.update(elapsedTime);
    });
    //for testing only
    Lemmings.sprites[Lemmings.type].update(elapsedTime);
    //Lemmings.world.update(elapsedTime);
};
Lemmings.render = ()=>{
    'use strict';
    _.each(Lemmings.lemmings, (lemming)=>{
        lemming.render();
    });
    //for testing only
    Lemmings.sprites[Lemmings.type].render();
    //Lemmings.world.render();
};

module.exports = Lemmings;
