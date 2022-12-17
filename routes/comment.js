const express = require('express');
const router = express.Router();
const comment_controller = require('../controllers/comment_controller')
//starting with /comment

//get all comments for blog post
router.get('/:blog_id', comment_controller.index)

//create new comment for blog post
router.post('/:blog_id', comment_controller.create)

//delete comment for blog post
router.delete('/:comment_id', comment_controller.delete)

module.exports = router;