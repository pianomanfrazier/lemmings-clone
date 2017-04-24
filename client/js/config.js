let config = {};
let sprites = {};

//sprite sheet params, height width, image names
sprites.ANIMATION_SPEED = 100;
sprites.SCALE_FACTOR = 0.3;
sprites.cursor = {
    width: 50,
    height: 50,
    frames: 2,
    ready: false,
    scaleFactor: sprites.SCALE_FACTOR * 1.3
};
sprites.walking = {
    width: 50,
    height: 50,
    frames: 8
};
sprites.falling = {
    width: 50,
    height: 50,
    frames: 4
};
sprites.blocking = {
    width: 50,
    height: 50,
    frames: 16
};
sprites.umbrella = {
    width: 85,
    height: 85,
    frames: 5
};
sprites.exploding = {
    width: 50,
    height: 50,
    frames: 14
};
sprites.climbing = {
    width: 55,
    height: 55,
    frames: 7
};
//need a climb over ridge animation, frames 8-16 on climber sprite sheet
sprites.climb_over = {
    width: 55,
    height: 55,
    frames: 9
};
sprites.builder = {
    width: 64,
    height: 64,
    frames: 16
};
sprites.splatting = {
    width: 80,
    height: 50,
    frames: 16
};
sprites.drowning = {
    width: 50,
    height: 50,
    frames: 16
};
sprites.digging = {
    width: 64,
    height: 64,
    frames: 16,
    speed: 150
};
sprites.timeup = {
    width: 50,
    height: 50,
    frames: 16
};

// ***** traps *****
sprites.trap_10tons = {
    width: 192,
    height: 250,
    frames: 12
};
sprites.trap_hanging = {
    width: 107,
    height: 250,
    frames: 34
};

// ***** gates end/start *****
sprites.entranceGate = {
    width: 100,
    height: 70,
    scaleFactor: 0.6,
    frames: 10
};
sprites.exitGate = {
    width: 100,
    height: 70,
    frames: 6,
    scaleFactor: 0.8,
    ready: false
};

// ***** blocks *****
sprites.block = {
    width: 25,
    height: 25,
    ready: false
};

config.sprites = sprites;

module.exports = config;
