'use strict';

var express = require('express');
var controller = require('./data.controller');

var router = express.Router();

router.get('/communities', controller.communities);
router.get('/:id/reviews', controller.reviews);
router.get('/:id/alsoWentHere', controller.alsoWentHere);
router.post('/getReco', controller.getReco);

module.exports = router;