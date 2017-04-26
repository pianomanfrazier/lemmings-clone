let Papa = require("papaparse");

let level3 = {
    "lemmingGoal": 10,
    "lemmingTypes": {
        "climbing":25,
        "blocking": 4,
        "umbrella": 25,
        "exploding": 4
    },
    "lemmingCount": 25,
    "map": []
};

Papa.parse("/levels/level3.csv", {
    delimiter: ",",
    newline: "\n",
    download: true,
    error: (e)=>{
        'use strict';
        console.log(e);
    },
    complete: (results)=>{
        'use strict';
        level3.map = results.data;
    }
});

module.exports = level3;
