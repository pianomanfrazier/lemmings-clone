var page        = require("page");
var $           = require("jquery");
var _           = require("lodash");
var index       = require("./js/views/index.hbs");
var highscores  = require("./js/views/highscores.hbs");
var settings    = require("./js/views/settings.hbs");

var eApp = document.getElementById("app");
eApp.innerHTML          = index({});
var eMainScreen         = $("#MainScreen");
var eGameScreen         = $("#GameScreen");
var eAboutScreen        = $("#AboutScreen");
var eHelpScreen         = $("#HelpScreen");
var eSettingScreen      = $("#SettingsScreen");
var eHighScoresScreen   = $("#HighScoresScreen");

var screens = [eGameScreen, eAboutScreen, eSettingScreen, eHelpScreen, eHighScoresScreen];

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

var images = [walking, blocker, umbrella, exploding, climbing, splat, drowning,builder, timeup, digging, trap_10tons, trap_hanging, entrance_gate, end_gate];

var loop        = require("./js/GameLoop.js");
var Globals     = require('./js/Globals');
var Graphics    = require("./js/Graphics.js");

var graphics = Graphics(Globals.canvas);

//the document is ready because this is called after all elements
//are injected to the page
//should us JQuery.on() to dynamically bind events
//see http://stackoverflow.com/questions/6658752/click-event-doesnt-work-on-dynamically-generated-elements
$(document).on('click','#hotkey-save-btn', ()=>{
    'use strict';
    inputs.ButtonPress('hotkey-save', getHotKeys());
});

//not sure why this works and the other doesn't
$('#control-panel :button').each((i, button)=>{
    'use strict';

    let regex =/lemming-\w{0,}/;
    let match = regex.exec(button.id);
    let type = (match) ? match[0] : button.id;

    $(button).click(()=>{
        inputs.ButtonPress(type);
    });
});

function getHotKeys() {
    'use strict';

    let hotKeys = {};
    $('#hot-keys :input').each((i, input)=>{
        let value = $(input).val().toUpperCase();

        let id = $(input).attr('id');

        if(id !== 'hotkey-save-btn') {
            // todo: we can either store the key's value (e.g. 65 for DOM_VK_A) or we can store the key (e.g. DOM_VK_A)
            // I don't know which one is going to be better in this case.
            hotKeys[id] = 'DOM_VK_' + value;
        }
    });

    return hotKeys;
}

// TODO: this is not a permanent object.  We need to move this into the game loop
var testGame = {
    inputs,
    lemmings : [],
    update: (elapsedTime)=>{
        'use strict';

        _.each(testGame.lemmings, (lemming)=>{
            lemming.update(elapsedTime);
        });

        testGame.inputs.Mouse.update({elapsedTime, lemmings: testGame.lemmings});
    },
    render: (elapsedTime)=>{
        'use strict';

        graphics.clear();

        _.each(testGame.lemmings, (lemming)=>{
            lemming.render();
        });
    },
    init: ()=>{
        'use strict';
        var w = 107;
        var h = 250;
        testGame.lemmings.push( Sprite({
            type: {},
            reverse: false,
            img: images[11],
            center: {x: w + 50, y: h + 50},
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
            type: {},
            reverse: false,
            img: images[10],
            center: {x: w + 20, y: h + 20},
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
            type: {},
            reverse: false,
            img: images[0],
            center: {x: w + 10, y: h + 10},
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
            type: {},
            reverse: false,
            img: images[12],
            center: {x: w + 70, y: h + 70},
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
            type: {},
            reverse: false,
            img: images[13],
            center: {x: w + 30, y: h + 70},
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
page('/settings', ()=>{
    'use strict';
    eMainScreen.slideUp();
    eSettingScreen.slideDown();
    // TODO: need to store the hotkeys in the browser storage
    eSettingScreen.html(settings({hotKeys: ''/* browserr storage*/}));
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
