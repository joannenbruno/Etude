'use strict';

// dependencies
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;

// mongoose
mongoose.connect('mongodb://localhost/etude');

// user schema/model
var User = require('./server/models/user.js');

// create instance of express
var app = express();

// require routes
var routes = require('./server/routes/api.js');

// define middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'melody',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use('/user/', routes);

// get static pages
app.get('/', function(req, res) {
	console.log('Served up index.html');
	res.sendFile('./public/index/html');
});

app.get('/profile', function(req, res) {
	console.log('Served up profile.html');
	res.sendFile('/public/profile.html', {root : __dirname});
});

app.get('/project', function(req, res) {
	console.log('Served up project.html');
	res.sendFile('./public/project.html', {root : __dirname});
});

app.get('/track', function(req, res) {
	console.log('Served up track.html');
	res.sendFile('./public/track.html', {root : __dirname});
});

// error hndlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

module.exports = app;