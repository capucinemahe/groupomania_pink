const express = require('express');
const router = express.Router();
const { body } = require('express-validator'); //verifie le format des inputs au sign up


const auth = require('../utils/auth');
const userCtrl = require('../controllers/userCtrl');
const multer = require('../utils/multer-config');


router.post('/signup', [body('email').isEmail()], userCtrl.signup); //valide le bon format d'email
router.post('/login', userCtrl.login);

router.get('/users/profile', userCtrl.getUserProfile);
router.get('/users/', userCtrl.getAllUsers);
router.put('/users/profile', auth, multer.users, userCtrl.updateUser);
router.delete('/users/:id', auth, userCtrl.deleteUserAccount);

module.exports = router; //on exporte le routeur, et on l'importe dans app.js