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

var image = document.getElementById("lemming_sprites");
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
        var w = 50;
        var h = 50;
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                testGame.lemmings.push( Sprite({
                    img: image,
                    center: {x: i * w + 100, y: j * h + 100},
                    width: w, //width to be drawn
                    height: h,
                    startX: 0, //top left corner of sprite
                    startY: 0,
                    frameWidth: w, //width of image
                    frameHeight: h,
                    numFrames: 7,
                    animationRate: 200
                }));
            }
        }
    }
};
image.onload = function() {
    'use strict';
    console.log("image ready");
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

    testGame.init();
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
