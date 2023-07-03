var express = require('express');
var router = express.Router();

var adminController = require('../controllers/admin.controller')


router.post('/', adminController.createAdmin);

module.exports =router;