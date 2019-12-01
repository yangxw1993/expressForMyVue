const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const { successSend, failSend, creatStr} = require('../../utils/utils.js')
const { writeFile, readFile } = require('../../utils/file.js');
const goodsDataPath = `${__dirname}/goods.json`
router.post('/addGoods', bodyParser.json(),function(request, response){
  const { goodsName, goodsDesc, options } = request.body;
  const data = {
    id: `${creatStr(6)}_${Math.floor(Math.random() * 10000)}_${Date.now()}`,
    goodsName,
    description: goodsDesc,
    options,
    creatTime: Date.now()
  }
  fs.exists(goodsDataPath , exits => {
    if(exits){
      readFile(goodsDataPath).then( res => {
        let goodsList = JSON.parse(res);
        goodsList.push(data);
        storGoods(goodsList, response);
      })
    }else{
      storGoods([data], response)
    }
  })

})

router.get('/getGoods', bodyParser.json(), (req, res) => {
  readFile(goodsDataPath).then(data => {
    res.send(successSend('成功', JSON.parse(data)));
  }).catch(err => {
    response.send(failSend('失败'))
  })
})

function storGoods(data, response){
  writeFile(goodsDataPath, JSON.stringify(data,'','\t')).then(res => {
    response.send(successSend('添加成功'));
  }).catch(err => {
    response.send(failSend('写入文件失败', data))
  })
}



 module.exports = router;