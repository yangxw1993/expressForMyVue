
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
// 404 放在所有路由后面

const handle_404 = (req, res, next) => {
  res.json({
    code: 1,
    msg: `${decodeURIComponent(req.path)}不存在`
  })
}
  app.use('/init', init);
  app.use('/user',user);
  app.use('/goods',goods);
  app.use('/demo', require('../api/demo'));
  app.use(handle_404);
  
  
};