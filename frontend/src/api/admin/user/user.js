import { fetchAPI } from '../common/config';

export const getAllUsers = async () => {
  return await fetchAPI('/api/admin/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
