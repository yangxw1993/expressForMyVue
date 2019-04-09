function resultData(msg, data = null, code = 0){
  let res = {
    code,
    data,
    msg
  }
  if(!data){
    delete res.data;
  }
  return res;
}
module.export = {
  resultData
}