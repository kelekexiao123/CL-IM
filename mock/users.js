const qs = require('qs')
const mockjs = require('mockjs')
const Random = mockjs.Random  // 导入mock.js的随机数

let userListData = {}

if (!global.userListData) {
  const data = mockjs.mock({
    'data|10': [{
      'groups': ['default', '家人', '朋友'],
      'id': () => {
        return Random.id()
      },
      'account|+1': ['250407778', '307416054', '245723047', '111111111', '222222222', '333333333', '444444444', '555555555', '666666666', '777777777', '888888888'],
      'password': /\w{9,19}/,
      'name': () => {
        return Random.cname()
      },
      'mobile': /1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}/,
      'avatar': 'https://raw.githubusercontent.com/kelekexiao123/blog-storage/master/avatar.jpg',
      'online|0-1': 1,
      'email': '@account\@qq.com',
      'lastLogin_at': () => {
        return Random.datetime('yyyy-MM-dd HH:mm:ss')
      },
    }],
    total: 10,
  })
  userListData = data
  global.userListData = userListData
} else {
  userListData = global.userListData
}

module.exports = {
  'GET /api/users'(req, res) {
    const query = qs.parse(req.query)
    const account = query.account
    let usersArr = userListData.data
    let data
    for (let i = 0; i < usersArr.length; i++) {
      if (account === usersArr[i].account) {
        data = usersArr[i]
      }
    }

    setTimeout(() => {
      res.json({
        success: true,
        data,
      })
    }, 200)
  },
}