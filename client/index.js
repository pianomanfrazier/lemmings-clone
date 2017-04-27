var page                = require("page");
let Routes              = require("./Routes.js");

page('/', Routes.index);
page('/chooselevel', Routes.chooseLevel);
page('/game/:levelNum', Routes.game);
page.exit('/game/:levelNum', Routes.gameExit);
page('/about', Routes.about);
page('/settings', Routes.settings);
page('/highscores', Routes.highscores);

page();
