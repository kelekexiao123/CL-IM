import * as chattingService from '../services/chatting'
import io from 'socket.io-client'

export default {
  namespace: 'chatting',
  state: {
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
    changeTab(state, { payload: { user, tab }, }) {
      return {
        ...state,
        toUser: user,
        currentTab: tab,
      }
    },
    sendMsg(state, { payload: appendData }) {
      return {
        ...state,
        chattingData: state.chattingData.concat(appendData)
      }
    }
  },
  effects: {
    * fetchChattingMsg({ payload: { user, tab }, }, { select, call, put }) {
      yield put({
        type: 'changeTab',
        payload: { user, tab }
      })
      const fromAccount = yield select(state => state.users.self.account)
      const { data, total } = yield call(chattingService.fetch, { fromAccount, toAccount: user.account })
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
        }
      })
    },
  },
}
