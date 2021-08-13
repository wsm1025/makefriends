//查询用户
const userModel = require('../../model/user')
const dbConfig = require('../../util/dbconfig')
const handleHttp = require('../../util/handleHttp')
const Token = require('../../util/token_vertify')
login = async (req, res) => {
	let token;
	let sql = userModel.LOGIN;
	const {user_name,pass_word} = req.body
	let sqlArr = [user_name,pass_word];
	//等待token加密完成
	await Token.setToken(user_name,pass_word).then(data=>token = "Bearer " + data);
	handleHttp.Func(sql,sqlArr,res,code=[1,0],msg=['登陆成功',"登陆失败"],info={token})
}
module.exports = {
	login
}
