let $ = require("jquery");

let Lemmings = {};

Lemmings.lemmings = []; //store all lemmings here
//Lemmings.world = World(spec); //generate a level according to specs
//need to detect collisions between lemmings and world objects
Lemmings.score = 0;
Lemmings.user = "";

Lemmings.init = function(spec) {
    'use strict';
    Lemmings.user = spec.user;
    //load level
    //load all sprite sheets
    //reset variables
};
//ajax call to server
//POST to /api/score --> {user : "name", score : 1234}
Lemmings.storeScore = function() {
    'use strict';
    $.ajax({
        type: "POST",
        dataType: 'json',
        data: {user: Lemmings.user, score: Lemmings.score},
        url: '/api/score',
        error: function(e) {
            console.log(e);
        }
    }).done(function(data) {
        console.log(data);
    });
};
Lemmings.update = function(elapsedTime) {
    'use strict';
    for(var i = 0; i < Lemmings.lemmings.length; i++) {
        Lemmings.lemmings[i].update(elapsedTime);
    }
    //Lemmings.world.update(elapsedTime);
};
Lemmings.render = function() {
    'use strict';
    for(var i = 0; i < Lemmings.lemmings.length; i++) {
        Lemmings.lemmings[i].render();
    }
    //Lemmings.world.render();
};

module.exports = Lemmings;
