const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors({
  origin:['http://localhost:8080'],
  methods:['GET','POST'],
  alloweHeaders:['Content-Type', 'Authorization']
}));
 
app.get('/', function(req, res){
  res.send({a:'hello world'});
});
// 第一个nodeJs接口，接收
app.get('/test_api', function(req, res){
  res.send({a:123});
});

app.listen( 8081,function(){
console.log( '8081，中间件已经启动！' )
});