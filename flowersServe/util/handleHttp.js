const dbConfig = require("./dbconfig");
func = async() => {
  let data = await dbConfig.sqlConnection(sql, sqlArr);
};
Func = async (sql,sqlArr,res,code,msg,info=null) => {
  console.log(sqlArr)
  try{
  let data = await dbConfig.SySqlConnect(sql, sqlArr);
  if(data.hasOwnProperty('sqlState')){
    return res.send({
      data:data.sqlMessage,
      successData: "服务超时"
    });
  }
  res.send({
    data: data.length === 1 ? data[0] : data,
    code: data.length !== 0 ? code[0] : code[1],
    msg: data.length !== 0 ? msg[0] : msg[1],
    info:data.length !== 0 ? info :null
  })
}catch(err){
  res.send({
    err
  })
}
};
module.exports = { func, Func };
