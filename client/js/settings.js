let storage = (()=>{
    'use strict';

    let that = {};

    that.previousHotKeys = localStorage.getItem('Lemmings.hotKeys');

    if (that.previousHotKeys !== null) {
        that.hotKeys = JSON.parse(that.previousHotKeys);
    }

    that.retrieve = (name)=>{
        return JSON.parse(localStorage.getItem('Lemmings.' + name));
    };

    that.add = (name, value)=>{
        switch(name) {
            case 'hotKeys':
                localStorage['Lemmings.hotKeys'] = JSON.stringify(value);
                break;
            default:
        }
    };

    // that.remove = (name, key)=>{
    //     delete that.hotKeys[key];
    //     localStorage['Lemmings.hotKeys'] = JSON.stringify(that.hotKeys);
    // };

    return that;
})();

module.exports = {storage};
