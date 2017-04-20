let Graphics = require("./Graphics.js");
let $ = require("jquery");
let _ = require("lodash");
let spriteConfig = require("./config.js").sprites;
let Sprite = require("./Sprite.js");

let Globals = {};

Globals.canvas = document.getElementById('canvas');
Globals.canvas.width = 700;
Globals.canvas.height = 400;
<<<<<<< HEAD

//this will need to be loaded from the current level
let startPosition = {x: 100, y: 100};

Globals.graphics = Graphics(Globals.canvas);

=======

Globals.graphics = Graphics(Globals.canvas);

Globals.hotKeys = [
    {"id":"pause", "value":"A"},
    {"id":"atomicBomb", "value":"B"},
    {"id":"lemmingStop", "value":"C"},
    {"id":"lemmingBomb", "value":"D"},
    {"id":"lemmingUmbrella", "value":"E"},
    {"id":"lemmingClimb", "value":"F"},
    {"id":"fastForward", "value":"G"},
    {"id":"slowDown", "value":"H"}
];
>>>>>>> master

module.exports = Globals;
