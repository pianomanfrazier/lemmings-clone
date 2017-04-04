// this creates a graphics object specific to a canvas element passed in
//////////////////////////////////////////////
// API call
//////////////////////////////////////////////
//Game.canvas = document.getElementById('canvas');
//Game.context = canvas.getContext('2d');
//Game.canvas.width = 1000;
//Game.canvas.height = 1000;
//Game.boardGraphics = Graphics(canvas)
//////////////////////////////////////////////
// TODO:
//      need a way to render sprites
//      sprite.render()
//      sprite.update(elapsedTime)
//
//      Game.sprite = Sprite({
//          img: spriteSheetImg,
//          startX: x, //top left corner of sprite
//          startY: y,
//          numFrames: n,
//          frameNumber: 0, //starts out as zero but will change as it gets updated
//          frameWidth: w,
//          frameHeight: h,
//          spacer: w, //sprite sheets have a spacer between sprites
//          animationRate: s
//       })
//
//////////////////////////////////////////////

var Graphics = function(canvas) {
    'use strict';

    let context = canvas.getContext('2d');

	  CanvasRenderingContext2D.prototype.clear = function() {
		    this.save();
		    this.setTransform(1, 0, 0, 1, 0, 0);
		    this.clearRect(0, 0, canvas.width, canvas.height);
		    this.restore();
	  };

	  function clear() {
		    context.clear();
	  }
    function drawText(spec) {
        context.save();

        context.font = spec.font;
        context.fillStyle = spec.fill;
        context.fillText(spec.text, spec.x, spec.y);

        context.restore();
    }
	  function drawImage(spec) {
		    context.save();

		    context.translate(spec.center.x, spec.center.y);
        if (spec.rotation) {
            context.rotate(spec.rotation);
        }
		    context.translate(-spec.center.x, -spec.center.y);

		    context.drawImage(
			      spec.image,
			      spec.center.x - spec.size/2,
			      spec.center.y - spec.size/2,
			      spec.size, spec.size
        );

		    context.restore();
	  }
    // see http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
    // context.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
    // sx source x = startX + (frameWidth + spacer) * frameNumber
    // sy source y = startY
    // sw = frameWidth
    // sh = frameHeight
    // dx = destination x (ie the location to be drawn on canvas, top left corner)
    // dy = destination y 
    // dw = destination w
    // dh = destination h
	  function drawSprite(spec) {
		    context.save();

		    context.translate(spec.center.x, spec.center.y);
        if (spec.rotation) {
            context.rotate(spec.rotation);
        }
		    context.translate(-spec.center.x, -spec.center.y);

		    context.drawImage(
			      spec.img,
            spec.sx,
            spec.sy,
            spec.sw,
            spec.sh,
            spec.dx,
            spec.dy,
            spec.dw,
            spec.dh
        );

		    context.restore();
	  }
    function drawRect(spec) {
        context.save();
		    context.translate(spec.position.x + spec.width / 2, spec.position.y + spec.height / 2);
		    if(spec.rotation) context.rotate(spec.rotation);
		    context.translate(-(spec.position.x + spec.width / 2), -(spec.position.y + spec.height / 2));
        // Create gradient
		    context.fillStyle = spec.fill;
		    context.fillRect(spec.position.x, spec.position.y, spec.width, spec.height);

		    context.strokeStyle = spec.stroke;
		    context.strokeRect(spec.position.x, spec.position.y, spec.width, spec.height);

		    context.restore();
    }
    function drawCircle(spec) {
        let w = spec.width;
        let h = spec.height;
        let x = spec.position.x * w;
        let y = spec.position.y * h;
        context.save();
        context.beginPath();
        context.fillStyle = spec.fill;
        context.arc(x + h/2, y + w/2, w/2 -10 , 0, 2 * Math.PI, false);
        context.fill();
        context.lineWidth = spec.lineWidth;
        context.strokeStyle = spec.stroke;
        context.stroke();
        context.restore();
    }
	  return {
		    clear,
		    drawImage,
        drawRect,
        drawText,
        drawCircle,
        drawSprite
	  };
};

module.exports = Graphics; //returns a generator function Graphics(canvas)
