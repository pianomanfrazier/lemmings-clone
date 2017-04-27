var $                   = require("jquery");
var _                   = require("lodash");
var page                = require("page");

var settings            = require("./js/settings");
var index               = require("./js/views/index.hbs");
var highscores          = require("./js/views/highscores.hbs");
var settingsPG          = require("./js/views/settings.hbs");

var eApp = document.getElementById("app");
//create the app
eApp.innerHTML          = index({});
var eMainScreen         = $("#MainScreen");
var eGameScreen         = $("#GameScreen");
var eAboutScreen        = $("#AboutScreen");
var eSettingScreen      = $("#SettingsScreen");
var eHighScoresScreen   = $("#HighScoresScreen");

var screens             = [eGameScreen, eAboutScreen, eSettingScreen, eHighScoresScreen];

var Lemmings            = require("./js/Lemmings.js");
var loop                = require("./js/GameLoop.js");
var Globals             = require("./js/Globals.js");
/////////////////////////////////////////////////////////
//                INIT THE INPUTS
/////////////////////////////////////////////////////////
let inputs              = require("./js/lib/inputs.js");

//the document is ready because this is called after all elements
//are injected to the page
//should use JQuery.on() to dynamically bind events
//see http://stackoverflow.com/questions/6658752/click-event-doesnt-work-on-dynamically-generated-elements
$(document).on('click','#hotkey-save-btn', ()=>{
    'use strict';
    inputs.ButtonPress({type:'hotkey-save'});
});

//not sure why this works and the other doesn't
$('#control-panel :button').each((i, button)=>{
    'use strict';

    let regex =/lemming-(\w{0,})/;
    let match = regex.exec(button.id);
    let typeId = (match) ? match[0] : button.id;
    let typeCap = (match) ? match[1] : null;

    if(typeCap) {
        Globals.controlPanel[typeCap] = button;
    }

    let obj = (typeId === 'speed-up-btn' || typeId === 'speed-down-btn') ? {type: typeId, mouse: Lemmings.mouse, speed: Lemmings.speed} : {type: typeId, mouse: Lemmings.mouse};

    $(button).click(()=>{
        inputs.ButtonPress(obj);
    });
});
/////////////////////////////////////////////////////////

//Handle exiting the game
$("#exit-game").click(()=>{
    'use strict';
    if(window.confirm("Do you want to exit the game?")){
        page.redirect("/");
    }
});

let Routes = {};

Routes.index = (callback)=>{
    'use strict';
    _.each(screens, (screen)=>{
        screen.slideUp();
    });
    eMainScreen.slideDown();
    loop.stop();

    let hotKeys = settings.storage.retrieve('hotKeys');
    if(hotKeys === null || hotKeys === []) {
        settings.storage.add('hotKeys', Globals.hotKeys);
    }
};
function getLevel() {
    'use strict';
    let levelNum = window.prompt("Pick a level 1,2, or 3", "1");
    if (levelNum === null) {
        return -1;
    }
    levelNum = parseInt(levelNum);
    if(levelNum < 1 || levelNum > 3 || isNaN(levelNum) ) {
        window.alert("invalid level");
        return getLevel();
    }
    return levelNum;
}
Routes.game = ()=>{
    'use strict';
    let levelNum = getLevel();
    if (levelNum === -1) {
        page.redirect("/");
    } else {
        eMainScreen.slideUp();
        eGameScreen.slideDown();

    Lemmings.init(levelNum);
        settings.storage.hotKeysUpdate = true;
        loop.run(Lemmings);
    }
};
Routes.gameExit = ()=>{
    'use strict';
    loop.stop();
    Routes.index();
};
Routes.about = ()=>{
    'use strict';
    eMainScreen.slideUp();
    eAboutScreen.slideDown();
};
Routes.settings = ()=>{
    'use strict';
    eMainScreen.slideUp();
    eSettingScreen.slideDown();
    let keys = settings.storage.retrieve('hotKeys');
    eSettingScreen.html(settingsPG({hotKeys: keys}));
};
Routes.highscores = ()=>{
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
};


module.exports = Routes;
