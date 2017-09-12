import * as usersService from '../services/users'

export default {
  namespace: 'users',
  state: {
    self: {},
    groups: [],
    userList: [],
    total: null,
  },
  reducers: {
    load(state, { payload: { friendsData, userData }}) {
      return {
        ...state,
        self: userData,
        groups: userData.groups,
        userList: friendsData
      }
    },
    addUnreadNum(state, { payload: fromAccount }) {
      const newUserList = state.userList.map(function (user) {
        if (user.account === fromAccount) {
          user.unreadNum++
        }
        return user
      })
      return {
        ...state,
        userList: newUserList,
      }
    },
    afterRead(state, { payload: fromAccount }) {
      const newUserList = state.userList.map(function (user) {
        if (user.account === fromAccount) {
          user.unreadNum = 0
        }
        return user
      })
      return {
        ...state,
        userList: newUserList,
      }
    }
    // add(state, { payload: todo }) {
    //   return state.concat(todo)
    // },
    // remove(state, { payload: id }) {
    //   return state.filter(todo => todo.id !== id)
    // },
    // update(state, { payload: updatedTodo }) {
    //   return state.map(todo => {
    //     if (todo.id === updatedTodo.id) {
    //       return { ...todo, ...updatedTodo }
    //     } else {
    //       return todo
    //     }
    //   })
    // },
  },
  effects: {
    * fetchUserList({ payload: { account }}, { call, put }) {
      const { data: userData } = yield call(usersService.fetchUser, { account })
      const { data: friendsData } = yield call(usersService.fetchFriends, { account })
      yield put({
        type: 'load',
        payload: { friendsData, userData }
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