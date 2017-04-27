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
let ParticleSystem   = require("./lib/particleSystem.js");
let graphics         = Graphics(Globals.canvas);
let level1           = require("./levels/level1.js");
let level2           = require("./levels/level2.js");
let level3           = require("./levels/level3.js");

let Lemmings = {};

Lemmings.mouse          = Inputs.Mouse();
Lemmings.keyboard       = Inputs.Keyboard();
Lemmings.lemmings       = []; //store all lemmings here
//need to detect collisions between lemmings and world objects and blockers
Lemmings.score          = 0;
//get number of lemmings/types from level config
//each level is 16x28 with 25px squares
Lemmings.lemmingsOut    = 0;
Lemmings.lemmingsIn     = 0;
Lemmings.user           = "";
Lemmings.startTime      = new Date().getTime();
Lemmings.accumTime      = 0;

let eTimer  = $("#timer");
let eOut    = $("#out");
let eIn     = $("#in");

Lemmings.init = (spec)=>{
    'use strict';
    Lemmings.user = spec.user;

    // *********************** this is for testing purposes only ************************
    //clear the lemmings if there from previous game
    Lemmings.lemmings = [];
    //load level
    let level = "";
    switch(spec.levelNum) {
        case 1:
            level = level1;
            break;
        case 2:
            level = level2;
            break;
        case 3:
            level = level3;
            break;
        default:
            level = level1;
    }

    Lemmings.world = World(level);

    // setup control panel buttons
    _.each(Globals.controlPanel, (button, type)=>{
        let value = (Lemmings.world.lemmingTypes[type]) ? Lemmings.world.lemmingTypes[type] : 0;
        $('#lemming-' + type + '-btn>.status').html(value);
    });
    //some sample Lemmings for testing
    Lemmings.lemmings.push(GenerateLemming(Lemmings.world));
    // *********************** this is for testing purposes only ************************

    //reset variables
    Lemmings.startTime = new Date().getTime();
    //get all the images

    // load particle system
    Lemmings.particleSys = ParticleSystem.CreateEffectSnow();
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

    Lemmings.particleSys.particleSys.update(elapsedTime);
    Lemmings.particleSys.update(elapsedTime);
    Lemmings.updateTimer(elapsedTime);
    Lemmings.world.update(elapsedTime);
    Lemmings.speed = Inputs.lemmingSpeed;
    // console.log(Lemmings.speed);
    //Clean up dead lemmings
    _.remove(Lemmings.lemmings, (lemming)=>{
        return !lemming.isAlive;
    });
    //Clean up saved lemmings
    _.remove(Lemmings.lemmings, (lemming)=>{
        if(lemming.isSaved){
            ///////////////////
            //update score here
            ///////////////////
            Lemmings.lemmingsIn += 1;
            Lemmings.updateIn();
            return true;
        }
        return false;
    });
    //check if game is over
    if(Lemmings.lemmings.length === 0) {
        //////////////////////
        //GAME OVER
        /////////////////////
        //stop loop, send score to the server
    }
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
    Lemmings.particleSys.particleSys.draw(ParticleSystem);
};

module.exports = Lemmings;
