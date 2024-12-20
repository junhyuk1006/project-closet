import { fetchAPI } from '../common/config';

export const getNotice = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  return await fetchAPI(`/api/admin/page/notice?${queryString}`, {
    method: 'GET',
    header: { 'Content-type': 'application/json' },
  });
};
