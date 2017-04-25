////////////////////////////////////////////////
// TODO: load images at runtime not on page load, remove from index.hbs
////////////////////////////////////////////////
let $                = require("jquery");
let _                = require("lodash");
let GenerateLemming  = require("./Lemming.js");
let settings         = require("./settings.js");
let Inputs           = require("./lib/inputs.js");
let Graphics         = require("./Graphics.js");
let Globals          = require("./Globals.js");
let World            = require("./World.js");
let graphics         = Graphics(Globals.canvas);
let level1           = require("./levels/level1.js");
let level2           = require("./levels/level2.js");
let level3           = require("./levels/level3.js");

let Lemmings = {};

Lemmings.mouse      = Inputs.Mouse();
Lemmings.keyboard   = Inputs.Keyboard();

Lemmings.lemmings = []; //store all lemmings here
//need to detect collisions between lemmings and world objects and blockers
Lemmings.score = 0;
//get number of lemmings/types from level config
//each level is 16x28 with 25px squares
//have user choose the level they want and load it
Lemmings.level = 1;
Lemmings.lemmingsOut = 7;
Lemmings.lemmingsIn = 4;
Lemmings.user = "";
Lemmings.startTime = new Date().getTime();
Lemmings.accumTime = 0;

let eTimer = $("#timer");
let eOut = $("#out");
let eIn = $("#in");

Lemmings.init = (spec)=>{
    'use strict';
    //load level
    Lemmings.user = spec.user;
    Lemmings.world = World(level1);

    // setup control panel buttons
    _.each(Globals.controlPanel, (button, type)=>{
        let value = (Lemmings.world.lemmingTypes[type]) ? Lemmings.world.lemmingTypes[type] : 0;
        $('#lemming-' + type + '-btn>.status').html(value);

        if(value === 0) {
            $(button).off('click');
        }
    });

    // *********************** this is for testing purposes only ************************
    //clear the lemmings if there from previous game
    Lemmings.lemmings = [];
    //some sample Lemmings for testing
    for(var i = 0; i < Lemmings.world.lemmingCount; i++) {
        Lemmings.lemmings.push(GenerateLemming());
        Lemmings.lemmings[i].center = {x: 100 + 10*i, y: 100};
    }
    //you can dynamically change the type of lemming displayed
    //based on the type the lemming will move up/down/left/right
    Lemmings.lemmings[0].center = {x:300,y:300};
    //TODO: reverse direction of walking lemming
    Lemmings.lemmings[3].activeType = "walking";
    Lemmings.lemmings[4].activeType = "umbrella";
    Lemmings.lemmings[5].activeType = "exploding";
    Lemmings.lemmings[6].activeType = "climbing";
    Lemmings.lemmings[7].activeType = "blocking";
    // *********************** this is for testing purposes only ************************

    //reset variables
    Lemmings.startTime = new Date().getTime();
    //get all the images
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
    eIn.html("IN : " + Math.floor(Lemmings.lemmingsIn/Lemmings.world.lemmingCount * 100) + "%");
};
Lemmings.update = (elapsedTime)=>{
    'use strict';

    _.each(Lemmings.lemmings, (lemming)=>{
        lemming.update(elapsedTime);
    });
    Lemmings.mouse.update({elapsedTime, lemmings: Lemmings.lemmings, controlPanel: Lemmings.world.lemmingTypes});
    Lemmings.keyboard.update(elapsedTime);

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

            Lemmings.keyboard.registerCommand(Inputs.KeyEvent['DOM_VK_' + key.value], ()=>Inputs.ButtonPress({type, mouse: Lemmings.mouse, speed: Lemmings.speed}));
        });
    }

    Lemmings.updateTimer(elapsedTime);
    Lemmings.world.update(elapsedTime);
    Lemmings.speed = Inputs.lemmingSpeed;
    // console.log(Lemmings.speed);
};
Lemmings.render = ()=>{
    'use strict';
    graphics.clear();
    Lemmings.world.render();
    _.each(Lemmings.lemmings, (lemming)=>{
        lemming.render();
    });
    //draw the cursor
    Lemmings.mouse.draw();
};

module.exports = Lemmings;
