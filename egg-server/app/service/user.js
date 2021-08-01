'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  async find(id) {
    const user = await this.app.mysql.get('users', { id });
    return { user };
  }
  async findAll(table) {
    const user = await this.app.mysql.select(table);
    return { user };
  }
  async delData(id) {
    const user = await this.app.mysql.delete('users', { id });
    return { user };
  }
  async updateData(rows) {
    const user = await this.app.mysql.update('users', rows);
    return { user };
  }
  async createData(rows) {
    const user = await this.app.mysql.insert('users', rows);
    return { user };
  }
}
module.exports = UserService;
