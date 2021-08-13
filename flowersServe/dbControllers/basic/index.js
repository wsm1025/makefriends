//查询用户
const basic = require('../../model/basic')
const handleHttp = require('../../util/handleHttp')
getIcon = async (req, res) => {
	let sql = basic.ICON;
	let sqlArr = [];
    handleHttp.Func(sql,sqlArr,res,'icon获取成功',200)
}
module.exports = {
	getIcon
}
