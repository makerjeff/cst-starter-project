/**
 * "NEM" Server
 * Created by jefferson.wu on 1/6/16.
 */

var express = require('express');
var colors = require('colors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// ===================
// ===== EXPRESS =====
// ===================

var app = express();
var port = process.argv[2];

//serve static files
app.use(express.static(__dirname + '/public'));

//parse JSON middleware
app.use(bodyParser.json());

//custom console logging middleware - auto logs
app.use(function(request, response, next) {
    console.log('method: %s, url: %s, path: %s', request.method, request.url, request.path);
    next();
});

// == CUSTOM ROUTES ==
//basic 404

app.get('/random', function(request, response){

    var randomNumber = Math.ceil(Math.random() * 47);
    response.type('text/plain');
    //response.send(`Your random number: ${randomNumber}`);  // ES6
    response.send('Your random number: ' + randomNumber );
});

app.get('*', function(request, response){
    response.sendFile(__dirname + '/public/404.html');
});

app.get('/public/*', function(request, response){
    //response.type('text/plain');
    response.sendFile(__dirname + '/public/404.html');
});

// ====================
// ===== MONGOOSE =====
// ====================

//create connection
mongoose.connect('mongodb://localhost/test');

//put handle on connection
var db = mongoose.connection;

//error handling
db.on('error', function(err0r){
    console.error('connection error: %s', err0r);
});

//start the server
db.once('open', function(){
    console.log('MongoDB connection established.'.green);
});

//define schema

//define schema methods

//define model

//add starter data (optional)
//save starter data (optional)

//=====================
//===== MAIN CODE =====
//=====================

//start the server
init();



//============================
//===== CUSTOM FUNCTIONS =====
//============================

function init(){
    console.log(colors.green('Starting server on ' + port + ', running on a ' + process.arch + 'machine. '));
    app.listen(port || 8000);
}