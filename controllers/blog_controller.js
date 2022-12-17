const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
require('dotenv').config();
const {verifyToken} = require('../verification')

exports.new_blog_post = [
  verifyToken,
  (req, res) => {
  jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      //create blog post code
      const blog = new Blog({
        title: req.body.title,
        blog_post: req.body.blog_post,
        author: authData.admin._id,
      }).save((err, result) => {
        if(err) {
          return res.json({error: err, result: result})
        } else {
          res.json({msg: 'Blog post successfully created (:'})
        }
      })
    }
  })
}]

exports.update_blog_post = [
  verifyToken,
  (req, res) => {
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
      if(err) {res.sendStatus(403);} 
      else {
        //update blog post code
        Blog.findByIdAndUpdate(req.params.id,
          { title: req.body.title,
            blog_post: req.body.blog_post,
            published: req.body.published,
            date: Date.now()
          },
          (err, result) => {
            if(err){
              return res.json({error: err})
            } else {
              res.json({msg: "blog post updated (:"})
            }
          }
        )
      }
    })
  }
]

exports.publish_blog = [
  verifyToken,
  (req, res) => {
  jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      Blog.findByIdAndUpdate(req.params.id, { published: 'published'} )
      .exec((err, result) => {
        if(err) {
          return res.json({error: err})
        } else {
          res.json({post_id: result._id, msg: 'post published'})
        }
      })
    }
  })
}]

exports.unpublish_blog = [
  verifyToken,
  (req, res) => {
  jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      Blog.findByIdAndUpdate(req.params.id, { published: 'not-published'} )
      .exec((err, result) => {
        if(err) {
          return res.json({error: err})
        } else {
          res.json({post_id: result._id, msg: 'post unpublished'})
        }
      })
    }
  })
}]

exports.index = (req, res, next) => {
  Blog.find({})
  .populate("author", "username")
  .sort({date: -1})
  .exec((err, result) => {
    if(err) {
      return next(err)
    } else {
      return res.json(result)
    }
  })
}

exports.show = (req, res, next) => {
  Blog.findById({title: new RegExp('^'+req.params.title+'$', "i")})
  .populate('author', 'username')
  .exec((err, result) => {
    if(err) {
      return next(err)
    } else {
      res.json({result})
    }
  })
}

exports.search = () => {
  Blog.find({title: req.body.title})
}