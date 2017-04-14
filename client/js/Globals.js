let Graphics = require("./Graphics.js");
let $ = require("jquery");
let _ = require("lodash");
let spriteConfig = require("./config.js").sprites;
let Sprite = require("./Sprite.js");

let Globals = {};

Globals.canvas = document.getElementById('canvas');
Globals.canvas.width = 700;
Globals.canvas.height = 400;

//this will need to be loaded from the current level
let startPosition = {x: 100, y: 100};

Globals.graphics = Graphics(Globals.canvas);


module.exports = Globals;
