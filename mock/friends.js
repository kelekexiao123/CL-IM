const qs = require('qs')
const mockjs = require('mockjs')  // 导入mock.js的模块
const Random = mockjs.Random  // 导入mock.js的随机数

// 数据持久化   保存在global的全局变量中
let friendsListData = {}

if (!global.friendsListData) {
  const data = mockjs.mock({
    '250407778|10': [{
      'account|+1': ['307416054', '245723047', '111111111', '222222222', '333333333', '444444444', '555555555', '666666666', '777777777', '888888888'],
      'name': () => {
        return Random.cname()
      },
      'avatar': 'https://raw.githubusercontent.com/kelekexiao123/blog-storage/master/avatar.jpg',
      'online|0-1': 1,
      'group|1': ['default', '家人', '朋友'],
    }],
    '307416054|10': [{
      'account|+1': ['245723047', '250407778', '111111111', '222222222', '333333333', '444444444', '555555555', '666666666', '777777777', '888888888'],
      'name': () => {
        return Random.cname()
      },
      'avatar': 'https://raw.githubusercontent.com/kelekexiao123/blog-storage/master/avatar.jpg',
      'online|0-1': 1,
      'group|1': ['default', '家人', '朋友'],
    }],
    '245723047|10': [{
      'account|+1': ['307416054', '250407778', '111111111', '222222222', '333333333', '444444444', '555555555', '666666666', '777777777', '888888888'],
      'name': () => {
        return Random.cname()
      },
      'avatar': 'https://raw.githubusercontent.com/kelekexiao123/blog-storage/master/avatar.jpg',
      'online|0-1': 1,
      'group|1': ['default', '家人', '朋友'],
    }],
  })
  friendsListData = data
  global.friendsListData = friendsListData
} else {
  friendsListData = global.friendsListData
}

module.exports = {
  // post请求  /api/users/ 是拦截的地址   方法内部接受 request response对象
  'GET /api/friends'(req, res) {
    let data
    const query = qs.parse(req.query)
    for (let account in friendsListData) {
      if (account === query.account) {
        data = friendsListData[account]
      }
    }

    setTimeout(() => {
      res.json({      // 将请求json格式返回
        success: true,
        data,
      })
    }, 200)
  },
}