const dbConfig = require("./dbconfig");
func = async (sql, sqlArr) => {
  try {
    return await dbConfig.SySqlConnect(sql, sqlArr)
  } catch (error) {
    console.log(error);
  }
};
Func = async (sql, sqlArr, res, code, msg, info = `${new Date()}express提供api支持`) => {
  var flag = sql.toLocaleLowerCase().includes('update') || sql.toLocaleLowerCase().includes('insert')
  try {
    let data = await dbConfig.SySqlConnect(sql, sqlArr);
    if (data.hasOwnProperty('sqlState')) {
      return res.send({
        data: data.sqlMessage,
        msg: "服务超时",
        code: 0
      });
    }
    res.send({
      data: data.length === 1 ? data[0] : (flag ? null : data),
      code: data.length !== 0 ? code[0] : code[1],
      msg: data.length !== 0 ? msg[0] : msg[1],
      info: data.length !==0 ? info : `${new Date()}express提供api支持`
    })
  } catch (err) {
    res.send({
      err
    })
  }
};
module.exports = { Func, func };
