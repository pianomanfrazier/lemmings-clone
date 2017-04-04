var page = require("page");
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

    eApp.innerHTML = about({title : "about"});
});
page('/help', ()=>{
    'use strict';

    eApp.innerHTML = help({title : "help"});
});
page('/highscores', ()=>{
    'use strict';

    eApp.innerHTML = highscores({title : "highscores", highscores : [45, 23, 12, 9, 6, 3]});
});

page();
