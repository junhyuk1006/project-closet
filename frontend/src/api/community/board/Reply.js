import { fetchAPI } from '../common/config';

// 댓글 조회
export const getRepliesByBoardId = async (boardId) => {
  return await fetchAPI(`/api/replies/board/${boardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

// 댓글 등록
export const addReply = async (replyData) => {
  return await fetchAPI('/api/replies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(replyData),
  });
};

// 댓글 삭제
export const deleteReply = async (replyId) => {
  const data = await fetchAPI(`/api/replies/${replyId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  // JSON 또는 텍스트에 맞춰 메시지를 반환
  if (typeof data === 'string') {
    return { message: data }; // 텍스트인 경우
  }
  return data; // JSON인 경우
};

// 댓글 수정
export const updateReply = async (replyId, updatedData) => {
  return await fetchAPI(`/api/replies/${replyId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(updatedData),
  });
};
