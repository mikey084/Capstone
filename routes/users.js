"use strict";
const express = require('express');
const router = express.Router();
const knex = require('../knex');

/* GET users listing. */


// create account POST ROUTE
router.post('/signup', function(req, res){
  let body = req.body;
  console.log(body);
  knex('users').returning('*').insert({username: body.username, password: body.password, email: body.email}).then(function(data) {
      console.log(data);
      knex('users').returning('*').where({username: body.username, password: body.password}).then(function(data) {
          if (data.length === 0) {
              res.redirect("/users/createaccount");
          }
          if (!req.cookies.id) {
              console.log("just gave you a cookie");
              res.cookie('id', data[0].id, {httpOnly: true});          res.cookie('name', data[0].username, {httpOnly: true});
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
})

//THIS IS THE LOGIN POST ROUTE
router.post('/main', function(req, res, next){
  var body = req.body;
  var cookies = req.cookies;
  console.log(req.cookies, "REQUEST PRE KENX");
  console.log(body, " LOGIN POST body");
  knex('users').where({username: body.username, email: body.email, password: body.password}).catch(function(err) {
      next(new Error(err));
      console.log(err);
  }).then(function(data) {
      console.log(data, "knex data");
      if (data.length === 0) {
          return res.redirect("/users/createaccount");
      }
      if (!cookies.id) {
          res.cookie('id', data[0].id,  {httpOnly: true});
          res.cookie('name', data[0].username, {httpOnly: true});
          // res.name('name', data[0].username, {httpOnly:true});

          res.redirect("/main");
      } else {
          res.redirect('/main');
      }
  })
})

router.post('/logout', function(req, res){
  if (req.cookies) { //Logout post request
    console.log(req.cookies);
    res.clearCookie('id');
    res.clearCookie('name');
    console.log("i ate your cookie ;)");
    res.redirect('/users/login');
  }
})

router.get('/login', function(req, res) {
    res.render("../views/login");
});

router.get('/createaccount', function(req, res) {
    res.render("../views/create-account");
})








module.exports = router;
