//comments routes

const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const commentCtrl = require('../controllers/commentCtrl');


//uri : "/api/comments"

router.post('/', auth, commentCtrl.createComment);
router.put('/:id', auth, commentCtrl.modifyMyComment);
router.delete('/:id', auth, commentCtrl.deleteMyComment);
router.get('/posts/:id', commentCtrl.getAllComments);
// router.get('/posts/:id', auth, commentCtrl.getOneComment);


module.exports = router; //on exporte le routeur, et on l'importe dans app.js