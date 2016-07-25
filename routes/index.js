'use strict';
var express = require('express');
var router = express.Router();
var uploadManager = require('./uploadManager')(router);


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/firebase', function(req, res) {
  res.render('firebase', { title: 'Express' });
});
router.get('/movie', function(req, res) {
  res.render('movie', { title: 'Express' });
});
module.exports = router;
