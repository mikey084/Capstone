"use strict"

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

// THIS ROUTE SENDS DATA that is queried by buildEvent and buildEventFiltered
router.route('/').get(function(req, res, next){
  knex('events').then(function(data){
    res.json(data);
  })
})

router.route('/:eventType').get(function(req, res, next){
  var eventType = req.params.eventType;
  knex('events').where('genre', eventType).then(function(data){
    console.log(data, " OHMMMMMMMMMMMITOFU genre specific");
    res.json(data);
  })
})

//
// router.route('/filtered').get(function(req, res, next){
//   knex('events').then(function(data){
//     res.json(data);
//   })
// })

module.exports = router;
