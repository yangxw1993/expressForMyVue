const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');

router.get('/register', function(req, res){
  res.send('register')
})


module.exports = router