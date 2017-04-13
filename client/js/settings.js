let storage = (()=>{
    'use strict';

    let that = {};

    that.previousHotKeys = localStorage.getItem('Lemmings.hotKeys');

    if (that.previousHotKeys !== null) {
        that.hotKeys = JSON.parse(that.previousHotKeys);
    }

    that.add = (name, value)=>{
        that.hotKeys[name] = value;
        localStorage['Lemmings.hotKeys'] = JSON.stringify(that.hotKeys);
    };

    that.remove = (key)=>{
        delete that.hotKeys[key];
        localStorage['Lemmings.hotKeys'] = JSON.stringify(that.hotKeys);
    };

    return that;
})();

module.export = {storage};