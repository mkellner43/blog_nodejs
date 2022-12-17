const express = require('express');
const router = express.Router();
const blog_controller = require('../controllers/blog_controller');

//starting with /blog
router.post('/create', blog_controller.new_blog_post)

//update blog post
router.put('/:id/update', blog_controller.update_blog_post)

//publish blog
router.post('/:id/publish', blog_controller.publish_blog)

//unpublish blog
router.post('/:id/unpublish', blog_controller.unpublish_blog)

//get blogs
router.get('/', blog_controller.index)

//get one blog
router.get('/:id', blog_controller.show)


module.exports = router;