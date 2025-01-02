import { fetchAPI } from '../common/config';

export const getOrder = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  return await fetchAPI(`/api/admin/order/order?${queryString}`, {
    method: 'GET',
    header: { 'Content-type': 'application/json' },
  });
};

export const getDelivery = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  return await fetchAPI(`/api/admin/order/delivery?${queryString}`, {
    method: 'GET',
    header: { 'Content-type': 'application/json' },
  });
};

export const getExchange = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  return await fetchAPI(`/api/admin/order/exchange?${queryString}`, {
    method: 'GET',
    header: { 'Content-type': 'application/json' },
  });
};

export const getRefund = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  return await fetchAPI(`/api/admin/order/refund?${queryString}`, {
    method: 'GET',
    header: { 'Content-type': 'application/json' },
  });
};

export const getOrderMonth = async () => {
  return await fetchAPI('/api/admin/order/month', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getOrderDate = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  return await fetchAPI(`/api/admin/order/orderDate?${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
