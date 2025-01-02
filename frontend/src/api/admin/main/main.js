import { fetchAPI } from '../common/config';

export const getMainUser = async (date) => {
  return await fetchAPI(`/api/admin/home/userToday?date=${date}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
