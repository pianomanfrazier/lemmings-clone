////////////////////////////////////////////////
// TODO: load images at runtime not on page load, remove from index.hbs
////////////////////////////////////////////////
let $ = require("jquery");
let _ = require("lodash");
let GenerateLemming = require("./Lemming.js");

let Lemmings = {};

Lemmings.lemmings = []; //store all lemmings here
//Lemmings.world = World(spec); //generate a level according to specs
//need to detect collisions between lemmings and world objects
Lemmings.score = 0;
Lemmings.lemmingCount = 25;
Lemmings.user = "";

Lemmings.init = ()=>{
    'use strict';
    //load level
    //load all sprite sheets
    //some sample Lemmings for testing
    for(var i = 0; i < Lemmings.lemmingCount; i++) {
        Lemmings.lemmings.push(GenerateLemming());
        Lemmings.lemmings[i].center = {x: 100 + 10*i, y: 100};
    }
    //you can dynamically change the type of lemming displayed
    //based on the type the lemming will move up/down/left/right
    Lemmings.lemmings[3].type = "walking";
    Lemmings.lemmings[4].type = "umbrella";
    Lemmings.lemmings[5].type = "exploding";
    Lemmings.lemmings[6].type = "climbing";
    //reset variables
    //get all the images
};
//ajax call to server
//POST to /api/score --> {user : "name", score : 1234}
Lemmings.storeScore = ()=>{
    'use strict';
    $.ajax({
        type: "POST",
        dataType: 'json',
        data: {user: Lemmings.user, score: Lemmings.score},
        url: '/api/score',
        error: (e)=>{
            console.log(e);
        }
    }).done( (data)=>{
        console.log(data);
    });
};
Lemmings.update = (elapsedTime)=>{
    'use strict';
    _.each(Lemmings.lemmings, (lemming)=>{
        lemming.update(elapsedTime);
    });
    //Lemmings.world.update(elapsedTime);
};
Lemmings.render = ()=>{
    'use strict';
    _.each(Lemmings.lemmings, (lemming)=>{
        lemming.render();
    });
    //Lemmings.world.render();
};

module.exports = Lemmings;
