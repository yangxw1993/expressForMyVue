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
app.post('/register', bodyParser.json(), function(req, res){
  console.log(req.body)
  let _insertMsg = req.body;
  insertDB('proShopCart', 'userInfo', _insertMsg).then(result => {
    res.send({code: 0, msg: '注册成功！'});
  }).catch(err => {

    res.send({code: 1, msg: err});
  })
  /* MongoClient.connect( MONGOURL, function(err, db){
    // 数据库名：proShopCart
    let _dbo = db.db('proShopCart');
    // 集合名：userInfo
    let _collection = _dbo.collection( 'userInfo' );
    _collection.insertOne( _insertMsg, function(err, result){
      if(err) throw err;
      console.log('注册成功！');
      res.send({code: 0, msg: '注册成功！'});
      db.close();
    })
  }) */
});
// 查询MongoDB
/* MongoClient.connect(MONGOURL, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("proShopCart");
  dbo.collection("userInfo"). find({}).toArray(function(err, result) { // 返回集合中所有数据
      if (err) throw err;
      console.log(result);
      db.close();
  });
}); */
// console.log(connectMongo,'**')
queryDB('proShopCart', 'userInfo').then( res => {
  console.log(res);
})/* .then(res => {
  console.log(res,'**')
}) */
app.listen(8888,function(){
  console.log( '8888，服务启动！' )
});