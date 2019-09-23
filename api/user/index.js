
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const { successSend, failSend} = require('../../utils/utils.js')
router.post('/register', bodyParser.json(),function(req, res){
  const param = req.body;
  const userParam = {
    id: Math.floor(Math.random() * 100),
    creatTime: Date.now()
  }
  Object.assign(userParam, param);
  const userPath = `${__dirname}/user.json`;
  // 判断文件是否存在
  fs.exists(userPath, (exists) => {
    if(exists){
      fs.readFile(userPath,'utf-8', (err, data) => {
        if(err){
          res.send(failSend('写入失败'));
          return err
        }
        const userList = JSON.parse(data);
        userList.push(userParam);
        writeFile(res, JSON.stringify(userList))
      })
    }else{
      // 写文件
      writeFile(res, JSON.stringify([userParam]))
    }    
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

 module.exports = router;