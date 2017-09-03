const qs = require('qs');
const mockjs = require('mockjs');

const Random = mockjs.Random; 

let chattingData = {};

if (!global.chattingData) {
  const data = mockjs.mock({
    'data|100': [{
      'user|1': ['Duang', '张秘书', '小厨娘', '她'],
      'htmlContent':/[\u4e00-\u9fa5]{2,100}/
    }],
    total: 100,
  });
  chattingData = data;
  global.chattingData = chattingData;
} else {
  chattingData = global.chattingData;
}

module.exports = {
  'GET /api/chatting'(req, res) {
    const users = qs.parse(req.query);
    const allData = chattingData.data;
    const total = chattingData.total;

    const start = Math.floor(Math.random() * 90)
    const data = allData.slice(start, start+10)

    setTimeout(() => {
      res.json({
        success: true,
        data,
        total
      });
    }, 200);
  },
}