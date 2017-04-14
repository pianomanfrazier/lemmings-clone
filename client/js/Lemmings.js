////////////////////////////////////////////////
// TODO: load images at runtime not on page load, remove from index.hbs
////////////////////////////////////////////////
let $ = require("jquery");
let _ = require("lodash");

let Lemmings = {};

Lemmings.lemmings = []; //store all lemmings here
//Lemmings.world = World(spec); //generate a level according to specs
//need to detect collisions between lemmings and world objects
Lemmings.score = 0;
Lemmings.user = "";

Lemmings.init = ()=>{
    'use strict';
    //load level
    //load all sprite sheets
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
