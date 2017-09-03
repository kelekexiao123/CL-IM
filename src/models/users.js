import * as userService from '../services/users'

export default {
  namespace: 'users',
  state: {
    self: {
      account: '250407778',
      name: 'Duang'
    },
    groups: [],
    userList: {},
    total: null,
  },
  reducers: {
    load(state, { payload: { groups, data, total } }) {
      return {
        ...state,
        groups, 
        userList: data, 
        total, 
      }
    },
    add(state, { payload: todo }) {
      return state.concat(todo)
    },
    remove(state, { payload: id }) {
      return state.filter(todo => todo.id !== id)
    },
    update(state, { payload: updatedTodo }) {
      return state.map(todo => {
        if (todo.id === updatedTodo.id) {
          return { ...todo, ...updatedTodo }
        } else {
          return todo
        }
      })
    },
  },
  effects: {
    *fetchUserList({ payload: { id } }, { call, put }) {
      const { groups, data, total } = yield call(userService.fetch, { id })
      yield put({
        type: 'load',
        payload: { groups, data, total }
      })
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/main') {
          dispatch({ type: 'fetchUserList', payload: query })
        }
      })
    },
  },
}