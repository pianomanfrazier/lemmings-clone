let Graphics = require("./Graphics.js");
let canvas = require("./Globals.js").canvas;

let GameLoop = {};

GameLoop.rafID = 0;
GameLoop.isRunning = false;

GameLoop.graphics = Graphics(canvas);

GameLoop.stop = function() {
    'use strict';
    //console.log("stop loop");
    //Game.graphics.clear();
    window.cancelAnimationFrame(GameLoop.rafID);
    GameLoop.isRunning = false;
};

GameLoop.run = function(game) {
    'use strict';
    //prevents multiple game loops
    if(GameLoop.isRunning) return;
    GameLoop.isRunning = true;

    let graphics = GameLoop.graphics;
    let lastTimeStamp = performance.now();

    //FPS for game loop
    let accumtime = 0;
    let FPS = 60;
    let timeframe = 1000/FPS;

    function update(elapsedTime) {
        game.update(elapsedTime);
    }
    function render() {
        graphics.clear();
        game.render();
    }
    function gameLoop(time) {
        GameLoop.rafID = window.requestAnimationFrame(gameLoop);
        let elapsedTime = (time - lastTimeStamp);

    accumtime += elapsedTime;
    if (accumtime > timeframe) {
        update(accumtime);
            render();
        accumtime = 0;
    }

    lastTimeStamp = time;
    }

    window.requestAnimationFrame(gameLoop);
};

module.exports = GameLoop;
