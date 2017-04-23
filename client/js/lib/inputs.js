let $           = require("jquery");
let _           = require('lodash');
let Globals     = require('./../Globals');
let Settings    = require('./../settings');
let Graphics    = Globals.graphics;
let cursor      = require('./../config.js').sprites.cursor;
let cursorsImg  = document.getElementById('cursors');
cursorsImg.onload = ()=>{
    'use strict';
    cursor.ready = true;
};


let KeyEvent = null;

let Keyboard = (()=>{
    'use strict';

    let that = {
        keys: {},
        handlers: []
    };

    function keyPress(e) {
        that.keys[e.keyCode] = e.timeStamp;
    }

    function keyRelease(e) {
        delete that.keys[e.keyCode];
    }

    that.registerCommand = (key, handler)=>{
        that.handlers.push({key, handler});
    };

    that.update = (elapsedTime)=>{
        _.each(that.handlers, (handler, index)=>{
            if (that.keys.hasOwnProperty(handler.key)) {
                that.handlers[index].handler(elapsedTime);
            }
        });
    };

    window.addEventListener('keydown', keyPress);
    window.addEventListener('keyup', keyRelease);

    return that;
})();

let Mouse = (()=>{
    'use strict';

    //this toggles the cursor 0 is cross hairs, 1 is box, updated in onHover handler
    let cursorNum = 0;
    let that = {
        clicks: [],
        lemmingTypeSelected: '',
        position: {x:0, y:0}
    };

    function getMousePos(e) {
        let rect = Globals.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    function clickDown(e) {
    }

    function clickUp(e) {
        let location = getMousePos(e);
        let lemmingTypeSelected = that.lemmingTypeSelected;
        that.clicks.push({location, lemmingTypeSelected, timeStamp: e.timeStamp});
        //pop the click when it has been processed
    }

    function onHover(e) {
        //update the position of the mouse
        that.position = getMousePos(e);
    }
    //this is called in gameModel.render()
    that.draw = ()=>{
        //cursorNum should be 0 or 1
        if(cursorNum !== 1 && cursorNum !== 0) {
            console.log("invalid cursor type");
        }
        //draw the appropriate cursor at mouse position
        if(cursor.ready) {
            let scaledWidth = cursor.width * cursor.scaleFactor;
            let scaledHeight = cursor.height * cursor.scaleFactor;
            Graphics.drawSprite({
                center: that.position,
                image: cursorsImg,
                sx: cursor.width * cursorNum,
                sy: 0,
                sw: cursor.width,
                sh: cursor.height,
                dx: that.position.x - scaledWidth/2,
                dy: that.position.y - scaledHeight/2,
                dw: scaledWidth,
                dh: scaledHeight
            });
        }
    };

    let activeLemming = null; //the lemming which is being hovered over
    that.update = (spec)=>{
        let found = false;
        _.each(spec.lemmings, (lemming)=>{
            let left   = lemming.center.x - (lemming.width >> 1);
            let right  = lemming.center.x + (lemming.width >> 1);
            let top    = lemming.center.y - (lemming.height >> 1);
            let bottom = lemming.center.y + (lemming.height >> 1);

            if(that.position.x > left && that.position.x < right &&
                that.position.y > top && that.position.y < bottom) {
                    activeLemming = lemming;
                    cursorNum = 1;
                    found = true;
            }
        });
        //no lemming is being hovered
        if(!found){
            activeLemming = null;
            cursorNum = 0;
        }
        _.each(that.clicks, (click)=>{
            if(activeLemming !== null) {
                console.log("clicked " + activeLemming.type + " lemming");
                console.log(that.lemmingTypeSelected);
                //this is for testing, should be done in the game model
                if (that.lemmingTypeSelected !== "") {
                    activeLemming.type = that.lemmingTypeSelected;
                }
                //if(that.lemmingTypeSelected !== '' && !_.has(lemming.possibleActions, that.lemmingTypeSelected)) {
                //    //lemming.possibleActions.push(that.lemmingTypeSelected);
                //    //that.center = spec.center;
                //    //decrement from the game model the lemmingTypeSelected
                //    //console.log('click: ' + that.lemmingTypeSelected);
                //}
            }
            _.remove(that.clicks, (el)=>{
                return el === click;
            });
        });
    };

    that.updateLemmingType = (type)=>{
        that.lemmingTypeSelected = (that.lemmingTypeSelected === '' || that.lemmingTypeSelected !== type) ? type : '';
        if(that.lemmingTypeSelected !== '') {
            that.lemmingTypeSelected = that.lemmingTypeSelected.slice(8);
        }
    };

    Globals.canvas.addEventListener('mousedown', clickDown);
    Globals.canvas.addEventListener('mouseup', clickUp);
    Globals.canvas.addEventListener('mousemove', onHover);

    return that;
})();

let ButtonPress = (id, obj)=>{
    'use strict';

    switch(id) {
        case 'pause-btn':
            // TODO: call game's stop function
            console.log('game state pressed: ' + id);
            break;
        case 'hotkey-save':
            console.log("save pressed");
            let hotKeys = getHotKeys();

            let isDuplicate = false;
            _.each(hotKeys, (keyi, i)=>{
                _.each(hotKeys, (keyj, j)=>{
                    if(i !== j && keyi.value === keyj.value) {
                        isDuplicate = true;
                        // TODO: need to figure out why this isn't working
                        $('#error-message').addClass('active');
                        $('#' + keyi.id).addClass('error');
                        $('#' + keyj.id).addClass('error');

                    }

                    if(!isDuplicate) {
                        $('#' + keyi.id).removeClass('error');
                        $('#' + keyj.id).removeClass('error');
                    }
                });
            });

            if(!isDuplicate) {
                $('#error-message').removeClass('active');
                $('#save-message').addClass('active');
                Settings.storage.add('hotKeys', hotKeys);
            }
            break;

        case 'speed-up-btn':
        case 'speed-down-btn':
        case 'atomic-bomb-btn':
            console.log('game state pressed: ' + id);
            break;

        case 'lemming-pickaxe':
        case 'lemming-digging':
        case 'lemming-bashing':
        case 'lemming-builder':
        case 'lemming-blocking':
        case 'lemming-exploding':
        case 'lemming-umbrella':
        case 'lemming-climbing':
            $('#control-panel :button').each((i, button)=>{
                $(button).removeClass("active");
            });

            $('#' + id + '-btn').addClass('active');

            Mouse.updateLemmingType(id);
            console.log('pressed: ' + id);
            break;

        case 'btn3':
            console.log('misc. pressed: ' + id);
            break;

        default:
    }
};

let getHotKeys = ()=>{
    'use strict';

    let hotKeys = [];
    $('#hot-keys :input').each((i, input)=>{
        let id = $(input).attr('id');

        if(id !== 'hotkey-save-btn') {
            let value       = $(input).val().toUpperCase();
            let myDefault   = Globals.hotKeys[i].default;

            // check for empty values
            value = (!_.isEmpty(value)) ? value : myDefault;

            hotKeys.push({id, default: myDefault, value});
        }
    });

    return hotKeys;
};

//------------------------------------------------------------------
//
// Source: http://stackoverflow.com/questions/1465374/javascript-event-keycode-constants
//
//------------------------------------------------------------------
if (KeyEvent === null) {
    KeyEvent = {
        DOM_VK_CANCEL: 3,
        DOM_VK_HELP: 6,
        DOM_VK_BACK_SPACE: 8,
        DOM_VK_TAB: 9,
        DOM_VK_CLEAR: 12,
        DOM_VK_RETURN: 13,
        DOM_VK_ENTER: 14,
        DOM_VK_SHIFT: 16,
        DOM_VK_CONTROL: 17,
        DOM_VK_ALT: 18,
        DOM_VK_PAUSE: 19,
        DOM_VK_CAPS_LOCK: 20,
        DOM_VK_ESCAPE: 27,
        DOM_VK_SPACE: 32,
        DOM_VK_PAGE_UP: 33,
        DOM_VK_PAGE_DOWN: 34,
        DOM_VK_END: 35,
        DOM_VK_HOME: 36,
        DOM_VK_LEFT: 37,
        DOM_VK_UP: 38,
        DOM_VK_RIGHT: 39,
        DOM_VK_DOWN: 40,
        DOM_VK_PRINTSCREEN: 44,
        DOM_VK_INSERT: 45,
        DOM_VK_DELETE: 46,
        DOM_VK_0: 48,
        DOM_VK_1: 49,
        DOM_VK_2: 50,
        DOM_VK_3: 51,
        DOM_VK_4: 52,
        DOM_VK_5: 53,
        DOM_VK_6: 54,
        DOM_VK_7: 55,
        DOM_VK_8: 56,
        DOM_VK_9: 57,
        DOM_VK_SEMICOLON: 59,
        DOM_VK_EQUALS: 61,
        DOM_VK_A: 65,
        DOM_VK_B: 66,
        DOM_VK_C: 67,
        DOM_VK_D: 68,
        DOM_VK_E: 69,
        DOM_VK_F: 70,
        DOM_VK_G: 71,
        DOM_VK_H: 72,
        DOM_VK_I: 73,
        DOM_VK_J: 74,
        DOM_VK_K: 75,
        DOM_VK_L: 76,
        DOM_VK_M: 77,
        DOM_VK_N: 78,
        DOM_VK_O: 79,
        DOM_VK_P: 80,
        DOM_VK_Q: 81,
        DOM_VK_R: 82,
        DOM_VK_S: 83,
        DOM_VK_T: 84,
        DOM_VK_U: 85,
        DOM_VK_V: 86,
        DOM_VK_W: 87,
        DOM_VK_X: 88,
        DOM_VK_Y: 89,
        DOM_VK_Z: 90,
        DOM_VK_CONTEXT_MENU: 93,
        DOM_VK_NUMPAD0: 96,
        DOM_VK_NUMPAD1: 97,
        DOM_VK_NUMPAD2: 98,
        DOM_VK_NUMPAD3: 99,
        DOM_VK_NUMPAD4: 100,
        DOM_VK_NUMPAD5: 101,
        DOM_VK_NUMPAD6: 102,
        DOM_VK_NUMPAD7: 103,
        DOM_VK_NUMPAD8: 104,
        DOM_VK_NUMPAD9: 105,
        DOM_VK_MULTIPLY: 106,
        DOM_VK_ADD: 107,
        DOM_VK_SEPARATOR: 108,
        DOM_VK_SUBTRACT: 109,
        DOM_VK_DECIMAL: 110,
        DOM_VK_DIVIDE: 111,
        DOM_VK_F1: 112,
        DOM_VK_F2: 113,
        DOM_VK_F3: 114,
        DOM_VK_F4: 115,
        DOM_VK_F5: 116,
        DOM_VK_F6: 117,
        DOM_VK_F7: 118,
        DOM_VK_F8: 119,
        DOM_VK_F9: 120,
        DOM_VK_F10: 121,
        DOM_VK_F11: 122,
        DOM_VK_F12: 123,
        DOM_VK_F13: 124,
        DOM_VK_F14: 125,
        DOM_VK_F15: 126,
        DOM_VK_F16: 127,
        DOM_VK_F17: 128,
        DOM_VK_F18: 129,
        DOM_VK_F19: 130,
        DOM_VK_F20: 131,
        DOM_VK_F21: 132,
        DOM_VK_F22: 133,
        DOM_VK_F23: 134,
        DOM_VK_F24: 135,
        DOM_VK_NUM_LOCK: 144,
        DOM_VK_SCROLL_LOCK: 145,
        DOM_VK_COMMA: 188,
        DOM_VK_PERIOD: 190,
        DOM_VK_SLASH: 191,
        DOM_VK_BACK_QUOTE: 192,
        DOM_VK_OPEN_BRACKET: 219,
        DOM_VK_BACK_SLASH: 220,
        DOM_VK_CLOSE_BRACKET: 221,
        DOM_VK_QUOTE: 222,
        DOM_VK_META: 224
    };
}

module.exports = {KeyEvent, Keyboard, Mouse, ButtonPress, getHotKeys};
