'use strict';

// simple express server
var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static('public'));
app.get('/', function(req, res) {
	res.sendFile('./public/index/html');
});

var port = 8080;
app.listen(port);
console.log("Listening on port " + port);