const express = require('express');
// 引入 mongoDB模块，获得它的客户端对象
const MongoClient = require('mongodb').MongoClient;
// mongoDB连接字符串
const MONGOURL = 'mongodb://localhost:27017/';

const { queryDB, insertDB } = require('./utils/connectMongo')

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
// 用户注册
const dbName = 'proShopCart', sheet = 'userInfo';
app.post('/register', bodyParser.json(), function(req, res){
  let user = req.body;
  queryDB('proShopCart', 'userInfo').then( query => {
    return query
  }).then(query => {
    let userArr = query;
    for(let item of userArr){
      console.log(item.username,'*', user.username)
      if(item.username === user.username){
        res.send({code: 1, msg: '用户名已注册'})
        return false;
      }
    }
    insertDB(dbName, sheet, user).then(result => {
      res.send({code: 0, msg: '注册成功！'});
    })
  }).catch(err => {
    res.send({code: 1, msg: err});
  })
  
});

/* queryDB('proShopCart', 'userInfo').then( res => {
  console.log(res);
}) *//* .then(res => {
  console.log(res,'**')
}) */
app.listen(8888,function(){
  console.log( '8888，服务启动！' )
});