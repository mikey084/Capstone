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

app.use(express.static(__dirname + '/public/javascripts'));


app.get('/testing', function(req, res){
  res.render('../views/index')
})

io.sockets.on('connection', function(socket){
  socket.emit('message', {message: 'welcome to test chat'});

  socket.on('send', function(data){
    console.log(data, "APP side data");
    io.sockets.emit('message', data);
  })
})

app.use('/api/events', routes.events)
app.use('/users', routes.users);
app.use('/', routes.main);






//
// app.get('/main', function(req, res){
//   console.log(req);
//   knex.select().from('events')
//   .then(function(data){
//     console.log(data);
//     res.json(data);
//   }).catch(function(err){
//     console.log(err);
//   })
// })


// app.post('/main', function(req, res, next) { //login post request
//     var body = req.body;
//     var cookies = req.cookies;
//     console.log(req.cookies, "REQUEST PRE KENX");
//     console.log(body, " LOGIN POST body");
//     knex('users').where({username: body.username, email: body.email, password: body.password}).catch(function(err) {
//         next(new Error(err));
//         console.log(err);
//     }).then(function(data) {
//         console.log(data, "knex data");
//         if (data.length === 0) {
//             return res.redirect("/createaccount");
//         }
//         if (!cookies.id) {
//             res.cookie('id', data[0].id,  {httpOnly: true});
//             res.cookie('name', data[0].username, {httpOnly: true});
//             // res.name('name', data[0].username, {httpOnly:true});
//             res.redirect("/main");
//         } else {
//             res.redirect('/main');
//         }
//     })
// })

// app.post('/logout', function(req, res) {
//     if (req.cookies) { //Logout post request
//         console.log(req.cookies);
//         res.clearCookie('id');
//         console.log("i ate your cookie ;)");
//         res.redirect('/login');
//     }
// });
// app.post('/signup', function(req, res, next){
//   var body = req.body;
//   console.log(body);
//   knex('users').insert({
//     username: body.username,
//     email: body.email,
//     password: body.password
//   }).catch(function(err){
//     next(new Error(err));
//     console.log(err);
//   })
//   .then(function(data){
//     console.log(data, "THIS IS DATA");
//     if (!data){
//       res.redirect("/createaccount");
//     }
//     if (!req.cookies.id){
//       console.log("gave you a cookie");
//       res.cookie('id', data[0].id, {
//         httpOnly: true
//       })
//       console.log(res);
//       res.redirect("/main")
//     }
//   })
// })
// app.post('/signup', function(req, res) { //create Account
//     let body = req.body;
//     console.log(body);
//     knex('users').returning('*').insert({username: body.username, password: body.password, email: body.email}).then(function(data) {
//         console.log(data);
//         knex('users').returning('*').where({username: body.username, password: body.password}).then(function(data) {
//             if (data.length === 0) {
//                 res.redirect("/createaccount");
//             }
//             if (!req.cookies.id) {
//                 console.log("just gave you a cookie");
//                 res.cookie('id', data[0].id, {httpOnly: true});
//                 res.redirect("/main");
//             } else {
//                 console.log("you have a cookie");
//                 res.redirect("/main");
//             }
//         }).catch(function(err) {
//             console.log(err);
//         });
//     }).catch(function(err) {
//         console.log(err);
//     });
//
// });

// app.post("/addcomment/:id", function(req, res) {
//     var id = req.params.id;
//     var userId = req.cookies.id;
//     var comment = req.body.comment;
//     console.log(req, "post request");
//     knex('comments').returning('*').insert({user_id: userId, article_id: id, comment: comment})
// })



// *** MAKE POST REQUEST HANDLES CREATE EVENT

function mainBlogPost(articles, comments) {
    let newArray = []
    newArray.push(articles);
    newArray.push(comments);
    return newArray;
}

module.exports = app;
