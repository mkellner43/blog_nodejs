const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/admin/log_in')
})

module.exports = router;