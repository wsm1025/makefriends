var express = require('express');
var router = express.Router();
var phone = require("../dbControllers/phone/indexControllers.js")
var user = require("../dbControllers/phone/userControllers.js")
router.get('/getIconfont',phone.getIconfont)//获取icon
router.get('/salesThings',phone.salesThings)//获取列表
router.get('/getDetail',phone.getDetail)//获取详情
router.post('/login',phone.login)//登录
router.post('/Addaddress',user.Addaddress)//添加地址
router.post('/Getaddress',user.Getaddress)//查询地址
router.get('/GetOneaddress',user.GetOneaddress)//查询一个地址Deladdress
router.post('/Deladdress',user.Deladdress)//查询一个地址
router.post('/Updateaddress',user.Updateaddress)//更新地址
router.post('/UpdataOrder',user.UpdataOrder)//订单保存
router.get('/SearChData',user.SearChData)//搜索
router.post('/detailInfo',user.detailInfo)//个人信息查询
router.post('/updateInfo',user.updateInfo)//修改个人信息
router.post('/updateImg',user.updateImg)//修改头像
router.post('/getOrderList',user.getOrderList)//个人订单
router.get('/getOneOrderDeatil',user.getOneOrderDeatil)//获取一个订单
router.get('/cateList',user.cateList)//获取cate分类
router.post('/productHistory',user.productHistory)//生成历史
router.get('/getHistory',user.getHistory)//获取历史
router.post('/delHistory',user.delHistory)//删除历史

module.exports = router;
