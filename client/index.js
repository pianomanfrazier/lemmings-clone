////////////////////////////////////////////////
// TODO: split out route functions into Routes.js
//       this way can handle exit /game more effectively with /index callback
//       for now exit /game calls loop.stop()
//       it needs to go back to the main menu
////////////////////////////////////////////////
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

var Lemmings = require("./js/Lemmings.js");
Lemmings.init({user:"Ryan"});

var loop = require("./js/GameLoop.js");

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
