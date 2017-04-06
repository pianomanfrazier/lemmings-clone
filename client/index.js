var page = require("page");
var $ = require("jquery");
var index = require("./js/views/index.hbs");
var highscores = require("./js/views/highscores.hbs");

var eApp = document.getElementById("app");
eApp.innerHTML = index({});
var eMainScreen = $("#MainScreen");
var eGameScreen = $("#GameScreen");
var eAboutScreen = $("#AboutScreen");
var eHelpScreen = $("#HelpScreen");
var eHighScoresScreen = $("#HighScoresScreen");
var screens = [eGameScreen, eAboutScreen, eHelpScreen, eHighScoresScreen];

var Sprite = require("./js/Sprite.js");

var walking = document.getElementById("lemming_walking");
var blocker = document.getElementById("lemming_blocking");
var umbrella = document.getElementById("lemming_umbrella");
var exploding = document.getElementById("lemming_exploding");
var climbing = document.getElementById("lemming_climbing");
var splat = document.getElementById("lemming_splatting");
var drowning = document.getElementById("lemming_drowning");
var builder = document.getElementById("lemming_builder");
var timeup = document.getElementById("lemming_timeup");
var digging = document.getElementById("lemming_digging");


var images = [walking, blocker, umbrella, exploding, climbing, splat, drowning,builder, timeup, digging];

var loop = require("./js/GameLoop.js");

var testGame = {
    lemmings : [],
    update: function(elapsedTime) {
        'use strict';
        this.lemmings.forEach(function(l){
            l.update(elapsedTime);
        });
    },
    render: function() {
        'use strict';
        this.lemmings.forEach(function(l){
            l.render();
        });
    },
    init: function() {
        'use strict';
        var w = 64;
        var h = w;
        testGame.lemmings.push( Sprite({
            reverse: false,
            img: images[9],
            center: {x: w + 500, y: h + 500},
            width: w, //width to be drawn
            height: h,
            startX: 0, //top left corner of sprite
            startY: 0,
            frameWidth: w, //width of image
            frameHeight: h,
            numFrames: 16,
            animationRate: 150
        }));
    }
};
blocker.onload = function() {
    'use strict';
    console.log("image ready");
    testGame.init();
};

page('/', ()=>{
    'use strict';

    screens.forEach(function(el){
        el.slideUp();
    });
    eMainScreen.slideDown();
});
page('/game', ()=>{
    'use strict';
    eMainScreen.slideUp();
    eGameScreen.slideDown();

    loop.run(testGame);
});
page('/about', ()=>{
    'use strict';
    eMainScreen.slideUp();
    eAboutScreen.slideDown();
});
page('/help', ()=>{
    'use strict';
    eMainScreen.slideUp();
    eHelpScreen.slideDown();
});
page('/highscores', ()=>{
    'use strict';
    eMainScreen.slideUp();
    eHighScoresScreen.slideDown();

    eHighScoresScreen.html(highscores({title : "Highscores"}));
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: '/api/highscores',
        error: function(e) {
            console.log(e);
        }
    }).done(function(data) {
        eHighScoresScreen.html(highscores({title : "Highscores", highscores : data}));
        console.log(data);
    }).fail((e)=>{
        eHighScoresScreen.html(highscores({title : "Highscores", error: "Server connection error"}));
        console.log(e);
    });

});

page();
