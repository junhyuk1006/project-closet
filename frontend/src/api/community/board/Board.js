import { fetchAPI } from '../common/config';
import { call } from '../../../api/auth/ApiService';

// 게시판 목록 조회
export const getAllboard = async () => {
  return await call('/board/list');
};

// 게시판 상세 조회
export const getBoardDetail = async (boardId) => {
  return await call(`/board/${boardId}`);
};

// 검색 요청 API
export const searchBoards = async (keyword, condition) => {
  return await call(
    `/board/search?keyword=${encodeURIComponent(keyword)}&condition=${encodeURIComponent(condition)}`
  );
};

// 글 수정
export const updateBoard = async (boardId, updatedData) => {
  return await call(
    `/board/update/${boardId}`,
    'PUT',
    JSON.stringify(updatedData)
  );
};

// 글 삭제
export const deleteBoard = async (boardId) => {
  const response = await call(`/board/delete/${boardId}`, 'DELETE');

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || '삭제 실패');
  }

  return await response.text(); // 서버에서 반환된 "삭제 성공" 메시지 반환
};
