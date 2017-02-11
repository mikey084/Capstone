const express = require('express');
const router = express.Router();
const knex = require('../knex');
var AppearIn = require("appearin-sdk");
//dateTime function



router.get('/events/:id', function(req, res) {
    var id = req.params.id;
    console.log("hELLOSAKJDHAKJF");
    knex('events').where('events.id', id).leftJoin('users', function(){
      this.on('users.id', '=', 'events.ownerUserId')
    })
    .then(function(data){
      console.log(data, "joined table succecss");
      var name = data[0].name;
      var title = data[0].title;
      var email = data[0].email;
      if(!req.cookies){
        res.redirect('/users/login');
      }
      else{
        res.render('../views/joinEvent', {id: id, name: name,title:title, email: email})
      }
    }).catch(function(err){
      console.log(err);
    })
    // var id = req.params.id;
    // console.log(id, "id HERE");
    // knex('events').where('id', id)
    // .then(function(data) {
    //   console.log(data, "THIS IS knex returned data");
    //   var name = data[0].name;
    //   var title = data[0].title;
    //   var ownerUserId = data[0].ownerUserId;
    //   return knex('users').where('id', ownerUserId);
    //   if (!req.cookies) {
    //     res.redirect('/users/login');
    //   }
    //   else {
    //     console.log("HELLO HITTING IF STATEMENT");
    //     res.render('../views/joinEvent', {id: id, name: name,title: title});
    //   }
    // }).catch(function(err) {
    //     console.log(err);
    //   })
});


router.get('/createevent', function(req, res) {
    res.render('../views/create-event');
})

//need filter function
router.get('/filtered', function(req, res, next) {
    knex('events').then(function(data) {

        if (req.cookies.id) {
            res.render('../views/mainfiltered', {
                data: data,
                cookies: req.cookies.name
            })
        } else {
            res.redirect('/users/login')
        }
    }).catch(function(err) {
        console.log(err);
    })
})
router.get('/main', function(req, res, next) {
    console.log(req.cookies, "Cookies exist!");
    knex('events').then(function(data) {
        if (req.cookies.id) {

            res.render('../views/main', {
                data: data,
                cookies: req.cookies.name
            })
        } else {
            res.redirect('/users/login')
        }
    }).catch(function(err) {
        console.log(err);
    })
});

router.post('/newEvent', function(req, res) {
    var body = req.body
    console.log(body);
    knex('events').returning('*').insert({
        name: body.name,
        occupation: body.occupation,
        title: body.title,
        description: body.description,
        address: body.address,
        datetime: body.date,
        genre: body.genre
    }).then(function(data) {
        var id = data.id;
        console.log(data, "this is returned data");
        // console.log(data[0].id, "this is event id ");
        // console.log(data, "Post database data ");
        // console.log(typeof data[0].datetime, "type of")
        // console.log(data[0].datetime, " WRONG DATE");
        // console.log(convertUTCDateToLocalDate(data[0].datetime), "THE CORRECT DATE");
        // data.forEach(function(elem){
        //   convertUTCDateToLocalDate(elem.datetime);
        // })
        // console.log(data);
        res.redirect("/Events/" + data[0].id);
    }).catch(function(err) {
        console.log(err);
    })
})

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}

module.exports = router;
