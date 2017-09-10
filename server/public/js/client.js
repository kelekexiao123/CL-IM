
// const socket = io('http://localhost:5000', { // 指定后台的url地址
//   transports: ['websocket'],
//   path: '/router', // 如果需要的话添加 path 路径以及其他可选项
// })

const socket = io.connect('http://localhost:5000')
let userName = '访客某某'
socket.on('connect', function () {
  userName = prompt('请输入你的姓名?') || userName
  socket.emit('join', userName)
})
socket.on('chat', function (user, data) {
  let p = document.createElement('tr')
  let direct = 'align-left'
  if (user === userName) {
    direct = 'align-right'
    p.innerHTML = '<td><span><span >' + data + '</span> <span>' + user + '</span></td><span></span>'
  } else {
    p.innerHTML = '<td><span> <span>' + user + '</span>   <span>' + data + '</span><span></span></td>'
  }
  p.className = direct
  $('#content').appendChild(p)
})

$('#send').addEventListener('click', function (target) {
  let content = $('#textContent').innerHTML.replace(' ', '')
  if (content) {
    socket.emit('sendMsg', content)
    $('#textContent').innerHTML = ''
  }
})

function $(flag) {
  return document.querySelector(flag)
}
