
function ParticleSystem(spec, graphics) {
    'use strict';

    let that = {},
        particles = [],	// Set of all active particles
        imageSrc = spec.image;

    spec.image = new Image();
    spec.image.onload = ()=>{

        that.draw = ()=>{
            _.each(particles, (particle)=>{
                graphics.DrawTextures(particle);
            });
        };
    };

    spec.image.src = imageSrc;

    that.create = ()=>{
        let particle = {
            image: spec.image,
            size: Random.nextGaussian(10, 4),
            center: {x: spec.center.x, y: spec.center.y},
            direction: Random.nextCircleVector(),
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

    that.draw = ()=>{};

    return that;
}
