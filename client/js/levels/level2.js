let Papa = require("papaparse");

let level2 = {
    "lemmingGoal": 10,
    "lemmingTypes": {
        "blocking": 5
    },
    "lemmingCount": 25,
    "map": []
};

Papa.parse("/levels/level2.csv", {
    delimiter: ",",
    newline: "\n",
    download: true,
    error: (e)=>{
        'use strict';
        console.log(e);
    },
    complete: (results)=>{
        'use strict';
        level2.map = results.data;
    }
});

module.exports = level2;
