const express = require('express');
// 引入 mongoDB模块，获得它的客户端对象
const MongoClient = require('mongodb').MongoClient;
// mongoDB连接字符串
const DB_CONN_STR = 'mongodb://localhost:27017/';

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
  // 这个部分，示例代码里都有，同学们复制一下，不要自己写，很容易错
  MongoClient.connect( DB_CONN_STR, function(err, db){
    // 数据库名：proShopCart
    var _dbo = db.db('proShopCart');
    // 集合名：userInfo
    var _collection = _dbo.collection( 'userInfo' );
    _collection.insertOne( _insertMsg, function(err, result){
      if(err) throw err;
      console.log('注册成功！');
      res.send({code: 0, msg: '注册成功！'});
      db.close();
    })
  })
});
app.listen( 8081,function(){
console.log( '8081，中间件已经启动！' )
});