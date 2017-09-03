import * as chattingService from '../services/chatting'

export default {
  namespace: 'chatting',
  state: {
    currentUser: {},
    currentTab: '',
    editorContent: '',
    htmlContent: '',
    chattingData: [],
    total: null
  },
  reducers: {
    load(state, { payload: { data, total } }) {
      return {
        ...state,
        chattingData: data,
        total
      }
    },
    changeTab(state, { payload: { user, tab } }) {
      return {
        ...state,
        currentUser: user,
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
    *fetchChattingMsg({ payload: { user, tab } }, { select, call, put }) {
      yield put({
        type: 'changeTab',
        payload: { user, tab }
      })
      const selfAccount = yield select(state => state.users.self.account)
      const { data, total } = yield call(chattingService.fetch, { selfAccount, elseAccount: user.account })
      yield put({
        type: 'load',
        payload: { data, total }
      })
    },
  },
  subscriptions: {},
};
