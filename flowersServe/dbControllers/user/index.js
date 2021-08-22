//查询用户
const userModel = require('../../model/user')
const handleHttp = require('../../util/handleHttp')
const Token = require('../../util/token_vertify')
const global = require('../../config')
const moment = require('moment')
login = async (req, res) => {
	let token;
	const sql = userModel.LOGIN;
	const { user_name, pass_word } = req.body
	let sqlArr = [user_name, pass_word];
	//等待token加密完成
	await Token.setToken(user_name, pass_word).then(data => token = "Bearer " + data);
	handleHttp.Func(sql, sqlArr, res, code = [1, 0], msg = ['登陆成功', "登陆失败"], info = { token })
}
getAttribute = async (req, res) => {
	// 不可查询pass_word
	let arr = req.query.key.split(',');
	if (arr.includes('pass_word')) arr.splice(arr.indexOf('pass_word'), 1)
	arr.join(',');
	const sql = `select ${arr} from users WHERE user_name='${req.data.userName}'`
	const sqlArr = [];
	handleHttp.Func(sql, sqlArr, res, code = [1, 0], msg = ['查询成功', "查询失败"])
}

avatarImgUpload = async (req, res) => {
	if (req.file) {
		// const sql = `update users set avatar=?, updated_at=? where user_name='${req.data.userName}'`;
		// const sqlArr = [`${global.URL}/public/uploads/ava/` + req.file.filename, moment().format('YYYY-MM-DD HH:mm:ss')];
		// handleHttp.func(sql, sqlArr)
		res.send({
			data: `${global.URL}/public/uploads/ava/` + req.file.filename,
			code: 1,
			msg: '头像上传成功'
		})
	} else {
		res.send({
			data: Date.now(),
			code: 0,
			msg: 'avatarImgUpload函数错误'
		})
	}
}


module.exports = {
	login,
	getAttribute,
	avatarImgUpload
}
