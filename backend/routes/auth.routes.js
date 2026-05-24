const express = require('express');
const { registerManager, loginManager, loginEmployee } = require('../controllers/auth.controller');
const router = express.Router();

router.post('/manager/register', registerManager);
router.post('/manager/login', loginManager);
router.post('/employee/login', loginEmployee);

module.exports = router;
