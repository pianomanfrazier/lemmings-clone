Lemmings.screens['game-play'] = ((breakout, graphics, input)=>{
    'use strict';

    let prevTime = performance.now();
    let keyBoard = input.Keyboard();
    var game,
        isPaused = false;

    function processInput(elapsedTime) {
        keyBoard.update(elapsedTime);
    }

    function update(elapsedTime) {

        if (game.isActive) {

        } else if (!game.isActive ) {
            // game.isActive = output.isActive;
        }
    }

    function render() {
        graphics.Clear();
        game.topBar.draw();

        if(game.countDown) {
            game.countDown.draw();
        }
    }

    function gameLoop(time) {
        let elapsedTime = time - prevTime;
        prevTime = time;

        if(!game.isPaused) {
            processInput(elapsedTime);
            update(elapsedTime);
            render();
        }

        if (!input.cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function run() {
        // Start the animation loop
        input.cancelNextRequest = false;
        game.StartGame();
        requestAnimationFrame(gameLoop);
    }

    window.onload = ()=>{

    };

    return {
        isPaused,
        run
    };

})(Lemmings.breakout, Lemmings.graphics, Lemmings.input);