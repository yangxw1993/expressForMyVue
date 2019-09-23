function successSend(msg, data){
  const sendData = {
    code: 0,
    msg: msg || '成功',
    data: data || ''
  }
  return sendData
}
function failSend(msg){
  const sendData = {
    code: 1,
    msg: msg || '失败',
  }
  return sendData
}
module.exports = {
  successSend,
  failSend
}