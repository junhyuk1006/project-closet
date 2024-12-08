import { fetchAPI } from '../common/config';

export const getAllUsers = async () => {
  return await fetchAPI('/api/admin/user/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getAllUserAdmin = async () => {
  return await fetchAPI('/api/admin/user/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
