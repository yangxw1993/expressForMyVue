
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const { successSend, failSend} = require('../../utils/utils.js')
const userPath = `${__dirname}/user.json`;
router.post('/addGoods', bodyParser.json(),function(req, res){
  const param = req.body;
  res.send(successSend('添加成功',param));
})

router.get('/getGoods', bodyParser.json(), (req, res) => {
  const param = req.body;
  console.log(param,'**param')
  const {username, password} = param;
  readFile(userPath).then(data => {
    const userList = JSON.parse(data);
    for(let item of userList){
      console.log(item['username'], '**', username)
      if(item.username === username){
        if(item.password !== password){
          res.send(failSend('用户名或密码错误'));
          return;
        }
        res.send(successSend('成功', item));
        return;
      }
    }
    res.send(failSend('当前用户名不存在，请先注册'))    
  })
  
})
function writeFile(res, data){
  fs.writeFile(`${__dirname}/user.json`, data, err => {
    if(err){
      return err
    }
    res.send(successSend('注册成功'));
  })
}

function readFile(data){
  return new Promise( (reslove, reject) => {
    fs.readFile(data, 'utf-8', (err, data) => {
      if(err){
        reject(new Error('读取文件失败'));
        return;
      }
      reslove(data)
    })
  })
}

 module.exports = router;