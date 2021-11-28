const express = require('express');
const router = express.Router();

const auth_controller = require('../controllers/auth_controller');
const midd = require('../middleware/authMiddleware');

router.get('/login', auth_controller.Login);
router.post('/register', auth_controller.Register);
router.get('/me', midd.authMiddleware, auth_controller.userOn );

module.exports = router;