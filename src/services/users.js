import request from '../utils/request';

export function fetch({ id }) {
  return request(`/api/users?id=${id}`);
}