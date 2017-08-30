import { routerRedux } from 'dva/router';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export default {
  namespace: 'app',
  state:
  {
    loginLoading: false,
  },
  subscriptions: {
    setup({ dispatch }, done) {
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put({ type: 'showLoginLoading' });
      yield call(delay, 3000);
      yield put({ type: 'hideLoginLoading' });
      yield put(routerRedux.push('/main'));
    },
  },
  reducers: {
    showLoginLoading(state) {
      return {
        loginLoading: true,
      };
    },
    hideLoginLoading(state) {
      return {
        loginLoading: false,
      };
    },
  },
};
