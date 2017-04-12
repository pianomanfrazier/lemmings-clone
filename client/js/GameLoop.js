
let GameLoop = {};

GameLoop.rafID = 0;
GameLoop.isRunning = false;

GameLoop.stop = ()=>{
    'use strict';
    //console.log("stop loop");
    //Game.graphics.clear();
    window.cancelAnimationFrame(GameLoop.rafID);
    GameLoop.isRunning = false;
};

GameLoop.run = (game)=>{
    'use strict';

    //prevents multiple game loops
    if(GameLoop.isRunning) return;
    GameLoop.isRunning = true;


    let lastTimeStamp = performance.now();

    //FPS for game loop
    let accumtime = 0;
    let FPS = 60;
    let timeframe = 1000/FPS;

    function update(elapsedTime) {
        game.update(elapsedTime);
    }

    function render(elapsedTime) {
        game.render(elapsedTime);
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
