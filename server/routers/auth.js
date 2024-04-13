const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.post('/register', authController.registration)
router.post('/login', authController.login)
router.get('/identity', authController.identity)
router.get('/logout', authController.logout)

module.exports = router;