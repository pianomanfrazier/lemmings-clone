let Graphics = require("./Graphics.js");

let Globals = {};

Globals.canvas = document.getElementById('canvas');
Globals.canvas.width = 700;
Globals.canvas.height = 400;

Globals.graphics = Graphics(Globals.canvas);

module.exports = Globals;
