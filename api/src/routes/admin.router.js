var express = require('express');
var router = express.Router();

var adminController = require('../controllers/admin.controller')


router.post('/', adminController.createAdmin);
router.get('/', adminController.getAllAppDetails);
router.get('/:adminId', adminController.getSingalAdminDetails);
router.put('/:adminId', adminController.updateAdminDetails);
router.put('/status/:adminId', adminController.updateAdminStatus);

module.exports =router; 