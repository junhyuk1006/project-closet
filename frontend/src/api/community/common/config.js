export const BASE_URL = 'http://localhost:80';

export const fetchAPI = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) throw new Error('Failed to fetch');

  // JSON 파싱 시도, 실패하면 text로 반환
  try {
    return await response.json(); // JSON 형식
  } catch {
    return await response.text(); // 텍스트 형식
  }
};
