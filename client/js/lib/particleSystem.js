var _           = require('lodash');
var Random      = require('./randomGenerator');
let Globals     = require("./../Globals.js");
let Graphics    = require("./../Graphics.js");
let graphics    = Graphics(Globals.canvas);
let image       = document.getElementById('snowflake');

let isReady = false;
image.onload = ()=>{
    'use strict';

    isReady = true;
};


let ParticleSystem = (spec)=>{
    'use strict';

    let that = {},
        particles = [];	// Set of all active particles

    that.create = ()=>{
        let particle = {
            image: spec.image,
            size: Random.nextGaussian(10, 4),
            center: {x: Random.nextRange(0, Globals.canvas.width), y: spec.center.y},
            direction: { x: 0, y: 1 },
            speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev), // pixels per second
            rotation: 0,
            lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev),	// How long the particle should live, in seconds
            alive: 0	// How long the particle has been alive, in seconds
        };

        // Ensure we have a valid size - gaussian numbers can be negative
        particle.size = Math.max(1, particle.size);

        // Same thing with lifetime
        particle.lifetime = Math.max(0.01, particle.lifetime);

        // Assign a unique name to each particle
        particles.push(particle);
    };

    that.update = (elapsedTime)=>{

        // We work with time in seconds, elapsedTime comes in as milliseconds
        elapsedTime = elapsedTime / 1000;

        _.each(particles, (particle, i)=>{
            if(particle) {
                // Update how long it has been alive
                particle.alive += elapsedTime;

                // Update its position
                particle.center.x += (elapsedTime * particle.speed * particle.direction.x);
                particle.center.y += (elapsedTime * particle.speed * particle.direction.y);

                // Rotate proportional to its speed
                particle.rotation += particle.speed / 500;

                // If the lifetime has expired, identify it for removal
                if (particle.alive > particle.lifetime) {
                    particles.splice(i,1);
                }
            }
        });
    };

    that.draw = ()=>{
        if(isReady) {
            that.draw = ()=>{
                _.each(particles, (particle)=>{
                    graphics.DrawTextures(particle);
                });
            };
        }
    };

    return that;
}


let CreateEffectSnow = ()=>{
    'use strict';

    var that = {},
        createSnowDelta = 100,	// Time between creating particles (in milliseconds)
        lastSnowElapsed = createSnowDelta;	// How long since the last particle was created

    that.particleSys = ParticleSystem({
        image,
        center: {x: Random.nextDouble(), y: 0 },
        speed: {mean: 40, stdev: 20},
        lifetime: {mean: 10, stdev: 5}
    });

    that.update = (elapsedTime)=>{
        lastSnowElapsed += elapsedTime;

        while (lastSnowElapsed >= createSnowDelta) {
            // Create a new snowflake particle
            that.particleSys.create();

            // Subtract out the create particle delta so we still have any extra elapsed
            // time accounted for.
            lastSnowElapsed -= createSnowDelta;
        }
    };

    return that;
};

module.exports = {CreateEffectSnow, ParticleSystem};