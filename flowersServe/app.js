var createError = require('http-errors');
var express = require('express');
var expressJwt = require('express-jwt')
const bodyParser = require("body-parser")
var path = require('path');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var logger = require('morgan');
//引入token文件
var vertoken = require('./util/token_vertify.js');

var usersRouter = require('./routes/users');
var thingsRouter = require('./routes/things.js');
var phoneRouter = require('./routes/phone.js');

var app = express();

//跨域
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header("Access-Control-Allow-Headers", "content-type,Authorization");
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
	res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
	next();
})
//改写入口文件
var http = require('http');
var server = http.createServer(app);

app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());

app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json()) //添加这个 后端才能获取请求数据
app.use(function(req,res,next){
    var list= /^(\/public)/g;//设置指定文件目录
    var suffix=/(\.jpg|\.gif|\.jpeg|\.png|\.js|\.css|\.xlsx|\.JPG)$/g;//后缀格式指定
    if(list.test(req.path)&&!suffix.test(req.path)){
        return res.status(403).send({
			"code":403,
			"text":"forbidden"
		});
    }else{
        next();
    }
});
app.use('/public',express.static(path.join(__dirname,'public')));//将文件设置成静态
// 解析token获取用户信息
app.use(function(req, res, next) {
	var token = req.headers['authorization'];
	if (token == undefined) {
		return next();
	} else {
		vertoken.verToken(token).then((data) => {
			req.data = data;
			return next();
		}).catch((error) => {
			return next();
		})
	}
});
//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
	secret: 'sl_vue_pc',
	algorithms: ['HS256']
}).unless({
	path: ['/api/users/login','/api/phone/login','/api/users/register','/api/phone/getIconfont','/api/phone/salesThings','/api/phone/updateImg','/api/phone/getDetail','/api/phone/cateList','/api/phone/SearChData'] //除了这些地址，其他的URL都需要验证
}));
app.use('/api/users', usersRouter);
app.use('/api/things', thingsRouter);
app.use('/api/phone', phoneRouter);

// 当token失效返回提示信息
app.use(function(err, req, res, next) {
	// console.log(err);
   if (err.inner.message == "jwt expired") {
		return res.status(200).send({text:"toke过期",code:'403'});
	} else{
		return res.status(200).send({text:"toke验证失败",code:'401'});
	}
});


server.listen('3000', () => {
	console.log('服务启动');
})
