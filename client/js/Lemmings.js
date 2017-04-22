////////////////////////////////////////////////
// TODO: load images at runtime not on page load, remove from index.hbs
////////////////////////////////////////////////
let $                = require("jquery");
let _                = require("lodash");
let GenerateLemming  = require("./Lemming.js");
let settings         = require("./settings.js");
let inputs           = require("./lib/inputs.js");
let Graphics         = require("./Graphics.js");
let Globals          = require("./Globals.js");
let World            = require("./World.js");
let graphics         = Graphics(Globals.canvas);
let level1           = require("./levels/level1.json");
// let level2           = require("./levels/level2.json");
// let level3           = require("./levels/level3.json");

let Lemmings = {};

Lemmings.inputs = inputs;
Lemmings.lemmings = []; //store all lemmings here
//need to detect collisions between lemmings and world objects and blockers
Lemmings.score = 0;
//get number of lemmings/types from level config
//each level is 16x28 with 25px squares
//have user choose the level they want and load it
Lemmings.level = 1;
Lemmings.lemmingCount = 25;
Lemmings.lemmingsOut = 7;
Lemmings.lemmingsIn = 4;
Lemmings.user = "";
Lemmings.startTime = new Date().getTime();
Lemmings.accumTime = 0;
let eTimer = $("#timer");
let eOut = $("#out");
let eIn = $("#in");

Lemmings.init = ()=>{
    'use strict';
    //load level
    //load all sprite sheets
    //some sample Lemmings for testing
    for(var i = 0; i < Lemmings.lemmingCount; i++) {
        Lemmings.lemmings.push(GenerateLemming());
        Lemmings.lemmings[i].center = {x: 100 + 10*i, y: 100};
    }
    //you can dynamically change the type of lemming displayed
    //based on the type the lemming will move up/down/left/right
    Lemmings.lemmings[0].center = {x:300,y:300};
    //TODO: reverse direction of walking lemming
    Lemmings.lemmings[3].type = "walking";
    Lemmings.lemmings[4].type = "umbrella";
    Lemmings.lemmings[5].type = "exploding";
    Lemmings.lemmings[6].type = "climbing";
    Lemmings.lemmings[7].type = "blocking";
    //reset variables
    Lemmings.startTime = new Date().getTime();
    //get all the images

    World.init(level1); // init will always be level1

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
Lemmings.updateTimer = (elapsedTime)=>{
    'use strict';
    Lemmings.accumTime+=elapsedTime;
    if(Lemmings.accumTime > 1000) {
        Lemmings.accumTime = 0;
        let timer = new Date().getTime() - Lemmings.startTime;
        timer = Math.floor(timer/1000);
        let seconds = timer % 60;
        let minutes = Math.floor(timer/60);
        if(seconds < 10){
            seconds = "0" + seconds.toString();
        }
        if(minutes < 10){
            minutes = "0" + minutes.toString();
        }
        eTimer.html("Time : " + minutes + ":" + seconds);
    }
};
//this should only be called when a new lemming is put into the level
Lemmings.updateOut = ()=>{
    'use strict';
    eOut.html("OUT : " + Lemmings.lemmingsOut);
};
//this should be called only when a lemming is saved
Lemmings.updateIn = ()=>{
    'use strict';
    eIn.html("IN : " + Math.floor(Lemmings.lemmingsIn/Lemmings.lemmingCount * 100) + "%");
};
Lemmings.update = (elapsedTime)=>{
    'use strict';
    _.each(Lemmings.lemmings, (lemming)=>{
        lemming.update(elapsedTime);
    });
    Lemmings.inputs.Mouse.update({elapsedTime, lemmings: Lemmings.lemmings});
    Lemmings.inputs.Keyboard.update(elapsedTime);

    // check local storage
    if (settings.storage.hotKeysUpdate) {
        let hotKeys = settings.storage.retrieve('hotKeys');
        settings.storage.hotKeysUpdate = false;

        _.each(hotKeys, (key)=>{
            let type = "";
            switch(key.id) {
                case 'pause':
                    type = 'pause-btn';
                    break;
                case 'atomicBomb':
                    type = 'atomic-bomb-btn';
                    break;
                case 'lemmingStop':
                    type = 'lemming-blocking';
                    break;
                case 'lemmingBomb':
                    type = 'lemming-exploding';
                    break;
                case 'lemmingUmbrella':
                    type = 'lemming-umbrella';
                    break;
                case 'lemmingClimb':
                    type = 'lemming-climbing';
                    break;
                case 'fastForward':
                    type = 'speed-up-btn';
                    break;
                case 'slowDown':
                    type = 'speed-down-btn';
                    break;
                default:
            }

            inputs.Keyboard.registerCommand(inputs.KeyEvent['DOM_VK_' + key.value], ()=>inputs.ButtonPress(type));
        });
    }
    Lemmings.updateTimer(elapsedTime);
    //Lemmings.world.update(elapsedTime);
};
Lemmings.render = ()=>{
    'use strict';
    graphics.clear();
    World.render();
    _.each(Lemmings.lemmings, (lemming)=>{
        lemming.render();
    });
    // Lemmings.world.render();

};

module.exports = Lemmings;
