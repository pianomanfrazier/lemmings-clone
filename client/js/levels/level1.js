let Papa = require("papaparse");

let level1 = {
    "lemmingGoal": 10,
    "lemmingTypes": {
        "climbing": 10,
        "umbrella": 10
    },
    "map": []
};

Papa.parse("/levels/level1.csv", {
    delimiter: ",",
    newline: "\n",
    download: true,
    error: (e)=>{
        'use strict';
        console.log(e);
    },
    complete: (results)=>{
        'use strict';
        level1.map = results.data;
    }
});

module.exports = level1;
