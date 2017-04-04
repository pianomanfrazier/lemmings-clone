'use strict';
var router = require('express').Router();

// test the router
router.get('/', function(req, res) {
    res.json({msg : "OK"});
});

module.exports = router;
