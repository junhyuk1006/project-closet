import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getRepliesByBoardId,
  addReply,
  deleteReply,
  updateReply,
} from '../../../api/community/board/Reply';
import { useUser } from '../../../api/auth/UserContext'; // 사용자 정보 가져오기
import './BoardReply.css'; // 추가된 스타일링

const BoardReply = () => {
  const { id } = useParams(); // 게시글 ID 가져오기
  const { user } = useUser(); // 현재 로그인된 사용자 정보
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [editingReply, setEditingReply] = useState(null);

  // 댓글 목록 불러오기
  const fetchReplies = async () => {
    try {
      const data = await getRepliesByBoardId(id);
      setReplies(data);
    } catch (error) {
      console.error('댓글 불러오기 실패:', error);
      alert('댓글을 불러오는 중 문제가 발생했습니다.');
    }
  };

  // 댓글 등록
  const handleAddReply = async () => {
    if (!user || !id || newReply.trim() === '') {
      alert('댓글 내용을 입력해 주세요.');
      return;
    }
    try {
      // user.id를 추가하여 댓글 작성자 정보 포함
      await addReply({ boardId: id, replyContent: newReply, userId: user.id });
      setNewReply('');
      fetchReplies();
    } catch (error) {
      console.error('댓글 등록 실패:', error);
      alert('댓글 등록 중 오류가 발생했습니다.');
    }
  };

  // 댓글 삭제
  const handleDeleteReply = async (replyId) => {
    if (window.confirm('정말 이 댓글을 삭제하시겠습니까?')) {
      try {
        await deleteReply(replyId); // 삭제 요청
        alert('댓글이 성공적으로 삭제되었습니다.'); // 성공 메시지
        fetchReplies(); // 댓글 목록 갱신
      } catch (error) {
        console.error('댓글 삭제 실패:', error.message);
        alert(error.message || '댓글 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // 댓글 수정
  const handleUpdateReply = async (replyId) => {
    if (!editingReply.replyContent.trim()) {
      alert('수정할 내용을 입력해 주세요.');
      return;
    }
    if (!user) {
      alert('로그인 후 수정할 수 있습니다.');
      return;
    }
    try {
      // userId를 포함하여 요청
      await updateReply(replyId, {
        replyContent: editingReply.replyContent,
        userId: user.id,
      });
      setEditingReply(null);
      fetchReplies();
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [id]);

  return (
    <div className="reply-container">
      <h3 className="reply-title">댓글</h3>
      <div className="reply-list">
        {replies.length > 0 ? (
          replies.map((reply) => (
            <div key={reply.id} className="reply-item">
              {editingReply?.id === reply.id ? (
                <input
                  value={editingReply.replyContent}
                  className="reply-input"
                  onChange={(e) =>
                    setEditingReply({
                      ...editingReply,
                      replyContent: e.target.value,
                    })
                  }
                />
              ) : (
                <p className="reply-content">{reply.replyContent}</p>
              )}
              <div className="reply-actions">
                {editingReply?.id === reply.id ? (
                  <button
                    className="reply-button"
                    onClick={() => handleUpdateReply(reply.id)}
                  >
                    수정 완료
                  </button>
                ) : (
                  user?.id === reply.userId && ( // 본인 댓글만 수정/삭제 가능
                    <>
                      <button
                        className="reply-button"
                        onClick={() => setEditingReply(reply)}
                      >
                        수정
                      </button>
                      <button
                        className="reply-button reply-delete"
                        onClick={() => handleDeleteReply(reply.id)}
                      >
                        삭제
                      </button>
                    </>
                  )
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-replies">작성된 댓글이 없습니다.</p>
        )}
      </div>
      <div className="reply-input-container">
        <input
          type="text"
          placeholder="댓글을 입력하세요..."
          className="reply-input"
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
        />
        <button className="reply-button reply-submit" onClick={handleAddReply}>
          등록
        </button>
      </div>
    </div>
  );
};

export default BoardReply;