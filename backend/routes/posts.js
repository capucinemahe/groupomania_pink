const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const postCtrl = require('../controllers/postCtrl');
const multer = require('../utils/multer-config');

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.post('/', auth, multer.posts, postCtrl.createPost);
router.put('/:id', auth, multer.posts, postCtrl.modifyMyPost);
router.delete('/:id', auth, postCtrl.deleteMyPost);


module.exports = router; //on exporte le routeur, et on l'importe dans app.js
