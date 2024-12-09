import { fetchAPI } from '../common/config';

export const getAllUsers = async () => {
  return await fetchAPI('/api/admin/user/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getAllUserAdmin = async (page = 0, size = 20) => {
  return await fetchAPI(`/api/admin/user/user?page=${page}&size=${size}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
