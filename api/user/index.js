
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const { successSend, failSend} = require('../../utils/utils.js')
const { readFile } = require('../../utils/file.js')
const userPath = `${__dirname}/user.json`;
router.post('/register', bodyParser.json(),function(req, res){
  const param = req.body;
  const userParam = {
    id: Math.floor(Math.random() * 100),
    creatTime: Date.now()
  }
  Object.assign(userParam, param);
  // 判断文件是否存在
  fs.exists(userPath, (exists) => {
    if(exists){
      fs.readFile(userPath,'utf-8', (err, data) => {
        if(err){
          res.send(failSend('写入失败'));
          return err
        }
        const userList = JSON.parse(data);
        // console.log(userParam,'**userParam')
        for(let item of userList){
          if(item.username && item.username === userParam.username){
            // console.log(item,'item', userParam);
            res.send(failSend(`用户名已存在，请更改用户名！${userParam.username}`, userList))
            return;
          }
        }
        userList.push(userParam);
        writeFile(res, JSON.stringify(userList))
      })
    }else{
      // 写文件
      writeFile(res, JSON.stringify([userParam]))
    }    
  })
})

router.post('/login', bodyParser.json(), (req, res) => {
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


 module.exports = router;