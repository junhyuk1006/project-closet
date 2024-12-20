import { fetchAPI } from '../common/config';

export const getItemDetails = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  return await fetchAPI(`/api/admin/item/itemDetail?${queryString}`, {
    method: 'GET',
    header: { 'Content-type': 'application/json' },
  });
};

export const getItem = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  return await fetchAPI(`/api/admin/item/item?${queryString}`, {
    method: 'GET',
    header: { 'Content-type': 'application/json' },
  });
};

export const getReview = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  return await fetchAPI(`/api/admin/item/review?${queryString}`, {
    method: 'GET',
    header: { 'Content-type': 'application/json' },
  });
};

export const getAsk = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  return await fetchAPI(`/api/admin/item/ask?${queryString}`, {
    method: 'GET',
    header: { 'Content-type': 'application/json' },
  });
};
