var mongoose = require('mongoose');

var scoreSchema = mongoose.Schema({
    time : {
        type: String, //min:sec string
        required: true
    },
    percent : {
        type: Number,
        required: true
    },
    level : {
        type : Number,
        required: true
    },
    user : {
        type : String,
        required : true
    },
    created_at : Date
});

scoreSchema.pre( 'save', function(next) {
    'use strict';

    this.created_at = new Date();

    next();
});

module.exports = mongoose.model('Score', scoreSchema);
