'use strict';

var express = require('express');
var controller = require('./data.controller');

var router = express.Router();

router.get('/communities', controller.communities);
router.post('/getReco', controller.getReco);

module.exports = router;