import request from '../utils/request'

export function fetch({ account, toAccount }) {
  return request(`/api/chatting?account=${account}&toAccount=${toAccount}`)
}