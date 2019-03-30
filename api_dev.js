const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');

app.use(cors({
  origin:['http://localhost:8080'],
  methods:['GET','POST'],
  alloweHeaders:['Content-Type', 'Authorization']
}));
 // need it...  
 app.use(bodyParser.urlencoded({extended: true})) 


app.get('/', function(req, res){
  res.send({a:'hello world'});
});
// 第一个nodeJs接口，接收
app.get('/test_api', function(req, res){
  console.log('开始')
  res.send({a:123});
});

let reqData = null
// 接收参数接收
app.post('/sendData', bodyParser.json(), function(req, res){
  reqData = req.body;
  res.send({code: 0, msg: 'ok'});
});
app.get('/getData', (req, res) => {
  if(reqData){
    res.send({code: 0, data: reqData, msg: 'ok'});
  }else{
    res.send({code: 0, msg: '暂无数据'});
  }
})
app.listen( 8081,function(){
console.log( '8081，中间件已经启动！' )
});