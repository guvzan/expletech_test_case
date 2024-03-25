const {Router} = require('express');
const authController = require('../controllers/authController');
const router = Router();

router.get('/signup', () => {});
router.post('/signup', authController.post_signup);
router.get('/login', () => {});
router.post('/login', authController.post_login);
router.get('/logout', authController.get_logout);

module.exports = router;