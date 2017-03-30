var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=>{
    'use strict';

    res.render('index', { title: 'Home Screen', hide_return_to_main_menu: true });
});

module.exports = router;
