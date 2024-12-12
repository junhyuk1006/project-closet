export const BASE_URL = 'http://localhost:80';

export const fetchAPI = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!response.ok) throw new Error('Failed to fetch');
  return await response.json();
};
