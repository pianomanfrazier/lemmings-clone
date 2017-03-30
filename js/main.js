var page = require("page");
var index = require("./views/index.hbs");
var game = require("./views/game.hbs");
var help = require("./views/help.hbs");
var highscores = require("./views/highscores.hbs");
var about = require("./views/about.hbs");

var eApp = document.getElementById("app");

page('/', ()=>{
    eApp.innerHTML = index({});
});
page('/game', ()=>{
    eApp.innerHTML = game({});
});
page('/about', ()=>{
    eApp.innerHTML = about({title : "about"});
});
page('/help', ()=>{
    eApp.innerHTML = help({title : "help"});
});
page('/highscores', ()=>{
    eApp.innerHTML = highscores({title : "highscores", highscores : [45, 23, 12]});
});

page();
