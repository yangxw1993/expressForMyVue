const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const { successSend} = require('../../utils/utils.js')

router.get('/', (req, res) => {
  const obj = {name: 'yxw'};
  const privateKey = 'initToken';
  const token = jwt.sign(obj, privateKey, {
    expiresIn: 60*1  // 1分钟过期
  })
  res.send(successSend('ok', token));
})

module.exports = router;