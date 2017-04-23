let Graphics = require("./Graphics.js");
let Globals = {};

Globals.canvas = document.getElementById('canvas');
Globals.canvas.width = 700;
Globals.canvas.height = 400;

Globals.graphics = Graphics(Globals.canvas);

Globals.hotKeys = [
    {"id":"pause", "default": "P", "value":"A"},
    {"id":"atomicBomb", "default": "A", "value":"B"},
    {"id":"lemmingStop", "default": "S", "value":"C"},
    {"id":"lemmingBomb", "default": "B", "value":"D"},
    {"id":"lemmingUmbrella", "default": "U", "value":"E"},
    {"id":"lemmingClimb", "default": "C", "value":"F"},
    {"id":"fastForward", "default": "F", "value":"G"},
    {"id":"slowDown", "default": "D", "value":"H"}
];

Globals.blockTypes = {
    "grass_cement": 0,
    "cement": 1,
    "grass_dirt": 2,
    "dirt": 3,
    "bones": 4,
    "jewels": 5,
    "flower_yellow": 6,
    "mushroom_red": 7,
    "mushroom_white": 8,
    "flower_white": 9
};

module.exports = Globals;
