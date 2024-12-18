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
export const getBoardDetail = async (boardId) => {
  return await call(`/api/board/${boardId}`);
};

// 검색 요청 API
export const searchBoards = async (keyword, condition) => {
  return await fetchAPI(
    `/api/board/search?keyword=${encodeURIComponent(keyword)}&condition=${encodeURIComponent(condition)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

// 글 수정
export const updateBoard = async (boardId, updatedData) => {
  return await fetchAPI(`/api/board/update/${boardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(updatedData),
  });
};

// 글 삭제
export const deleteBoard = async (boardId) => {
  const response = await fetch(`http://localhost/api/board/delete/${boardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || '삭제 실패');
  }

  return await response.text(); // 서버에서 반환된 "삭제 성공" 메시지 반환
};
