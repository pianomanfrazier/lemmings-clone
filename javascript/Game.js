let $ = require("jquery");
var Game = {};

Game.canvas = document.getElementById('canvas');
Game.context = canvas.getContext('2d');
Game.canvas.width = 1000;
Game.canvas.height = 1000;
Game.rafID = 0;
Game.myGame = undefined;
Game.isRunning = false;
Game.isPaused = false;
Game.inGameWindow = false;

Game.graphics = (function() {
    'use strict';

    var canvas    = Game.canvas;
    var context   = Game.context;

	  CanvasRenderingContext2D.prototype.clear = function() {
		    this.save();
		    this.setTransform(1, 0, 0, 1, 0, 0);
		    this.clearRect(0, 0, canvas.width, canvas.height);
		    this.restore();
	  };

	  function clear() {
		    context.clear();
	  }
    //need a drawSprite function
    //x,y is the top left corner of the starting sprite
    //it will cycle through the frames
    //spec = { x, y, w, h, spacer, number_of_frames}
    function drawText(spec) {
        context.save();

        context.font = spec.font;
        context.fillStyle = spec.fill;
        context.fillText(spec.text, spec.x, spec.y);

        context.restore();
    }
	  function drawImage(spec) {
		    context.save();

		    context.translate(spec.center.x, spec.center.y);
        if (spec.rotation) {
            context.rotate(spec.rotation);
        }
		    context.translate(-spec.center.x, -spec.center.y);

		    context.drawImage(
			      spec.image,
			      spec.center.x - spec.size/2,
			      spec.center.y - spec.size/2,
			      spec.size, spec.size
        );

		    context.restore();
	  }
    function drawRect(spec) {
        context.save();
		    context.translate(spec.position.x + spec.width / 2, spec.position.y + spec.height / 2);
		    if(spec.rotation) context.rotate(spec.rotation);
		    context.translate(-(spec.position.x + spec.width / 2), -(spec.position.y + spec.height / 2));
        // Create gradient
		    context.fillStyle = spec.fill;
		    context.fillRect(spec.position.x, spec.position.y, spec.width, spec.height);

		    context.strokeStyle = spec.stroke;
		    context.strokeRect(spec.position.x, spec.position.y, spec.width, spec.height);

		    context.restore();
    }
    function drawCircle(spec) {
        let w = spec.width;
        let h = spec.height;
        let x = spec.position.x * w;
        let y = spec.position.y * h;
        context.save();
        context.beginPath();
        context.fillStyle = spec.fill;
        context.arc(x + h/2, y + w/2, w/2 -10 , 0, 2 * Math.PI, false);
        context.fill();
        context.lineWidth = spec.lineWidth;
        context.strokeStyle = spec.stroke;
        context.stroke();
        context.restore();
    }
	  return {
		    clear : clear,
		    drawImage : drawImage,
        drawRect : drawRect,
        drawText : drawText,
        drawCircle : drawCircle
	  };
}());
Game.rightPressed = false;
Game.leftPressed = false;
Game.mouseEnter = false;
Game.mouse = {x : 0, y : 0};
Game.events = (function() {
    'use strict';
    let ePause = $('#pause-menu');
    let eEndgame = $('#endgame-menu');
    function pauseGame() {
        Game.isPaused = true;
        ePause.slideDown();
        Game.stop();
    }
    function resumeGame() {
        Game.isPaused = false;
        Game.run(Game.myGame);
        ePause.slideUp();
    }
    function restartGame() {
        Game.myGame.init();
        Game.run(Game.myGame);
    }
    document.getElementById("resume-game").onclick = function() {
        resumeGame();
    };
    document.getElementById("clear-high-scores").onclick = function() {
        if(window.confirm("Are you sure you want to clear the high scores?")) {
            window.localStorage['breakout:highscores'] = '[]';
            //clear list
            document.getElementById("high-scores-list").innerHTML = "";
        }
    };
    document.getElementById("play-again").onclick = function() {
        eEndgame.slideUp(restartGame);
    };
    // bind keys to canvas
    function keyDown(e) {
        switch(e.which) {
        //left key
        case 37:
            Game.mouseEnter = false;
            Game.leftPressed = true;
            break;
        //right key
        case 39:
            Game.mouseEnter = false;
            Game.rightPressed = true;
            break;
        default:
            break;
        }
        //e.preventDefault();
    }
    function keyUp(e) {
        switch(e.which) {
        //left key
        case 37:
            Game.leftPressed = false;
            break;
        //right key
        case 39:
            Game.rightPressed = false;
            break;
        case 27:
            //console.log("esc key");
            if(Game.inGameWindow)
                Game.isPaused ? resumeGame() : pauseGame();
            break;
        case 32:
            //console.log("space key");
            if(Game.inGameWindow)
                Game.isPaused ? resumeGame() : pauseGame();
            break;
        default:
            break;
        }
        e.preventDefault();
    }
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    Game.canvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        //console.log(message);
    }, false);
    Game.canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(Game.canvas, evt);
        Game.mouseEnter = true;
        Game.mouse.x = mousePos.x;
        Game.mouse.y = mousePos.y;
        //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        //console.log(message);
    }, false);
    Game.canvas.addEventListener('mouseenter', function(evt) {
        //Game.mouseEnter = true;
        //var message = 'mouse enter';
        //console.log(message);
    }, false);
    Game.canvas.addEventListener('mouseleave', function(evt) {
        //Game.mouseEnter = false;
        //var message = 'mouse leave';
        //console.log(message);
    }, false);
    // http://stackoverflow.com/questions/12886286/addeventlistener-for-keydown-on-canvas
    var lastDownTarget;
    window.onload = function() {
        document.addEventListener('mousedown', function(event) {
            lastDownTarget = event.target;
            //console.log('mousedown');
        }, false);

        document.addEventListener('keydown', function(event) {
            keyDown(event);
        }, false);
        document.addEventListener('keyup', function(event) {
            keyUp(event);
        }, false);
    };
}());

Game.stop = function() {
    //console.log("stop loop");
    //Game.graphics.clear();
    window.cancelAnimationFrame(Game.rafID);
    Game.isRunning = false;
};

Game.endgameDialog = function() {
    'use strict';
    let eEndgame = $('#endgame-menu');
    eEndgame.slideDown(Game.stop()); //must stop game or endgame window will be called in loop
};

Game.run = function(game) {
    'use strict';
    //prevents multiple game loops
    if(Game.isRunning) return;
    Game.isRunning = true;

    Game.myGame = game;
    let graphics = Game.graphics;
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
		    Game.rafID = window.requestAnimationFrame(gameLoop);
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

module.exports = Game;
