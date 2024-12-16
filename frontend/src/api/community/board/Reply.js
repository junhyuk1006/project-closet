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
  const response = await fetchAPI(`/api/replies/${replyId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  // 서버에서 200 OK가 반환되면 성공 처리
  if (response.ok) {
    return true; // 삭제 성공
  } else {
    // 오류 메시지를 처리
    const errorMessage = await response.text();
    throw new Error(errorMessage || '댓글 삭제 중 오류가 발생했습니다.');
  }
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
