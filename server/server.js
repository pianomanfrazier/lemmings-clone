var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var configDB = require("./config/database");
var db = mongoose.connection;
var app = express();

var api = require('./routes/api');

var port = process.argv[2] || 3000;
var host = '0.0.0.0';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set up database connection
mongoose.connect(configDB.url); // connect to our database
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    'use strict';
    console.log("opened Mongo connection");
});

app.get('/', (req, res)=>{
    res.sendFile('index.html');
});

app.use('/api', api);

app.listen(port, host, ()=>{
    console.log(`listening on ${host}:${port}`);
});
