const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.post('/login', controller.login)
router.post('/register', controller.register)
router.get('/me', auth.check, controller.me)


module.exports = router;
