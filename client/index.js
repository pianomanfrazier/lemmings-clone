var page = require("page");
var $ = require("jquery");
var index = require("./js/views/index.hbs");
var game = require("./js/views/game.hbs");
var help = require("./js/views/help.hbs");
var highscores = require("./js/views/highscores.hbs");
var about = require("./js/views/about.hbs");

var eApp = document.getElementById("app");

page('/', ()=>{
    'use strict';

    eApp.innerHTML = index({});
});
page('/game', ()=>{
    'use strict';

    eApp.innerHTML = game({});
});
page('/about', ()=>{
    'use strict';

    eApp.innerHTML = about({title : "About"});
});
page('/help', ()=>{
    'use strict';

    eApp.innerHTML = help({title : "Help"});
});
page('/highscores', ()=>{
    'use strict';
    eApp.innerHTML = highscores({title : "Highscores"});
    //$.ajax({
    //    type: "POST",
    //    dataType: 'json',
    //    data: {user:"Sponge Bob", score:"2345"},
    //    url: '/api/score',
    //    error: function(e) {
    //        console.log(e);
    //    }
    //}).done(function(data) {
    //    console.log(data);
    //});
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: '/api/highscores',
        error: function(e) {
            console.log(e);
        }
    }).done(function(data) {
        eApp.innerHTML = highscores({title : "Highscores", highscores : data});
        console.log(data);
    }).fail((e)=>{
        eApp.innerHTML = highscores({title : "Highscores", error: "Database connection error"});
        console.log(e);
    });

});

page();
