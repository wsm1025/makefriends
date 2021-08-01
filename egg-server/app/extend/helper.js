'use strict';
const dayjs = require('dayjs');
module.exports = {
  success({ res = null, msg = '请求成功' }) {
    this.ctx.body = {
      code: 200,
      data: res,
      msg,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    this.ctx.status = 200;
  },
};
