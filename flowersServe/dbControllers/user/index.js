//查询用户
const userModel = require('../../model/user')
const dbConfig = require('../../util/dbconfig')
login = async (req, res) => {
	let sql = userModel.LOGIN;
	let sqlArr = [];
	let data = await dbConfig.SySqlConnect(sql, sqlArr);
	if (data.hasOwnProperty("code")) {
		return res.send({
			data: data.sqlMessage,
			"code": 500,
		})
	}
	res.send({
		data,
		"code": 201,
		"text": "查询成功"
	})
}
module.exports = {
	login
}
