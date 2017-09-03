import request from '../utils/request';

export function fetch({ selfAccount, elseAccount }) {
  return request(`/api/chatting?selfAccount=${selfAccount}&elseAccount=${elseAccount}`);
}