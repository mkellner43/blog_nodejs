const Comment = require('../models/comment');
const { body, validationResult} = require('express-validator');
require('dotenv').config();
const {verifyToken} = require('../verification');


exports.create = [
  //validation and sanitaization
  body('comment', 'Must include at least 5 letter')
  .trim()
  .isLength({min: 5})
  .escape(),
  body('author', 'Must include name to post comment')
  .trim()
  .isLength({min: 1})
  .escape(),
  (req, res) => {
    const result = validationResult(req)
    if(!result.isEmpty()) {
      //validation errors exist
      return res.json({result: result})
    } else {
      const comment = new Comment({
        comment: req.body.comment,
        author: req.body.author,
        blog: req.params.blog_id
      }).save((err, result) => {
        if(err) {
          return res.json('There was a error saving comment')
        } else {
          res.json({comment: result, msg: 'Successfully loaded to database'})
        }
      })
    }
  }
]

exports.index = (req, res) => {
  Comment.find({blog: req.params.blog_id})
  .sort({date: -1})
  .exec((err, comments) => {
    if(err){
      res.json({err})
    } else {
      res.json({comments})
    }
  })
}
exports.delete = [
  verifyToken,
  (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id)
    .exec((err, result) => {
      if(err){
        return res.json({err})
      } else if(result === null) {
        return res.json({msg: 'no comment found with that ID'})
      }
      else {
        return res.json({result: result, msg: "comment successfully deleted"})
      }
    })
  }
]
