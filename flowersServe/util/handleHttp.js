const dbConfig = require("./dbconfig");
func = async(sql,sqlArr) => {
  try {
    await dbConfig.sqlConnection(sql, sqlArr);
  } catch (error) {
    console.log(error);
  }
};
Func = async (sql,sqlArr,res,code,msg,info=null) => {
  var flag = sql.toLocaleLowerCase().includes('update')||sql.toLocaleLowerCase().includes('insert')
  try{
  let data = await dbConfig.SySqlConnect(sql, sqlArr);
  if(data.hasOwnProperty('sqlState')){
    return res.send({
      data: data.sqlMessage,
      msg: "服务超时" ,
      code: 0
    });
  }
  res.send({
    data: data.length === 1 ? data[0] :(flag?null:data),
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
