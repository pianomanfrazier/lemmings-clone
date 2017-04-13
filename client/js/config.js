let config = {};
let sprites = {};

//sprite sheet params, height width, image names
sprites.ANIMATION_SPEED = 200;
sprites.SCALE_FACTOR = 0.3;
sprites.walking = {
    width: 50,
    height: 50,
    frames: 8
};
sprites.blocking = {
    width: 50,
    height: 50,
    frames: 16
};
sprites.umbrella = {
    width: 85,
    height: 85,
    frames: 12
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
sprites.builder = {
    width: 64,
    height: 64,
    frames: 16
};
//need a climb over ridge animation, frames 8-16 on climber sprite sheet
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
sprites.entrance_gate = {
    width: 100,
    height: 70,
    frames: 10
};
sprites.end_gate = {
    width: 100,
    height: 70,
    frames: 6,
    scaleFactor: 0.8
};

config.sprites = sprites;

module.exports = config;
