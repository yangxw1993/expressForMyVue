const fs = require('fs');
/**
 * 读文件
 * @param {string} 路径 
 */
function readFile(data){
  return new Promise( (reslove, reject) => {
    fs.readFile(data, 'utf-8', (err, data) => {
      if(err){
        reject(new Error('读取文件失败'));
        return;
      }
      reslove(data)
    })
  })
}
/**
 * 写文件
 * @param {*} path 路径
 * @param {*} data 数据
 */
function writeFile(path, data){
  return new Promise( (reslove, reject) => {
    fs.writeFile(path, data, err => {
      if(err){
        reject(new Error('写文件失败', err));
        return err
      }
      reslove('success')
    })
  })
}
module.exports = {
  readFile,
  writeFile
}