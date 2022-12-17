const express = require('express');
const router = express.Router();
const admin_controller = require('../controllers/admin_controller')

//starting with /admin
router.post('/login', admin_controller.authenticate)

module.exports = router;