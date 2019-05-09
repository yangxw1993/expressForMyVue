// 引入 mongoDB模块，获得它的客户端对象
const MongoClient = require('mongodb').MongoClient;
// mongoDB连接字符串
const MONGOURL = 'mongodb://localhost:27017/';
// 连接数据库
function insertDB(DBName, sheet, data){
  return new Promise((reslove, reject) => {
    MongoClient.connect(MONGOURL, (err, db) =>{
      if (err) {
        reject(new Error('数据库连接失败'))
      } else {
        // 数据库名：proShopCart
        let _dbo = db.db(DBName);
        // 集合名：userInfo
        let _collection = _dbo.collection(sheet);
        _collection.insertOne(data, function (err, result) {
          err ? reject(new Error('插入失败')) : reslove('成功');
          db.close();          
        })
      }

    })
  })
}
/* 查询 
 * DBNAme 数据库名
  sheet： 表名
 *
*/
function queryDB(DBName, sheet) {
  return new Promise((reslove, reject) => {
    MongoClient.connect(MONGOURL, { useNewUrlParser: true }, (err, db) => {
      if (err) {
        reject(new Error(err))
      } else {
        let dbo = db.db(DBName);
        dbo.collection(sheet).find({}).toArray((err, result) => { // 返回集合中所有数据
          err ? reject(new Error(err)) : reslove(result);
          db.close();
        });
      }
    });
  })
}

module.exports = {
  insertDB,
  queryDB
}