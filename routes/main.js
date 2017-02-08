const express = require('express');
const router = express.Router();
const knex = require('../knex');
var AppearIn = require("appearin-sdk");
//dateTime function



router.get('/events/:id', function(req, res){
  if(!req.cookies){
    res.redirect('/users/login');
  }
  var params = req.params.id;
  if (params){
    res.render('../views/joinEvent', {id: req.params.id});
  }
});

router.get('/createevent', function(req, res) {
    res.render('../views/create-event');
})

//need filter function
router.get('/filtered', function(req, res, next){
  knex('events').then(function(data){


    if (req.cookies.id) {
      res.render('../views/mainfiltered', {data: data, cookies: req.cookies.name})
    }
    else{
      res.render('/login')
    }
  }).catch(function(err) {
    console.log(err);
  })
})
router.get('/main', function(req, res, next) {
    console.log(req.cookies, "Cookies exist!");
    knex('events').then(function(data) {
        if (req.cookies.id) {

          res.render('../views/main', {data: data, cookies: req.cookies.name})
        }else{
          res.render('/login')
        }
    }).catch(function(err) {
        console.log(err);
    })
});

router.post('/newEvent', function(req, res) {
    var body = req.body
    console.log(body);
    knex('events').returning('*').insert({name: body.name, occupation: body.occupation, title: body.title, description: body.description, address: body.address, datetime:body.date}).then(function(data) {
        var id = data.id;
        console.log(data, "this is returned data");
        console.log(data[0].id, "this is event id ");
        console.log(data, "Post database data ");
        console.log(typeof data[0].datetime, "type of")
        console.log(data[0].datetime, " WRONG DATE");
        console.log(convertUTCDateToLocalDate(data[0].datetime), "THE CORRECT DATE");
        // data.forEach(function(elem){
        //   convertUTCDateToLocalDate(elem.datetime);
        // })
        // console.log(data);
        res.redirect("/Events/"  + data[0].id);
    }).catch(function(err) {
        console.log(err);
    })
})

function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime()-date.getTimezoneOffset()*60*1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
}


module.exports = router;
