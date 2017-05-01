let Papa = require("papaparse");
let levelConfigs = require("../config.js").levels;

function Level(levelNum, callback) {
    'use strict';
    console.log("load level " + levelNum);
    let level = levelConfigs["level" + levelNum]();
    level.map = [];
    Papa.parse(level.csv, {
        delimiter: ",",
        newline: "\n",
        download: true,
        error: (e)=>{
            console.log(e);
        },
        complete: (results)=>{
            console.log("load level " + levelNum + " complete");
            level.map = results.data;
            callback();
        }
    });
    return level;
}

module.exports = Level; //generator function
