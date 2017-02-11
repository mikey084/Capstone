"use strict";
const express = require('express');

const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const knex = require('./knex');
const cookieParser = require('cookie-parser');
const app = express();
const server = require('http').createServer(app)
var io = require('socket.io')
io = io.listen(server);
server.listen(port);
// ## CORS middleware
// For more info see: https://gist.github.com/cuppster/2344435
//
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
var routes = require('./routes/index')





// var server = require('http').createServer(app);

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public/images'))
app.use(express.static(__dirname + '/public/javascripts'));
app.use(express.static(__dirname + '/public/stylesheets'));

app.get('/testing', function(req, res){
  res.render('../views/index')
})

io.sockets.on('connection', function(socket){
  socket.emit('message', {message: 'Bring an eagerness to learn!'});

  socket.on('send', function(data){
    console.log(data, "APP side data");
    io.sockets.emit('message', data);
  })
})


app.get('/', function(req, res){
  res.redirect('/main');
})
app.use('/api/events', routes.events)
app.use('/users', routes.users);
app.use('/', routes.main);

// *** MAKE POST REQUEST HANDLES CREATE EVENT

// function mainBlogPost(articles, comments) {
//     let newArray = []
//     newArray.push(articles);
//     newArray.push(comments);
//     return newArray;
// }

module.exports = app;
