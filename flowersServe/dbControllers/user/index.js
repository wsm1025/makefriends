//查询用户
const userModel = require('../../model/user')
const dbConfig = require('../../util/dbconfig')
const handleHttp = require('../../util/handleHttp')
const Token = require('../../util/token_vertify')
login = async (req, res) => {
	let token;
	const sql = userModel.LOGIN;
	const {user_name,pass_word} = req.body
	let sqlArr = [user_name,pass_word];
	//等待token加密完成
	await Token.setToken(user_name,pass_word).then(data=>token = "Bearer " + data);
	handleHttp.Func(sql,sqlArr,res,code=[1,0],msg=['登陆成功',"登陆失败"],info={token})
}
getAttribute=async(req,res)=>{
	const sql = userModel.getAttribute;
	const {key} = req.query
	let sqlArr = [key,req.data.userName];
	handleHttp.Func(sql,sqlArr,res,code=[1,0],msg=['查询成功',"查询失败"])
}


module.exports = {
	login,
	getAttribute
}
