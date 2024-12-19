import { fetchAPI } from '../common/config';

export const getItem = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  return await fetchAPI(`/api/admin/item/item?${queryString}`, {
    method: 'GET',
    header: { 'Content-type': 'application/json' },
  });
};
