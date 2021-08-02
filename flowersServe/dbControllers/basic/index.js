//查询用户
const dbConfig = require('../../util/dbconfig')
const basic = require('../../model/basic')
const handleHttp = require('../../util/handleHttp')
getIcon = async (req, res) => {
	let sql = basic.ICON;
	let sqlArr = [];
	let data = await dbConfig.SySqlConnect(sql, sqlArr);
    handleHttp(res,data[0],200,'icon地址获取成功')
}
module.exports = {
	getIcon
}
