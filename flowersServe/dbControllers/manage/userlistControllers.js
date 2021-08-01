var dbConfig = require('../../util/dbconfig');
var moment = require('moment');
var salt = require("crypto-js");
//查询用户
getUserList = async (req, res) => {
	if (req.query.number >= 1) { //分页器查询数据库
		req.query.number = (req.query.number - 1) * req.query.size
	}
	if (req.query.type == "search") {
		if (req.query.query == '') {
			var sql =
				`select id,user_id,sex,create_time,IsSuperAdmin,IsAdmin,Introduction,nickname,img_url from users  LIMIT ${req.query.number},${req.query.size}`;
		} else {
				var sql =
					`select id,user_id,sex,create_time,IsSuperAdmin,IsAdmin,Introduction,nickname,img_url from users where  user_id like "%${req.query.query}%" LIMIT ${req.query.number},${req.query.size}`;
		}
	}
	var sqlArr = [];
	let number;
	if(!req.query.query.length){//没有参数，走true
		 number = (await getUserAllNumber(1))[0].number;
	}else{
		 number = (await getUserAllNumber(0,req.query.query))[0].number;
	}
	var cb = async (err, data) => {
		res.send({
			"data": data,
			"number": number,
			"code": 200,
			"text": "用户获取成功"
		})
	}
	dbConfig.sqlConnection(sql, sqlArr, cb)
}

function getUserAllNumber(flag,rules=null) {
	if(flag==1){
		var sql = `SELECT COUNT(*) number FROM users`;
	}else{
		var sql = `SELECT COUNT(*) number FROM users where user_id like "%${rules}%"`;
	}
	var sqlArr = [];
	return dbConfig.SySqlConnect(sql, sqlArr);
}
delUsers = async (req, res) => {
	if (req.user.userName !== "admin") {
		res.send({
			"code": 0,
			"text": "没有权限"
		})
	} else {
		let sql = `DELETE FROM users WHERE Id='${req.body.Id}'`;
		let sqlArr = [];
		let data = await dbConfig.SySqlConnect(sql, sqlArr);
		if (data.affectedRows == 1) {
			res.send({
				"code": 201,
				"text": "删除成功"
			})
		}
	}
}
addUser = async (req, res) => {
	let sex = req.body.sex=="false"?"女":"男";
	let IsSuperAdmin = !req.body.IsSuperAdmin?"false":"true";
	let IsAdmin = !req.body.IsAdmin?"false":"true";
	var date = moment().format("YYYY-MM-DD HH:mm:ss");
	var password = salt.MD5(`${req.body.password}`);
	let sql =
		`insert into users(user_id,user_pw,create_time,IsSuperAdmin,IsAdmin,Introduction,nickname,img_url,sex) value(?,?,?,?,?,?,?,?,?)`;
	let sqlArr = [req.body.Name,`${password}`,date,`${IsSuperAdmin}`,`${IsAdmin}`,req.body.Introduction||'此人比较高冷，啥也没填',req.body.nickname||'昵称什么的最难了',req.body.img_url||'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3324287611,3832720410&fm=26&gp=0.jpg',`${sex}`];
	let data = await dbConfig.SySqlConnect(sql, sqlArr);
	if (data.affectedRows == 1) {
		res.send({
			"code": 201,
			"text": "添加数据成功"
		})
	} else {
		return res.send({
			"text":"addUser错误",
			"code":500
		})
	}
}
editUsers =async(req,res)=>{
	var updata = req.body;
	let sex = updata.sex == true?'男':'女'; 
	let IsAdmin = updata.IsAdmin == false?'否':'是';
	let IsSuperAdmin = updata.IsSuperAdmin == false?'否':'是';
	let sql = `update users set user_id='${updata.Name}', sex = '${sex}',IsAdmin = '${updata.IsAdmin}',IsSuperAdmin = '${updata.IsSuperAdmin}', nickname = '${updata.nickname}', img_url = '${updata.img_url}',Introduction = '${updata.Introduction}'  where Id =${updata.id}`;
	  let sqlArr=[];
		let data = await dbConfig.SySqlConnect(sql,sqlArr);
		if(data.affectedRows == 1){
			res.send({
				"code": 201,
				"text": "更改数据成功"
			})
		}else{
			res.send({
				"code": 0,
				"text": "更改数据失败"
			})
		}
	
}
//提供外部调用方法(ok)
getOneInfo = (req, res) => {
	var sql = `select ${req.query.params} from users where user_id ="${req.user.userName}" `;
	var sqlArr = [];
	var cb = async (err, data) => {
		if (err) {
			res.send({
				"data": '关键字段错误'
			})
		}else {
			if (data.length == 0) {
				res.send({
					"code": 200,
					"data": "暂无该用户"
				})
				return;
			}
			res.send({
				"data": data,
				"code": 200,
				"text": '请求成功'
			})
		}
	}
	dbConfig.sqlConnection(sql, sqlArr, cb)
}
module.exports = {
	getUserList,
	delUsers,
	addUser,
	editUsers,
	getOneInfo
}
