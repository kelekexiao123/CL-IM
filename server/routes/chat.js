let express = require('express')
let router = express.Router()
let socket_io = require('socket.io')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

let users = {}

router.prepareSocketIO = function (server) {
  let io = socket_io.listen(server)

  io.sockets.on('connection', function (socket) {
    // var url = socket.request.headers.referer
    socket.on('join', function (user) {
      socket.user = user
      if (!users[user]) {
        users[user] = socket
        // socket.emit('state', 'SERVER', true)
        // socket.broadcast.emit('state', 'SERVER', user + '上线了')
        console.log(user, '上线')
      }
      let count = 0
      console.log('当前在线用户：')
      for (let i in users) {
        if (users.hasOwnProperty(i)) {
          console.log(i)
          count++
        }
      }
      console.log('在线人数：', count)
    })

    socket.on('sendPrivateMsg', function (from, to, msg) {
      if (to in users) {
        users[to].emit('to' + to, { from: from, message: msg })   // 给对方
        users[from].emit('to' + from, { from: from, message: msg }) // 给自己
      }
      console.log('收到了', from, '给', to, '的私聊信息', msg)
      // socket.broadcast.emit('chat', socket.user, msg)
    })

    socket.on('disconnect', function () {
      console.log(this.user, '下线')
      delete users[this.user];
    })
  })


}

module.exports = router