const express = require('express');
const router = express.Router();
const user = require("../../dbControllers/user/index")
router.post('/login',user.login)//登录
router.get('/getAttribute',user.getAttribute)//获取字段

module.exports = router;
