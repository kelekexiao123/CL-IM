import request from '../utils/request'

export function fetchFriends({ account }) {
  return request(`/api/friends?account=${account}`)
}

export function fetchUser({ account }) {
  return request(`/api/users?account=${account}`)
}