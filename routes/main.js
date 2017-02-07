const express = require('express');
const router = express.Router();
const knex = require('../knex');
var AppearIn = require("appearin-sdk");

// var articles = ['/events/1','/events/2','/events/3','/events/4','/events/5','/events/6','/events/7','/events/8','/events/9','/events/10','/events/11','/events/12','/events/13','/events/14','/events/15','/events/16','/events/17','/events/18','/events/19','/events/20',]
//
//
// articles.forEach(function(url){
//   router.get(url, function(req, res){
//     res.render('../views/joinEvent');
//   })
// })
router.get('/events/:id', function(req, res){
  console.log("\n\n\n\nroute is hit\n\n\n");
  console.log(req.body);
  var params = req.params.id;
  if (params){
    res.render('../views/joinEvent');
  }
});



router.get('/createevent', function(req, res) {
    res.render('../views/create-event');
})

router.get('/main', function(req, res, next) {
    console.log(req.cookies, "Cookies exist!");
    knex('events').then(function(data) {
        console.log(data);
        if (req.cookies.id) {
            res.render('../views/main', {data: data})
            res.json(data);
        }else{
        res.render('/login')
        }
    }).catch(function(err) {
        console.log(err);
    })
});



router.post('/newEvent', function(req, res) {
    var body = req.body
    knex('events').returning('*').insert({name: body.name, occupation: body.occupation, title: body.title, description: body.description, address: body.address}).then(function(data) {
        var id = data.id;
        console.log(data[0].id, "this is event id ");
        console.log(data, "Post database data ");
        res.redirect("/Events/"  + data[0].id);
    }).catch(function(err) {
        console.log(err);
    })
})



module.exports = router;
