const qs = require('qs')
const mockjs = require('mockjs')

let chattingData = {}

if (!global.chattingData) {
  const data = mockjs.mock({
    'data': [
      {
        'account1|+1': '250407778',
        'account2|+1': '307416054',
        'data|10': [{
          'user|1': ['250407778', '307416054'],
          'htmlContent': /[\u4e00-\u9fa5]{2,100}/
        }],
        total: 10,
      },
      {
        'account1': '250407778',
        'account2': '245723047',
        'data|7': [{
          'user|1': ['250407778', '245723047'],
          'htmlContent': /[\u4e00-\u9fa5]{2,100}/
        }],
        total: 7,
      },
      {
        'account1': '111111111',
        'account2': '250407778',
        'data|5': [{
          'user|1': ['111111111', '250407778'],
          'htmlContent': /[\u4e00-\u9fa5]{2,100}/
        }],
        total: 5,
      },
      {
        'account1': '222222222',
        'account2': '250407778',
        'data|5': [{
          'user|1': ['222222222', '250407778'],
          'htmlContent': /[\u4e00-\u9fa5]{2,100}/
        }],
        total: 5,
      },
      {
        'account1': '333333333',
        'account2': '250407778',
        'data|5': [{
          'user|1': ['333333333', '250407778'],
          'htmlContent': /[\u4e00-\u9fa5]{2,100}/
        }],
        total: 5,
      },
      {
        'account1': '444444444',
        'account2': '250407778',
        'data|5': [{
          'user|1': ['444444444', '250407778'],
          'htmlContent': /[\u4e00-\u9fa5]{2,100}/
        }],
        total: 5,
      },
      {
        'account1': '555555555',
        'account2': '250407778',
        'data|5': [{
          'user|1': ['555555555', '250407778'],
          'htmlContent': /[\u4e00-\u9fa5]{2,100}/
        }],
        total: 5,
      },
      {
        'account1': '666666666',
        'account2': '250407778',
        'data|5': [{
          'user|1': ['666666666', '250407778'],
          'htmlContent': /[\u4e00-\u9fa5]{2,100}/
        }],
        total: 5,
      },
      {
        'account1': '777777777',
        'account2': '250407778',
        'data|5': [{
          'user|1': ['777777777', '250407778'],
          'htmlContent': /[\u4e00-\u9fa5]{2,100}/
        }],
        total: 5,
      },
    ]
  })
  chattingData = data.data
  global.chattingData = chattingData
} else {
  chattingData = global.chattingData
}

module.exports = {
  'GET /api/chatting'(req, res) {
    const query = qs.parse(req.query)
    const fromUser = query.account
    const toUser = query.toAccount
    let data = []
    let total = 0
    for (let i = 0; i < chattingData.length; i++) {
      if ((fromUser === chattingData[i].account1 && toUser === chattingData[i].account2) || (fromUser === chattingData[i].account2 && toUser === chattingData[i].account1)) {
        data = chattingData[i].data
        total = chattingData[i].total
      }
    }
    setTimeout(() => {
      res.json({
        method: 'GET',
        success: true,
        data,
        total
      })
    }, 200)
  },

  'PUT /api/chatting'(req, res) {
    const query = qs.parse(req.query)
    const fromUser = query.account
    const toUser = query.toAccount
    const htmlContent = query.msg
    let flag = 0
    let chatObj = null
    for (let i = 0; i < chattingData.length; i++) {
      if ((fromUser === chattingData[i].account1 && toUser === chattingData[i].account2) || (fromUser === chattingData[i].account2 && toUser === chattingData[i].account1)) {
        chatObj = chattingData[i]
        flag = 1
      }
    }
    if (!flag) {
      chatObj = {
        'account1': fromUser,
        'account2': toUser,
        'data': [],
        total: 0,
      }
      chattingData.push(chatObj)
    }
    chatObj.data.push({
      user: fromUser,
      htmlContent: htmlContent
    })
    chatObj.total++
    res.json({
      method: 'PUT',
      success: true,
    })
  },
}