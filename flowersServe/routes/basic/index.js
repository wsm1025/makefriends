const express = require('express');
const router = express.Router();
const basic = require("../../dbControllers/basic/index")
router.get('/iconfont',basic.getIcon)//登录
module.exports = router;
