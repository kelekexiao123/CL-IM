import * as chattingService from '../services/chatting'
import io from 'socket.io-client'

export default {
  namespace: 'chatting',
  state: {
    socket: {},
    currentTab: '',
    editorContent: '',
    htmlContent: '',
    chattingData: [],
    toUser: {},
    total: null
  },
  reducers: {
    load(state, { payload: { data, total, user, tab }, }) {
      tab = tab || state.currentTab
      return {
        ...state,
        chattingData: data,
        total,
        toUser: user,
        currentTab: tab,
      }
    },
    setSocket(state, { payload: { socket }}) {
      return {
        ...state,
        socket
      }
    },
    // changeTab(state, { payload: { user, tab }, }) {
    //   tab = tab || state.currentTab
    //   return {
    //     ...state,
    //     toUser: user,
    //     currentTab: tab,
    //   }
    // },
    sendMsg(state, { payload: appendData }) {
      const { fromUser, toUser, htmlContent, } = appendData
      return {
        ...state,
        chattingData: state.chattingData.concat({ user: fromUser, htmlContent, })
      }
    }
  },
  effects: {
    * fetchChattingMsg({ payload: { user, tab }, }, { select, call, put }) {
      const account = yield select(state => state.users.self.account)
      const { data, total } = yield call(chattingService.fetch, { account, toAccount: user.account })
      yield put({
        type: 'load',
        payload: { data, total, user, tab }
      })
    },
    * putChattingMsg({ payload: appendData }, { select, call, put }) {
      const { fromUser, toUser, htmlContent } = appendData
      let socket = yield select(state => state.chatting.socket)
      socket.emit('sendPrivateMsg', fromUser, toUser, htmlContent)  //发送socket事件
      let response = yield call(chattingService.put, { account: fromUser, toAccount: toUser, message: htmlContent })
      if (response.success) {
        yield put({
          type: 'sendMsg',
          payload: appendData
        })
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/main') {
          const socket = io('http://localhost:5000')
          const userName = query.account
          socket.on('connect', function () {
            socket.emit('join', userName)
          })
          socket.on('to' + userName, function (data) {
            if (userName !== data.from) {
              console.log(userName, '收到来自', data.from, '的消息：', data.message)
              dispatch({ type: 'fetchChattingMsg', payload: { user: { account: userName }, tab: data.from } })
            } else {
              console.log('发送成功！')
            }
          })
          dispatch({ type: 'setSocket', payload: { socket }})
        }
      })
    },
  },
}
