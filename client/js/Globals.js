let Graphics = require("./Graphics.js");

let Globals = {};

Globals.canvas = document.getElementById('canvas');
Globals.canvas.width = 1000;
Globals.canvas.height = 1000;

Globals.graphics = Graphics(Globals.canvas);

module.exports = Globals;
