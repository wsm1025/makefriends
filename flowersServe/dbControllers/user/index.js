//查询用户
const userModel = require('../../model/user')
const dbConfig = require('../../util/dbconfig')
const handleHttp = require('../../util/handleHttp')
login = async (req, res) => {
	let sql = userModel.LOGIN;
	let sqlArr = [];
	let data = await dbConfig.SySqlConnect(sql, sqlArr);
	handleHttp(res,data,201,'查询成功')
}
module.exports = {
	login
}
