var express = require('express');
var router = express.Router();

const events = require('./api/events');
const users = require('./users');
const main = require('./main');
module.exports = {
  events,
  users,
  main
}
