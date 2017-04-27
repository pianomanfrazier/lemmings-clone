////////////////////////////////////////////////
// TODO: load images at runtime not on page load, remove from index.hbs
////////////////////////////////////////////////
let $                = require("jquery");
let _                = require("lodash");
let Page             = require("page");
let GenerateLemming  = require("./Lemming.js");
let settings         = require("./settings.js");
let Inputs           = require("./lib/inputs.js");
let Graphics         = require("./Graphics.js");
let Globals          = require("./Globals.js");
let World            = require("./World.js");
let ParticleSystem   = require("./lib/particleSystem.js");
let graphics         = Graphics(Globals.canvas);
let Level            = require("./levels/Level.js");

let Lemmings = {};

Lemmings.mouse          = Inputs.Mouse();
Lemmings.keyboard       = Inputs.Keyboard();
Lemmings.lemmings       = []; //store all lemmings here
Lemmings.ready          = false;
//need to detect collisions between lemmings and world objects and blockers
Lemmings.lemmingsRemoved= 0;
Lemmings.speed          = 50;
//get number of lemmings/types from level config
//each level is 16x28 with 25px squares
Lemmings.lemmingsOut    = 0;
Lemmings.lemmingsIn     = 0;
Lemmings.percentIn      = 0;
Lemmings.timerString    = "";
Lemmings.startTime      = new Date().getTime();
Lemmings.accumTime      = 0;
Lemmings.releaseTimer   = 0;

let eTimer  = $("#timer");
let eOut    = $("#out");
let eIn     = $("#in");
var eMusic              = document.getElementById("music");

Lemmings.init = (levelNum)=>{
    'use strict';
    Lemmings.level = levelNum;
    //reset variables
    //clear the lemmings if there from previous game
    Lemmings.lemmings       = [];
    Lemmings.ready          = false;
    Lemmings.lemmingsRemoved= 0;
    Lemmings.speed          = 50;
    Inputs.lemmingSpeed     = 50;
    Inputs.ABomb            = false;
    Lemmings.lemmingsOut    = 0;
    Lemmings.lemmingsIn     = 0;
    Lemmings.percentIn      = 0;
    Lemmings.startTime      = new Date().getTime();



    //load level
    let level = Level(levelNum, ()=>{
        Lemmings.world = World(level);
        // setup control panel buttons
        _.each(Globals.controlPanel, (button, type)=>{
            let value = (Lemmings.world.lemmingTypes[type]) ? Lemmings.world.lemmingTypes[type] : 0;
            $('#lemming-' + type + '-btn>.status').html(value);
        });
        Lemmings.ready = true;
        //refresh dom elements
        $("#speed-up-btn .status").html("50");
        $("#speed-down-btn .status").html("50");
        //load the music
        eMusic.src = level.music;
        eMusic.play();
    });

    // load particle system
    Lemmings.particleSys = ParticleSystem.CreateEffectSnow();
};
//ajax call to server
//POST to /api/score --> {user : "name", score : 1234}
Lemmings.storeScore = (userName)=>{
    'use strict';
    let data = {
        user: userName,
        time: Lemmings.timerString,
        percent: Lemmings.percentIn,
        level: parseInt(Lemmings.level)
    };
    console.log("posting data: ", data);
    $.ajax({
        type: "POST",
        dataType: 'json',
        data: data,
        url: '/api/score',
        error: (e)=>{
            console.log(e);
        }
    }).done( (data)=>{
        console.log("POST data: ", data);
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
        Lemmings.timerString = minutes + ":" + seconds;
        eTimer.html("Time : " + minutes + ":" + seconds);
    }
};
//this should only be called when a new lemming is put into the level
Lemmings.updateOut = ()=>{
    'use strict';
    eOut.html("OUT : " + Lemmings.lemmings.length);
};
//this should be called only when a lemming is saved
Lemmings.updateIn = ()=>{
    'use strict';
    Lemmings.percentIn = Math.floor(Lemmings.lemmingsIn/Lemmings.world.lemmingCount * 100);
    eIn.html("IN : " + Math.floor(Lemmings.lemmingsIn/Lemmings.world.lemmingCount * 100) + "%");
};

Lemmings.update = (elapsedTime)=>{
    'use strict';
    if(!Lemmings.ready) return;

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

            Lemmings.keyboard.registerCommand(
                Inputs.KeyEvent['DOM_VK_' + key.value],
                ()=>Inputs.ButtonPress({
                    type,
                    mouse: Lemmings.mouse,
                    speed: Lemmings.speed
                }
            ));
        });
    }

    Lemmings.particleSys.particleSys.update(elapsedTime);
    Lemmings.particleSys.update(elapsedTime);
    Lemmings.updateTimer(elapsedTime);
    Lemmings.world.update(elapsedTime);
    //console.log(Lemmings.speed);
    Lemmings.speed = Inputs.lemmingSpeed;

    //release lemmings
    if(Lemmings.lemmingsOut < Lemmings.world.lemmingCount) {
        Lemmings.releaseTimer += elapsedTime;
        if(Lemmings.releaseTimer > (100 - Lemmings.speed) * 50) {
            let lemming = GenerateLemming(Lemmings.world);
            lemming.center = Lemmings.world.getStartPoint();
            Lemmings.lemmings.push(lemming);

            Lemmings.lemmingsOut += 1;
            Lemmings.updateOut();
            Lemmings.releaseTimer = 0;
        }
    }
    //Clean up dead lemmings
    _.remove(Lemmings.lemmings, (lemming)=>{
        if(!lemming.isAlive){
            Lemmings.updateOut();
            Lemmings.lemmingsRemoved++;
            return true;
        }
        return false;
    });
    //Clean up saved lemmings
    _.remove(Lemmings.lemmings, (lemming)=>{
        if(lemming.isSaved){
            ///////////////////
            //update score here
            ///////////////////
            Lemmings.lemmingsIn += 1;
            Lemmings.lemmingsRemoved++;
            Lemmings.updateIn();
            Lemmings.updateOut();
            return true;
        }
        return false;
    });
    //ABOMB
    if(Inputs.ABomb) {
        _.each(Lemmings.lemmings, (lemming)=>{
            lemming.activeType = "exploding";
        });
    }
    //check if game is over
    if(Lemmings.lemmingsRemoved === Lemmings.world.lemmingCount) {
        //////////////////////
        //GAME OVER
        /////////////////////
        //stop loop, send score to the server
        let userName = window.prompt("Congratulations!\nEnter your name: ");
        if(userName !== "" || userName !== null) {
            Lemmings.storeScore(userName);
            Lemmings.lemmingsRemoved = -1;
            Page.redirect("/");
        }
    }
};
Lemmings.render = ()=>{
    'use strict';
    if(!Lemmings.ready) return;
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
