 module.exports =  user = {
  'LOGIN':'select user_name,email,avatar,sex,age,signature,birthday,home,label from users WHERE user_name=? AND pass_word=?',
  'UPDATE':'update users set email=?, updated_at=?, avatar=?,birthday=?,home=?,label=?,sex=?,signature=?,age=? where user_name=?',
  'PASSWORD':'select id FROM users where user_name=? AND pass_word=?',
  'PASSWORDUPDATE':'update users set pass_word=?, updated_at=? where user_name=?'
}