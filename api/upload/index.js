const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const { successSend, failSend} = require('../../utils/utils.js')
// 将要上传的文件夹路径
const uploadDir = multer({
  dest: path.join(path.dirname(__dirname), 'static', 'upload')
})

const savaPath = '/static/upload'

var fileFilter = function (req, file, cb) {
  var acceptableMime = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
  // 限制类型
  // null是固定写法
  if (acceptableMime.indexOf(file.mimetype) !== -1) {
    cb(null, true); // 通过上传
  } else {
    cb(null, false); // 禁止上传
  }
}
var limits = {
  fieldSize: "2MB", //设置限制（可选）
}
const storage = multer.diskStorage({
  //设置 上传图片服务器位置
  destination: path.resolve(__dirname, savaPath),
  //设置 上传文件保存的文件名
  filename: function (req, file, cb) {
  // 获取后缀扩展
    let extName = file.originalname.slice(file.originalname.lastIndexOf("."));  //.jpg
 // 获取名称
    let fileName = Date.now(); 
    console.log(fileName + extName); //12423543465.jpg
    cb(null, fileName + extName);
  },
});
// 单张
const imageUploader = multer({
  fileFilter,
  storage,
  limits
}).single("file"); //文件上传预定 name 或者 字段
//多张上传

/* const imageUploader = multer({
  fileFilter,
  storage,
  limits
}).array("file"); */


router.post('/formData', imageUploader, (req, res) => {
  console.log(req.file, '****')
  res.send(successSend(`${savaPath}/${req.file.filename}`))
} )





const handleMultiparty = (req, res, temp) =>{
  return new Promise((resolve,reject) => {
    let form = new multer.Form({uploadDir});
    // multiparty解析
    form.parase(req, (err, fields, files) => {
      if(err){
        res.send(failSend('fail'));
        reject(err);
        return
      }
      resolve({
        fields,
        files
      })
    })
  })
}
module.exports = router;