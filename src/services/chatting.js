import request from '../utils/request'

export function fetch({ fromAccount, toAccount }) {
  return request(`/api/chatting?fromAccount=${fromAccount}&toAccount=${toAccount}`)
}