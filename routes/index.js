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
const express = require('express')

module.exports = function(app){
  // 初始化
  const init = require('../api/init');
  // 分发user模块，比如用户的注册和登录请求业务逻辑将会在/api/user.js中实现
  const user = require('../api/user');
  // 商品
  const goods = require('../api/goods')
  function validHeaders(req, res, next){
    if(!req.token){
      res.json({
        msg: '缺少'
      })
    }else{
      next();
    }
  }
  // app.all('*', validHeaders) 中间件

 
  app.use('/init', init);
  app.use('/user',user);
  app.use('/goods',goods);
};