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
/**
 * 生成随机字符
 * @param {Number} num 几位数
 */
function creatStr(num){
  num = num || 16;
  const allChart = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; 
  const maxStr = allChart.length;
  let str = '';
　for (i = 0; i < num; i++) {
    str += allChart.charAt(Math.floor(Math.random() * maxStr));
　}
  return str;
}
module.exports = {
  successSend,
  failSend,
  creatStr
}