let config = {};
let sprites = {};

//sprite sheet params, height width, image names
sprites.ANIMATION_SPEED = 60;
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
sprites.exit = {
    width: 50,
    height: 50,
    frames: 8
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

sprites.waves = {
    width: 25,
    height: 25,
    frames: 6,
    scaleFactor: 1
};

sprites.blockTypes = {
    "grass_cement": 0,
    "cement": 1,
    "grass_dirt": 2,
    "dirt": 3,
    "bones": 4,
    "jewels": 5,
    "flower_yellow": 6,
    "mushroom_red": 7,
    "mushroom_white": 8,
    "flower_white": 9,
    "water" : 10
};

config.sprites = sprites;

let levels = {};

levels.level1 = {
    "lemmingGoal": 10,
    "lemmingTypes": {
        "climbing": 10,
        "umbrella": 10
    },
    "lemmingCount": 10,
    "csv": "/levels/level1.csv",
    "music": "/music/dizzy_spells.mp3"
};

levels.level2 = {
    "lemmingGoal": 10,
    "lemmingTypes": {
        "blocking": 5
    },
    "lemmingCount": 25,
    "csv": "/levels/level2.csv",
    "music": "/music/underclocked.mp3"
};
levels.level3 = {
    "lemmingGoal": 15,
    "lemmingTypes": {
        "climbing":25,
        "blocking": 4,
        "umbrella": 25,
        "exploding": 4
    },
    "lemmingCount": 25,
    "csv": "/levels/level3.csv",
    "music": "/music/jumpshot.mp3"
};

config.levels = levels;

module.exports = config;
