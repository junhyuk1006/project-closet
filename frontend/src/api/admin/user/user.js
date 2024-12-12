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

export const getGrade = async () => {
  return await fetchAPI('/api/admin/user/grade', {
    method: 'GET',
    headers: {
      'Content-Type': 'applicaiont/json',
    },
  });
};

export const updateGrade = async (updateGrades) => {
  return await fetchAPI('/api/admin/user/grade', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateGrades),
  });
};

export const getPointUser = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  return await fetchAPI(`/api/admin/user/point?${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
