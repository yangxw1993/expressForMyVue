// 引入 mongoDB模块，获得它的客户端对象
const MongoClient = require('mongodb').MongoClient;
// mongoDB连接字符串
const MONGOURL = 'mongodb://localhost:27017/';
// 连接数据库
function connect(DBName, sheet){
  return new Promise((reslove, reject) => {
    MongoClient.connect( MONGOURL, (err, db) => {
      if(err){
        reject(new Error(err))
      }else{
        // 数据库名：proShopCart
        let _dbo = db.db(DBName);        
        // 集合名：userInfo
        let collection = _dbo.collection(sheet);
        reslove(collection);
      }
      
      /* _collection.insertOne( _insertMsg, function(err, result){
        if(err) throw err;
        console.log('注册成功！');
        res.send({code: 0, msg: '注册成功！'});
        db.close();
      }) */
    })
  })
}
/* MongoClient.connect(MONGOURL, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("proShopCart");
  dbo.collection("userInfo"). find({}).toArray(function(err, result) { // 返回集合中所有数据
      if (err) throw err;
      console.log(result);
      db.close();
  });
}); */
// 查询
function queryDB(connectSheet){
  return new Promise( (reslove, reject) => {
    connectSheet.find({}).toArray( (err, result) => { // 返回集合中所有数据
      if(err){
        reject(new Error(err))
      }else{
        reslove(result);
        db.close();
      }   
    });
  })
}

module.exports = {
  connect,
  queryDB
}