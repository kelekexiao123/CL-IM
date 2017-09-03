const qs = require('qs');
const mockjs = require('mockjs');  //导入mock.js的模块

const Random = mockjs.Random;  //导入mock.js的随机数

// 数据持久化   保存在global的全局变量中
let userListData = {};

if (!global.userListData) {
  const data = mockjs.mock({
    'groups': ['default', '家人', '朋友'],
    'data|10': [{
      'id': () => {
        return Random.id()
      },
      'account': /\d{8,10}/,
      'password': /\w{9,19}/,
      'group|1': ['default', '家人', '朋友'],
      'name': () => {
        return Random.cname();
      },
      'mobile': /1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}/,
      'avatar': '@image',
      'isOnline|0-1': 1,
      'email': '@account' + '\@qq.com',
      'lastLogin_at': () => {
        return Random.datetime('yyyy-MM-dd HH:mm:ss');
      },
    }],
    total: 10,
  });
  userListData = data;
  global.userListData = userListData;
} else {
  userListData = global.userListData;
}

module.exports = {
  //post请求  /api/users/ 是拦截的地址   方法内部接受 request response对象
  'GET /api/users'(req, res) {
    const users = qs.parse(req.query);
    const groups = userListData.groups;
    const data = userListData.data;
    const total = userListData.total;

    setTimeout(() => {
      res.json({      //将请求json格式返回
        success: true,
        groups,
        data,
        total,
      });
    }, 200);
  },
}