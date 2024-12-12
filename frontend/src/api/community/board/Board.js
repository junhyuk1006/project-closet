import { fetchAPI } from '../common/config';
import { call } from '../../../api/auth/ApiService';

// 게시판 목록 조회
export const getAllboard = async () => {
  return await fetchAPI('/api/board/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// 게시판 상세 조회
export const getBoardDetail = async (id) => {
  return await call(`/api/board/${id}`, 'GET');
};

// 검색 요청 API
export const searchBoards = async (keyword, condition) => {
  const API_URL = `http://localhost/api/board/search?keyword=${encodeURIComponent(
    keyword
  )}&condition=${encodeURIComponent(condition)}`;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('검색 중 오류가 발생했습니다.');
    }
    return await response.json(); // JSON 데이터 반환
  } catch (error) {
    console.error('검색 요청 실패:', error.message);
    throw error;
  }
};
