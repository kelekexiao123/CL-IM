const UserSQL = {
  insert: 'INSERT INTO User(account,password,name,avatar) VALUES(?,?,?,?)',
  queryAll: 'SELECT * FROM user',
  getUserByAccount: 'SELECT * FROM User WHERE account = ? ',
}
module.exports = UserSQL
