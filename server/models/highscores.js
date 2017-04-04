var mongoose = require('mongoose');

var scoreSchema = mongoose.Schema({
    score : {
        type: Number,
        required: [ true, "Note cannot be empty" ]
    },
    user : {
        type : String, required : true
    },
    created_at : Date
});

scoreSchema.pre( 'save', function(next) {
    'use strict';

    this.created_at = new Date();

    next();
});

module.exports = mongoose.model('Score', scoreSchema);
