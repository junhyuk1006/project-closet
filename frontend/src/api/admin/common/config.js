export const BASE_URL = 'http://13.209.5.239';

export const fetchAPI = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!response.ok) throw new Error('Failed to fetch');
  return await response.json();
};
