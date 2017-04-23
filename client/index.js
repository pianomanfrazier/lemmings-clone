////////////////////////////////////////////////
// TODO: split out route functions into Routes.js
//       this way can handle exit /game more effectively with /index callback
//       for now exit /game calls loop.stop()
//       it needs to go back to the main menu
////////////////////////////////////////////////
var page                = require("page");

let Routes              = require("./Routes.js");

page('/', ()=>{
    'use strict';
    Routes.index();
});
page('/game', ()=>{
    'use strict';
    Routes.game();
});
page.exit('/game', ()=>{
    'use strict';
    Routes.gameExit();
});
page('/about', ()=>{
    'use strict';
    Routes.about();
});
page('/settings', ()=>{
    'use strict';
    Routes.settings();
});
page('/highscores', ()=>{
    'use strict';
    Routes.highscores();
});

page();
