"use strict";

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const knex = require('./knex');
const cookieParser = require('cookie-parser');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
var routes = require('./routes/index')

var io = require('socket.io').listen(app.listen(port, function(){
  console.log("listening on MOFUKKKAAAA " + port);
}))

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

app.use('/api/events', routes.events)
app.use('/users', routes.users);
app.use('/', routes.main);





// *** MAKE POST REQUEST HANDLES CREATE EVENT

function mainBlogPost(articles, comments) {
    let newArray = []
    newArray.push(articles);
    newArray.push(comments);
    return newArray;
}

module.exports = app;
