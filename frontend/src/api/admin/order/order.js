import { fetchAPI } from '../common/config';

export const getOrder = async () => {
  return await fetchAPI('/api/admin/order/all', {
    method: 'GET',
    header: { 'Content-type': 'application/json' },
  });
};
