 module.exports =  user = {
  'LOGIN':'select id, user_name,email,avatar,sex,age,signature,birthday,home,label from users WHERE user_name=? AND pass_word=?',
  'UPDATE':'update users set email=?, updated_at=?, avatar=?,birthday=?,home=?,label=?,sex=?,signature=?,age=? where user_name=?',
  'PASSWORD':'select id FROM users where user_name=? AND pass_word=?',
  'PASSWORDUPDATE':'update users set pass_word=?, updated_at=? where user_name=?',
  'REGISTER':'insert into users(user_name,pass_word,created_at,updated_at,email,avatar,sex,age,signature,birthday,home,label) value(?,?,?,?,?,?,?,?,?,?,?,?)',
  'CODE':'insert into code(code,user_name) value(?,?)',
  'UPDATECODE':'update code set code=? where user_name=?',
  'UPDATEPASSWORDFROMCODE':'UPDATE users SET pass_word=? where user_name in (select user_name FROM code where code = ? AND user_name= ?)',
}