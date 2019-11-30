    /* const express = require('express');
const router = express.Router();

router.use('/', (req, res) => {
  console.log(req.path)
  if(req.path){
    res.send(require('./admin'))
  }else{
    res.send('<h1>路由分发</h1>')

  }
})

module.exports = router */

module.exports = function(app){
  // 分发user模块，比如用户的注册和登录请求业务逻辑将会在/api/user.js中实现
  const user = require('../api/user');
  // 商品
  const goods = require('../api/goods')
  app.use('/user',user);
  app.use('/goods',goods);
};