const express = require('express');
const { addUser, loginUser, editUser } = require('../controllers/auth_controller');
const authenticate = require('../middlewares/protectedRoute');
const router = express.Router();

router.post('/addUser',addUser);
router.post('/loginUser',loginUser);
router.put('/editUser',authenticate,editUser);

module.exports = router;