
let Random = (()=>{
    'use strict';

    let that = {};

    that.nextDouble = ()=>{
        return Math.random();
    };

    that.nextRange = (min, max)=>{
        let range = max - min + 1;

        return Math.floor((Math.random() * range) + min);
    };

    that.nextCircleVector = ()=>{
        let angle = Math.random() * 2 * Math.PI;

        return {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };
    };

    // This is used to give a small performance optimization in generating gaussian random numbers.
    let usePrevious = false,
        y2;

    // Generate a normally distributed random number.
    that.nextGaussian = (mean, stdDev)=>{
        if (usePrevious) {
            usePrevious = false;

            return mean + y2 * stdDev;
        }

        usePrevious = true;

        let x1 = 0,
            x2 = 0,
            y1 = 0,
            z = 0;

        do {
            x1 = 2 * Math.random() - 1;
            x2 = 2 * Math.random() - 1;
            z = (x1 * x1) + (x2 * x2);
        } while (z >= 1);

        z = Math.sqrt((-2 * Math.log(z)) / z);
        y1 = x1 * z;
        y2 = x2 * z;

        return mean + y1 * stdDev;
    };

    return that;
})();

module.exports = Random;
