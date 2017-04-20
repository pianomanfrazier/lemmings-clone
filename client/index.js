////////////////////////////////////////////////
// TODO: split out route functions into Routes.js
//       this way can handle exit /game more effectively with /index callback
//       for now exit /game calls loop.stop()
//       it needs to go back to the main menu
////////////////////////////////////////////////
var page                = require("page");
var $                   = require("jquery");
var _                   = require("lodash");
var settings            = require("./js/settings");
var index               = require("./js/views/index.hbs");
var highscores          = require("./js/views/highscores.hbs");
var settingsPG          = require("./js/views/settings.hbs");

var eApp = document.getElementById("app");
eApp.innerHTML          = index({});
var eMainScreen         = $("#MainScreen");
var eGameScreen         = $("#GameScreen");
var eAboutScreen        = $("#AboutScreen");
var eHelpScreen         = $("#HelpScreen");
var eSettingScreen      = $("#SettingsScreen");
var eHighScoresScreen   = $("#HighScoresScreen");

var screens             = [eGameScreen, eAboutScreen, eSettingScreen, eHelpScreen, eHighScoresScreen];

var Lemmings            = require("./js/Lemmings.js");
var inputs      = require("./js/lib/inputs");
var loop                = require("./js/GameLoop.js");
var Globals             = require("./js/Globals.js");
let inputs              = require("./js/lib/inputs.js");

//the document is ready because this is called after all elements
//are injected to the page
//should us JQuery.on() to dynamically bind events
//see http://stackoverflow.com/questions/6658752/click-event-doesnt-work-on-dynamically-generated-elements
$(document).on('click','#hotkey-save-btn', ()=>{
    'use strict';
    inputs.ButtonPress('hotkey-save');
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

page('/', ()=>{
    'use strict';

    _.each(screens, (screen)=>{
        screen.slideUp();
    });
    eMainScreen.slideDown();

    let hotKeys = settings.storage.retrieve('hotKeys');
    if(hotKeys === null || hotKeys === []) {
        settings.storage.add('hotKeys', Globals.hotKeys);
    }

});
page('/game', ()=>{
    'use strict';
    eMainScreen.slideUp();
    eGameScreen.slideDown();

    Lemmings.init({user:"Ryan"});
    settings.storage.hotKeysUpdate = true;
    loop.run(Lemmings);
});
page.exit('/game', ()=>{
    'use strict';
    loop.stop();
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
    let keys = settings.storage.retrieve('hotKeys');
    eSettingScreen.html(settingsPG({hotKeys: keys}));
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
