"use strict";

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const knex = require('./knex');
const cookieParser = require('cookie-parser');
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());

var io = require('socket.io').listen(app.listen(port, function(){
  console.log("listening on MOFUKKKAAAA " + port);
}))

var server = require('http').createServer(app);

app.use(express.static(__dirname + '/bower_components'));
app.engine('pug', require('pug').__express);

app.use(express.static(__dirname + '/public/javascripts'));




io.sockets.on('connection', function(socket){
  socket.emit('message', {message: 'welcome to test chat'});

  socket.on('send', function(data){
    console.log(data, "APP side data");
    io.sockets.emit('message', data);
  })
})






app.get('/joinEvent', function(req, res){
    res.render('../views/joinEvent');
})
app.get('/createevent', function(req, res) {
    res.render('../views/create-event');
})
app.get('/createaccount', function(req, res) {
    res.render("../views/create-account");
})
app.get('/login', function(req, res) {
    res.render("../views/login");
})
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
app.get('/main', function(req, res, next) {
    knex('events').then(function(data) {
        console.log(data);
        if (req.cookies.id) {
            res.render('../views/main', {data: data})
        }else{
        res.render('/login')
        }
    }).catch(function(err) {
        console.log(err);
    })
});

app.get('/createarticle', function(req, res) {
    res.render("../views/create-article");
})

app.post('/main', function(req, res, next) { //login post request
    var body = req.body;
    var cookies = req.cookies.id;
    console.log(body, " LOGIN POST body");
    knex('users').where({username: body.username, email: body.email, password: body.password}).catch(function(err) {
        next(new Error(err));
        console.log(err);
    }).then(function(data) {
        console.log(data, "knex data");
        if (data.length === 0) {
            return res.redirect("/createaccount");
        }
        if (!cookies) {
            console.log(data[0], "  I AM DATA 0");
            res.cookie('id', data[0].id,  {httpOnly: true});
            res.redirect("/main");
        } else {
            res.redirect('/main');
        }
    })
})

app.post('/logout', function(req, res) {
    if (req.cookies) { //Logout post request
        console.log(req.cookies);
        res.clearCookie('id');
        console.log("i ate your cookie ;)");
        res.redirect('/login');
    }
});
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
app.post('/signup', function(req, res) { //create Account
    let body = req.body;
    console.log(body);
    knex('users').returning('*').insert({username: body.username, password: body.password, email: body.email}).then(function(data) {
        console.log(data);
        knex('users').returning('*').where({username: body.username, password: body.password}).then(function(data) {
            if (data.length === 0) {
                res.redirect("/createaccount");
            }
            if (!req.cookies.id) {
                console.log("just gave you a cookie");
                res.cookie('id', data[0].id, {httpOnly: true});
                res.redirect("/main");
            } else {
                console.log("you have a cookie");
                res.redirect("/main");
            }
        }).catch(function(err) {
            console.log(err);
        });
    }).catch(function(err) {
        console.log(err);
    });

});

// app.post("/addcomment/:id", function(req, res) {
//     var id = req.params.id;
//     var userId = req.cookies.id;
//     var comment = req.body.comment;
//     console.log(req, "post request");
//     knex('comments').returning('*').insert({user_id: userId, article_id: id, comment: comment})
// })



// *** MAKE POST REQUEST HANDLES CREATE EVENT
app.post('/newEvent', function(req, res) {
    var body = req.body

    knex('events').returning('*').insert({name: body.name, occupation: body.occupation, title: body.title, description: body.description, address: body.address}).then(function(data) {
        console.log(data);
        res.redirect("/main");
    }).catch(function(err) {
        console.log(err);
    })
})

function mainBlogPost(articles, comments) {
    let newArray = []
    newArray.push(articles);
    newArray.push(comments);
    return newArray;
}
