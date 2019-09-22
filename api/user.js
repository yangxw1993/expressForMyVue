const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.post('/register', bodyParser.json(),function(req, res){
  console.log(req.body)
  res.send(req.body)
})

 module.exports = router;