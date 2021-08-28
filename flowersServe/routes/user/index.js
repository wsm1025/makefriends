const express = require('express');
const path = require('path');
const router = express.Router();
const user = require("../../dbControllers/user/index")
const multer = require('multer')
let upload = multer({
	storage:multer.diskStorage({
		destination:(req,file,cb)=>{
			cb(null, path.join((path.resolve(__dirname, '../../') + "/public/uploads/ava")))
		},
		filename:(req,file,cb)=>{
			var changedName = (new Date().getTime())+'-'+file.originalname;
			cb(null, changedName)
		}
	})
})
router.post('/login',user.login)//登录
router.get('/getAttribute',user.getAttribute)//获取字段
router.post('/avatarImgUpload',upload.single('file'),user.avatarImgUpload)//头像上传
router.post('/updateInfo',user.updateInfo)//用户数据更新
router.post('/getPasswrod',user.getPasswrod)//用户密码查询
router.post('/updatePassword',user.updatePassword)//更新密码
router.post('/register',user.register)//注册
router.post('/checkEmail',user.checkEmail)//检查邮箱  
router.post('/updatePasswordFromCode',user.updatePasswordFromCode)//验证码更新账户






module.exports = router;
