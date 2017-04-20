let Graphics = require("./Graphics.js");
let Globals = {};

Globals.canvas = document.getElementById('canvas');
Globals.canvas.width = 700;
Globals.canvas.height = 400;

Globals.graphics = Graphics(Globals.canvas);

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

module.exports = Globals;
