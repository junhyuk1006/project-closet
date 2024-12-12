import { fetchAPI } from '../common/config';

export const getAllboard = async () => {
  return await fetchAPI('/api/board/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
