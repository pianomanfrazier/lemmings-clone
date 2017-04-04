var router = require('express').Router();
var Score = require('../models/highscores');

// test the router
router.get('/', function(req, res) {
    res.json({msg : "OK"});
});

// CREATE
router.post('/score', function(req, res, next) {
var score = new Score({
    score : req.body.score,
    user : req.body.user
});
score.save((err) => {
    if (err) {
        return next(err);
    }
    console.log("score saved!");
    res.json(score);
});
});

// READ
router.get('/highscores', function(req, res, next) {
    Score.find({}).sort({score: -1}).limit(5).exec(
        function(err, scores) {
            if (err) {
                return next(err);
            }
            res.json(scores);
        }
    );
});

// DELETE
router.delete('/highscores', function(req, res, next) {
    Score.find({}).remove(function(err, scores) {
        if (err) {
            return next(err);
        }
        res.json({"Success" : "scores deleted"});
    });
});

module.exports = router;
