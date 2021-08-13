const express = require('express');
const router = express.Router();
const user = require("../../dbControllers/user/index")
router.post('/login',user.login)//登录
module.exports = router;
