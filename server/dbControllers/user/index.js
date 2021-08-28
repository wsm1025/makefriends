//查询用户
const userModel = require('../../model/user')
const handleHttp = require('../../util/handleHttp')
const Token = require('../../util/token_vertify')
const global = require('../../config')
const moment = require('moment')
const Mail = require('../../util/sendEmail')
//生成随机数
function RandNuM(key) {
	return Number((Math.pow(10, key) * Math.random() * 10).toFixed(0))+''
}
function Send(res, data, code, msg, info = '') {
	return res.send({
		data,
		code,
		msg,
		info
	})
}
function insertCode(user_name, code){
	const sql = userModel.UPDATECODE;
	const sqlArr  = [code,user_name];
	handleHttp.func(sql, sqlArr);
}

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
	const sql = `select ${arr} from users WHERE id='${req?.query?.id}'`
	const sqlArr = [];
	handleHttp.Func(sql, sqlArr, res, code = [1, 0], msg = ['查询成功', "查询失败"])
}

avatarImgUpload = async (req, res) => {
	if (req.file) {
		// const sql = `update users set avatar=?, updated_at=? where user_name='${req.data.userName}'`;
		// const sqlArr = [`${global.URL}/public/uploads/ava/` + req.file.filename, moment().format('YYYY-MM-DD HH:mm:ss')];
		// handleHttp.func(sql, sqlArr)
		Send(res,`${global.URL}/public/uploads/ava/` + req.file.filename,1,'头像上传成功','')
	} else {
		Send(res, Date.now(), 0 ,'avatarImgUpload函数错误', '')
	}
}
updateInfo = async (req, res) => {
	let key = req.body;
	const sql = userModel.UPDATE;
	// update users set updated_at=?, avatar=?,birthday=?,home=?,label=?,sex=?,signature=?,age=? where user_name=
	const sqlArr = [key.email, moment().format('YYYY-MM-DD HH:mm:ss'), key.avatar[0].url, moment(key.birthday).format('YYYY-MM-DD'), key.home, key.label, key.sex - 0, key.signature, key.age, `${req.data.userName}`]
	handleHttp.Func(sql, sqlArr, res, code = [1, 0], msg = ['更新数据成功', "更新数据失败"])
}
getPasswrod = async (req, res) => {
	const sql = userModel.PASSWORD;
	const sqlArr = [`${req.data.userName}`, `${req.body.password}`]
	handleHttp.Func(sql, sqlArr, res, code = [1, 0], msg = ['查询密码成功', "查询密码失败"])
}
updatePassword = async (req, res) => {
	const sql = userModel.PASSWORDUPDATE;
	const sqlArr = [req.body.pass_word, moment().format('YYYY-MM-DD HH:mm:ss'), `${req.data.userName}`]
	handleHttp.Func(sql, sqlArr, res, code = [1, 0], msg = ['更新密码成功', "更新密码失败"])
}
register = async (req, res) => {
	const sql = userModel.REGISTER;
	const sqlArr = [req.body.user_name, req.body.pass_word, moment().format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss'), null, 'https://img1.baidu.com/it/u=1834859148,419625166&fm=26&fmt=auto&gp=0.jpg', 1, 18, null, moment().format('YYYY-MM-DD'), '', '新用户']
	const sql1 = `select * from users WHERE user_name='${req.body.user_name}'`
	const sqlArr1 = [];
	const sql2 = userModel.CODE;
	const sqlArr2 = [RandNuM(5), `${req.body.user_name}`];
	const e = await handleHttp.func(sql1, sqlArr1);
	if (e.length) {
		Send(res, null, 0 ,'该名字已有人注册', '')
	} else {
		const result = await handleHttp.func(sql2, sqlArr2);
		if (result.affectedRows) {
			handleHttp.Func(sql, sqlArr, res, code = [1, 0], msg = ['注册成功', "注册失败"])
		} else {
		Send(res, null, 0 ,'注册验证码失败', '')
		}
	}
}
checkEmail = async (req, res) => {
	const sql = `select email from users where user_name =?`
	const sqlArr = [`${req.body.user_name}`]
	const result = (await handleHttp.func(sql, sqlArr))[0];
	if (result?.email) {
		sendEmail(res,result.email, RandNuM(5), req.body.user_name)
	} else {
		Send(res, null, 0 ,'该用户无邮箱', '')
	}
}
sendEmail = (res,email, code , user_name) => {
	Mail.sendMail(email, code, (state) => {
		if (state) {
			// 存入code
			insertCode(user_name, code)
			Send(res, null, 1 ,'发送验证码成功', '')
			setTimeout(() => {
				insertCode(user_name, RandNuM(5))
			}, 60000);
		} else {
			Send(res, null, 1 ,'发送验证码失败', '')
		}
	})
}
updatePasswordFromCode = async (req,res) => {
	const sql = userModel.UPDATEPASSWORDFROMCODE;
	const sqlArr = [req.body.pass_word,req.body.code,req.body.user_name];
	const e = await handleHttp.func(sql, sqlArr);
	if(e.affectedRows){
		Send(res, null, 1 ,'密码更新成功', '')
	}else{
		Send(res, null, 0 ,'密码未更新', '')
	}

}


module.exports = {
	login,
	getAttribute,
	avatarImgUpload,
	updateInfo,
	getPasswrod,
	updatePassword,
	register,
	checkEmail,
	updatePasswordFromCode
}