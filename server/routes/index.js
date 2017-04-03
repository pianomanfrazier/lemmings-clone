var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Home Screen', hide_return_to_main_menu: true });
});

module.exports = router;
