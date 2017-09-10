import request from '../utils/request'

export function fetch({ account, toAccount }) {
  return request(`/api/chatting?account=${account}&toAccount=${toAccount}`, {method: 'GET'})
}

export function put({ account, toAccount, message }) {
  return request(`/api/chatting?account=${account}&toAccount=${toAccount}&msg=${message}`, {method: 'PUT'})
}