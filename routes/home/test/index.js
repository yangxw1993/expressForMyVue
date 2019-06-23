const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
router.use('/hello', (req, res) => {
  res.send({a:'hello world'});
})
 // need it...  
 router.use(bodyParser.urlencoded({extended: true})) 
// 接收参数接收
let reqData = null;
router.use('/sendData', bodyParser.json(), function(req, res){
  reqData = req.body;
  fs.writeFile('./data.txt', JSON.stringify(reqData), err => {
    if(err){
      return console.error(err)
    }
    res.send({code: 0, msg: 'ok'});
  })
});
router.use('/getData', (req, res) => {
  if(reqData){
    res.send({code: 0, data: reqData, msg: 'ok'});
  }else{
    res.send({code: 0, msg: '暂无数据'});
  }
})
module.exports = router