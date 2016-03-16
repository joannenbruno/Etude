'use strict';

// simple express server
var express = require('express');
var app = express();
var router = express.Router();

// set static folder
app.use(express.static('public'));

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

// set port and start server
var port = 8080;
app.listen(port, function() {
	console.log("Listening on port " + port);
});