module.exports = user = {
  'LOGIN': 'select id, user_name,email,avatar,sex,age,signature,birthday,home,label from users WHERE user_name=? AND pass_word=?',
  'UPDATE': 'update users set email=?, updated_at=?, avatar=?,birthday=?,home=?,label=?,sex=?,signature=?,age=? where user_name=?',
  'PASSWORD': 'select id FROM users where user_name=? AND pass_word=?',
  'PASSWORDUPDATE': 'update users set pass_word=?, updated_at=? where user_name=?',
  'REGISTER': 'insert into users(user_name,pass_word,created_at,updated_at,email,avatar,sex,age,signature,birthday,home,label) value(?,?,?,?,?,?,?,?,?,?,?,?)',
  'CODE': 'insert into code(code,user_name) value(?,?)',
  'UPDATECODE': 'update code set code=? where user_name=?',
  'UPDATEPASSWORDFROMCODE': 'UPDATE users SET pass_word=? where user_name in (select user_name FROM code where code = ? AND user_name= ?)',
  'PUBLISH': "insert into publish(user_name,content,weather,imgs,position,isDel,isEdit,create_time,update_time) value(?,?,?,?,?,?,?,?,?)",
  'PUBLISHDETAIL': "select * from publish where isDel='false' limit ?,?",
  'PUBLISHONEDETAIL': "select * from publish where id=? and isDel='false'",
  'DELPUBLISH': "update publish set isDel=?,update_time=? where id=?",
  'PUBLISHEDIT':'update publish set content=?, weather=?,imgs=?,position=?,isEdit=?,update_time=? where id=?'
}