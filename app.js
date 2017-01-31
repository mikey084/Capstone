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

app.get('/createevent', function(req, res) {
    res.render('../views/create-event');
})

app.get('/createaccount', function(req, res) {
    res.render("../views/create-account");
})

app.get('/login', function(req, res) {
    res.render("../views/login");
})

app.get('/main', function(req, res, next) {
    if (!req.cookies.id) {
        res.render("../views/login");
    }
    if (req.cookies.id) {
        res.render('../views/main');
    }
})

app.get('/createarticle', function(req, res) {
    res.render("../views/create-article");
})

app.post('/main', function(req, res, next) { //login post request
    var body = req.body;
    var cookies = req.cookies.id;
    console.log(body, "BODY");
    knex('users').where({username: body.username, email: body.email, password: body.password}).catch(function(err) {
        next(new Error(err));
        console.log(err);
    }).then(function(data) {
        console.log(data, "knex data");
        if (data.length === 0) {
            res.redirect("/createaccount");
        }
        if (!cookies) {
            res.cookie('id', data[0].id, {httpOnly: true})
            res.redirect("/main");
        } else {
            res.redirect('/main');
        }
    })
})

app.post('/logout', function(req, res) {
    if (req.cookies) { //Logout post request
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

app.post("/addcomment/:id", function(req, res) {
    var id = req.params.id;
    var userId = req.cookies.id;
    var comment = req.body.comment;
    console.log(req, "post request");
    knex('comments').returning('*').insert({user_id: userId, article_id: id, comment: comment})
})

// app.get('/main', function(req, res, next){
//   let currentUser = req.cookies.id;
//   console.log(currentUser);
//   knex.select("*")
//   .from('articles')
//   .innerJoin("articles", 'comments.article_id', 'articles.id')
//   .innerJoin('users', 'comments.user_id', 'users.id')
//   .then(function(data1){
//     console.log(data1, "ARTICLES");      //articles
//     knex.select('*')
//     .from('articles')
//     .then(function(data2){        //comments
//       let searchData = mainBlogPost(data1, data2)
//         res.render('../views/main', {
//           data: searchData
//         });
//     })
//   }).catch(function(err){
//     next(new Error(err));
//     console.log(err);
//   })
// })

function mainBlogPost(articles, comments) {
    let newArray = []
    newArray.push(articles);
    newArray.push(comments);
    return newArray;
}

app.listen(port, function() {
    console.log("listing to port " + port);
})
