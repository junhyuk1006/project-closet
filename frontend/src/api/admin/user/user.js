import { fetchAPI } from '../common/config';

export const getAllUsers = async () => {
  return await fetchAPI('/api/admin/user/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getUserAdmin = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  return await fetchAPI(`/api/admin/user/user?${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
