//查询用户
const basic = require('../../model/basic')
const handleHttp = require('../../util/handleHttp')
getIcon = async (req, res) => {
	let sql = basic.ICON;
	let sqlArr = [];
    handleHttp.Func(sql,sqlArr,res,code=[1,0],msg=['icon获取成功',"icon获取失败"])
}
module.exports = {
	getIcon
}
