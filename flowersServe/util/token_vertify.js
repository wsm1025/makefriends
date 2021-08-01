var jwt = require('jsonwebtoken');
var signkey = 'sl_vue_pc';

exports.setToken = function(userName,passWord){
	return new Promise((resolve,reject)=>{
		const token = jwt.sign({
			userName,
			passWord
		},signkey,{ expiresIn:'5h'});
		resolve(token);
	})
}

exports.verToken = function(token){
	return new Promise((resolve,reject)=>{
		var info = jwt.verify(token.split(' ')[1],signkey);
		resolve(info);
	})
}