import * as chattingService from '../services/chatting'
import io from 'socket.io-client'

export default {
  namespace: 'chatting',
  state: {
    socket: {},
    alertMsg: {},
    currentTab: '',
    editorContent: '',
    htmlContent: '',
    chattingData: [],
    toUser: {},
    total: null
  },
  reducers: {
    load(state, { payload: { data, total, user, tab }, }) {
      let newTab = tab || state.currentTab
      return {
        ...state,
        chattingData: data,
        total,
        toUser: user,
        currentTab: newTab,
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
    addMsg(state, { payload: appendData }) {
      const { fromUser, htmlContent, } = appendData
      return {
        ...state,
        chattingData: state.chattingData.concat({ user: fromUser, htmlContent, }),
        total: state.total + 1,
      }
    },
    newMsgAlert(state, { payload: msgData }) {
      const { from, message } = msgData
      return {
        ...state,
        alertMsg: {
          from,
          description: message
        }
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
      socket.emit('sendPrivateMsg', fromUser, toUser, htmlContent)  // 发送socket事件
      let response = yield call(chattingService.put, { account: fromUser, toAccount: toUser, message: htmlContent })
      if (response.success) {
        yield put({
          type: 'addMsg',
          payload: appendData
        })
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history, store }) {
      return history.listen(({ pathname, query }) => {
        const state = store
        console.log(state)
        // toAccount不同步的问题，准备从state里面区e.key
        if (pathname === '/main') {
          const socket = io('http://localhost:5000')
          const userName = query.account
          socket.on('connect', function () {
            socket.emit('join', userName)
          })
          socket.off('to' + userName, function (error) {
            socket.emit('移除旧的socket事件', error)
          })
          socket.on('to' + userName, function (data) {
            console.log(query)
            if (userName !== data.from) {
              console.log(userName, '收到来自', data.from, '的消息：', data.message)
              if (query.toAccount === data.from) {
                const appendData = {
                  fromUser: data.from,
                  htmlContent: data.message,
                }
                dispatch({ type: 'addMsg', payload: appendData })
              } else {
                dispatch({ type: 'newMsgAlert', payload: data })
              }
            } else {
              console.log('发送成功！')
            }
          })
          dispatch({ type: 'setSocket', payload: { socket }})
          // if (query.toAccount) {
          //   dispatch({ type: 'fetchChattingMsg', payload: { user: { account: userName }, tab: query.toAccount }, })
          // }
        }
      })
    },
  },
}
