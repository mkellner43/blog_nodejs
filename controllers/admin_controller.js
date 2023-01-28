const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticate = (req, res, next) => {
  Admin.findOne({username: req.body.username})
  .exec((err, result) => {
    if(err) {
      return next(err)
    }
    if(result === null) {
      return res.status(401).json({msg: 'Invalid Credentials :(', status: 401})
    }
    if(result.password === req.body.password){
      jwt.sign({admin: result}, process.env.TOKEN_SECRET,(err, token) => {
        if(err) {
          return res.json({error: err})
        }
        const options = {
          httpOnly: true,
          expires: new Date(Date.now() + 6000000)
        }
        res.cookie('token', token, options)
        .json({
          token: token,
          _id: result._id
        });
      });
    } else {
        res.status(401).json({msg: 'Invalid Credentials :(', status: 401})
    }
  })
}