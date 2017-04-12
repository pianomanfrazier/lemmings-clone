var page        = require("page");
var $           = require("jquery");
var _           = require("lodash");
var index       = require("./js/views/index.hbs");
var highscores  = require("./js/views/highscores.hbs");

var eApp = document.getElementById("app");
eApp.innerHTML          = index({});
var eMainScreen         = $("#MainScreen");
var eGameScreen         = $("#GameScreen");
var eAboutScreen        = $("#AboutScreen");
var eHelpScreen         = $("#HelpScreen");
var eHighScoresScreen   = $("#HighScoresScreen");
var screens             = [eGameScreen, eAboutScreen, eHelpScreen, eHighScoresScreen];

var Sprite = require("./js/Sprite.js");

var walking         = document.getElementById("lemming_walking");
var blocker         = document.getElementById("lemming_blocking");
var umbrella        = document.getElementById("lemming_umbrella");
var exploding       = document.getElementById("lemming_exploding");
var climbing        = document.getElementById("lemming_climbing");
var splat           = document.getElementById("lemming_splatting");
var drowning        = document.getElementById("lemming_drowning");
var builder         = document.getElementById("lemming_builder");
var timeup          = document.getElementById("lemming_timeup");
var digging         = document.getElementById("lemming_digging");
var trap_10tons     = document.getElementById("lemming_trap_10tons");
var trap_hanging    = document.getElementById("lemming_trap_hanging");
var entrance_gate   = document.getElementById("entrance_gate");
var end_gate        = document.getElementById("end_gate");

var inputs          = require("./js/lib/inputs");

$("#control-panel :button").each((i, button)=>{
    'use strict';

    let regex =/lemming-\w{0,}/;
    let match = regex.exec(button.id);
    let type = (match) ? match[0] : button.id;

    $(button).click(()=>{
        inputs.ButtonPress(type);
    });
});

var images = [walking, blocker, umbrella, exploding, climbing, splat, drowning,builder, timeup, digging, trap_10tons, trap_hanging, entrance_gate, end_gate];

var loop = require("./js/GameLoop.js");

// TODO: this is not a permanent object.  We need to move this into the game loop
var testGame = {
    inputs,
    lemmings : [],
    init: ()=>{
        'use strict';
        var w = 107;
        var h = 250;
        testGame.lemmings.push( Sprite({
            reverse: false,
            img: images[11],
            center: {x: w + 500, y: h + 500},
            width: w, //width to be drawn
            height: h,
            startX: 0, //top left corner of sprite
            startY: 0,
            frameWidth: w, //width of image
            frameHeight: h,
            numFrames: 34,
            animationRate: 200
        }));
        w = 192;
        h = 250;
        testGame.lemmings.push( Sprite({
            reverse: false,
            img: images[10],
            center: {x: w + 200, y: h + 200},
            width: w, //width to be drawn
            height: h,
            startX: 0, //top left corner of sprite
            startY: 0,
            frameWidth: w, //width of image
            frameHeight: h,
            numFrames: 12,
            animationRate: 200
        }));
        w = 50;
        h = w;
        testGame.lemmings.push( Sprite({
            reverse: false,
            img: images[0],
            center: {x: w + 100, y: h + 100},
            width: w, //width to be drawn
            height: h,
            startX: 0, //top left corner of sprite
            startY: 0,
            frameWidth: w, //width of image
            frameHeight: h,
            numFrames: 8,
            animationRate: 200
        }));
        w = 100;
        h = 70;
        testGame.lemmings.push( Sprite({
            reverse: false,
            img: images[12],
            center: {x: w + 700, y: h + 700},
            width: w, //width to be drawn
            height: h,
            startX: 0, //top left corner of sprite
            startY: 0,
            frameWidth: w, //width of image
            frameHeight: h,
            numFrames: 10,
            animationRate: 100
        }));
        w = 100;
        h = 70;
        testGame.lemmings.push( Sprite({
            reverse: false,
            img: images[13],
            center: {x: w + 300, y: h + 700},
            width: w, //width to be drawn
            height: h,
            startX: 0, //top left corner of sprite
            startY: 0,
            frameWidth: w, //width of image
            frameHeight: h,
            numFrames: 6,
            animationRate: 100
        }));
    }
};
end_gate.onload = ()=>{
    'use strict';
    console.log("image ready");
    testGame.init();
};

page('/', ()=>{
    'use strict';

    _.each(screens, (screen)=>{
        screen.slideUp();
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
        error: (e)=>{
            console.log(e);
        }
    }).done((data)=>{
        eHighScoresScreen.html(highscores({title : "Highscores", highscores : data}));
        console.log(data);
    }).fail((e)=>{
        eHighScoresScreen.html(highscores({title : "Highscores", error: "Server connection error"}));
        console.log(e);
    });

});

page();
