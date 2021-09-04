var jwt = require('jsonwebtoken');
var signkey = 'wsm_react_salt_981025';

exports.setToken = function(userName,passWord){
	return new Promise((resolve,reject)=>{
		const token = jwt.sign({
			userName,
			passWord
		},signkey,{ expiresIn:'3h'});
		resolve(token);
	})
}

exports.verToken = function(token){
	return new Promise((resolve,reject)=>{
		var info = jwt.verify(token.split(' ')[1],signkey);
		resolve(info);
	})
}