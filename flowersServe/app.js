const createError = require('http-errors');
const express = require('express');
const expressJwt = require('express-jwt')
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

//引入token文件
const vertoken = require('./util/token_vertify.js');

const usersRouter = require('./routes/user');

const app = express();
//跨域
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header("Access-Control-Allow-Headers", "content-type,Authorization");
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
	res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
	next();
})
//改写入口文件
const http = require('http');
const server = http.createServer(app);

app.use(cookieParser());

app.use(express.urlencoded({
	extended: true
}))
app.use(express.json()) //添加这个 后端才能获取请求数据
app.use(function(req,res,next){
    const list= /^(\/public)/g;//设置指定文件目录
    const suffix=/(\.jpg|\.gif|\.jpeg|\.png|\.js|\.css|\.xlsx|\.JPG)$/g;//后缀格式指定
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
	const token = req.headers['authorization'];
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
	path: ['/api/users/login'] //除了这些地址，其他的URL都需要验证
}));

app.use('/api/users', usersRouter);
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
