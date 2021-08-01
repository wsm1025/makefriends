'use strict';
const dayjs = require('dayjs');
const Controller = require('egg').Controller;

class UserController extends Controller {
  constructor(app) {
    super(app);
    this.UserCreateRule = {
      userName: {
        type: 'string',
        require: true,
        allowEmpty: false,
      },
      passWord: {
        type: 'password',
        require: true,
        allowEmpty: false,
        min: 5,
      },
    };
  }
  async index() {
    const { id } = this.ctx.request.query;
    let res;
    if (id === 'all') {
      res = await this.ctx.service.user.findAll('users');
    } else {
      res = await this.ctx.service.user.find(id);
    }
    this.ctx.helper.success({
      msg: '查询成功',
      res: res.user,
    });
  }

  async create() {
    const { userName, passWord } = this.ctx.request.body;
    console.log(this.ctx.validate(this.UserCreateRule));
    const rows = {
      user_name: userName,
      pass_word: passWord,
      created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    const result = await this.ctx.service.user.createData(rows);
    if (result.user.affectedRows === 1) {
      this.ctx.body = {
        code: 1,
        msg: '添加数据成功',
      };
    } else {
      this.ctx.body = {
        code: 0,
        msg: '添加数据失败',
      };
    }
  }
  async destroy() {
    const { id } = this.ctx.params;
    const result = await this.ctx.service.user.delData(id);
    if (result.user.affectedRows === 1) {
      this.ctx.body = {
        code: 1,
        msg: '删除成功',
      };
    } else {
      this.ctx.body = {
        code: 0,
        msg: '删除失败',
      };
    }
  }
  async update() {
    const { id } = this.ctx.params;
    const { passWord } = this.ctx.request.body;
    const rows = {
      id,
      pass_word: passWord,
    };
    const result = await this.ctx.service.user.updateData(rows);
    if (result.user.affectedRows === 1) {
      this.ctx.body = {
        code: 1,
        msg: '更新成功',
      };
    } else {
      this.ctx.body = {
        code: 0,
        msg: '更新失败',
      };
    }
  }

}

module.exports = UserController;
