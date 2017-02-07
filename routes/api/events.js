"use strict"

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.route('/').get(function(req, res, next){
  knex('events').then(function(data){
    res.json(data);
  })
})



module.exports = router;
