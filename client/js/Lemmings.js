let $ = require("jquery");
let _ = require("lodash");
let spriteConfig = require("./config.js").sprites;
var Sprite = require("./Sprite.js");

let Lemmings = {};
Lemmings.type = 'blocking';

Lemmings.lemmings = []; //store all lemmings here
Lemmings.sprites = {};
///////////////////////////////
// Images
// TODO: load images at runtime not on page load, remove from index.hbs
///////////////////////////////
//Lemmings.world = World(spec); //generate a level according to specs
//need to detect collisions between lemmings and world objects
Lemmings.score = 0;
Lemmings.user = "";

Lemmings.init =(spec)=>{
    'use strict';
    Lemmings.user = spec.user;
    //load level
    //load all sprite sheets
    //reset variables
    //get all the images
    $("#images img").each((i, img)=>{
        img.onload = ()=>{
            let type = img.id.slice(8); //remove "lemming_" from id
            let spec = spriteConfig[type];
            Lemmings.sprites[type] = ( Sprite({
                reverse: false,
                img: img,
                center: {x: 100 + 2*i, y: 100 + 2*i},
                //width: spec.width * (spec.scaleFactor) ? spec.scaleFactor : spriteConfig.SCALE_FACTOR, //width to be drawn
                //height: spec.height * (spec.scaleFactor) ? spec.scaleFactor : spriteConfig.SCALE_FACTOR, //height to be drawn
                width: spec.width * spriteConfig.SCALE_FACTOR,
                height: spec.height * spriteConfig.SCALE_FACTOR,
                startX: 0, //top left corner of sprite
                startY: 0,
                frameWidth: spec.width, //width of image
                frameHeight: spec.height,
                numFrames: spec.frames,
                animationRate: (spec.speed) ? spec.speed : spriteConfig.ANIMATION_SPEED
            }));
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
    Lemmings.sprites[Lemmings.type].update(elapsedTime);
    //Lemmings.world.update(elapsedTime);
};
Lemmings.render = ()=>{
    'use strict';
    _.each(Lemmings.lemmings, (lemming)=>{
        lemming.render();
    });
    Lemmings.sprites[Lemmings.type].render();
    //Lemmings.world.render();
};

module.exports = Lemmings;
