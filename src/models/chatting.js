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
    load(state, { payload: { data, total, user }, }) {
      return {
        ...state,
        chattingData: data,
        total,
        toUser: user
      }
    },
    setSocket(state, { payload: { socket }, }) {
      return {
        ...state,
        socket
      }
    },
    changeTab(state, { payload: { user, tab }, }) {
      return {
        ...state,
        toUser: user,
        currentTab: tab,
      }
    },
    sendMsg(state, { payload: appendData }) {
      const { fromUser, toUser, htmlContent, } = appendData
      console.log(state)
      state.socket && state.socket.emit('sendMsg', fromUser, toUser, htmlContent)
      return {
        ...state,
        chattingData: state.chattingData.concat({ user: fromUser, htmlContent, })
      }
    }
  },
  effects: {
    * fetchChattingMsg({ payload: { user, tab }, }, { select, call, put }) {
      yield put({
        type: 'changeTab',
        payload: { user, tab }
      })
      const account = yield select(state => state.users.self.account)
      const { data, total } = yield call(chattingService.fetch, { account, toAccount: user.account })
      yield put({
        type: 'load',
        payload: { data, total, user }
      })
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
          dispatch({ type: 'setSocket', payload: { socket }, })
        }
      })
    },
  },
}
