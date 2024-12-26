import { call } from '../../auth/ApiService';
import { fetchAPI } from '../common/config';

// 댓글 조회
export const getRepliesByBoardId = async (boardId) => {
  return await call(`/replies/board/${boardId}`);
};

// 댓글 등록
export const addReply = async (replyData) => {
  return await call('/replies', 'POST', JSON.stringify(replyData));
};

// 댓글 삭제
export const deleteReply = async (replyId) => {
  const data = await call(`/replies/${replyId}`, 'DELETE');

  // JSON 또는 텍스트에 맞춰 메시지를 반환
  if (typeof data === 'string') {
    return { message: data }; // 텍스트인 경우
  }
  return data; // JSON인 경우
};

// 댓글 수정
export const updateReply = async (replyId, updatedData) => {
  return await call(`/replies/${replyId}`, 'PUT', JSON.stringify(updatedData));
};
