const express = require('express');
const multer = require('multer');
const router = express.Router();

const { successSend} = require('../../utils/utils.js')
// 将要上传的文件夹路径
const uploadDir = multer({dest:'./static/upload'})

router.post('/formData', uploadDir.single('file'), (req, res) => {
  res.send(successSend(`./upload/${req.file.filename}`))
} )

module.exports = router;