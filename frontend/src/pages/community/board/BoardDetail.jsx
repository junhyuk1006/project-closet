import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  deleteBoard,
  getBoardDetail,
} from '../../../api/community/board/Board';
import './BoardDetail.css'; // 스타일을 위한 CSS 파일
import { me } from '../../../api/auth/ApiService';

const BoardDetail = () => {
  const { id } = useParams();
  const [boardDetail, setBoardDetail] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // 현재 로그인된 사용자
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 로그인된 사용자 정보 가져오기
  const fetchCurrentUser = async () => {
    try {
      const userData = await me();
      if (userData.error) {
        throw new Error(userData.error);
      }
      setCurrentUser(userData); // 로그인된 사용자 정보 저장
    } catch (error) {
      console.error('사용자 정보를 가져오는 데 실패했습니다:', error.message);
    }
  };

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        await fetchCurrentUser(); // 사용자 정보 가져오기
        const data = await getBoardDetail(id);
        setBoardDetail(data);
      } catch (error) {
        alert('게시글을 불러오는 중 오류가 발생했습니다.');
        navigate('/board');
      } finally {
        setLoading(false);
      }
    };
    fetchBoardDetail();
  }, [id, navigate]);

  if (loading) return <p>로딩 중...</p>;

  if (!boardDetail) return <p>게시글을 찾을 수 없습니다.</p>;

  // 수정 버튼 클릭 이벤트
  const handleEditClick = () => {
    navigate(`/board/edit/${id}`); // 수정 페이지로 이동
  };

  // 글 삭제 버튼 클릭 이벤트
  const handleDeleteClick = async () => {
    if (window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      try {
        await deleteBoard(id); // 삭제 API 호출
        alert('게시글이 삭제되었습니다.');
        navigate('/community'); // 삭제 후 게시판 목록으로 이동
      } catch (error) {
        alert('게시글 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="board-detail-container">
      <div className="board-detail-header">
        <h2 className="board-title">{boardDetail.boardTitle}</h2>
        <div className="board-info">
          <span className="board-author">
            작성자 ID: <strong>{boardDetail.userId}</strong>
          </span>
          <span className="board-date">
            작성일: {new Date(boardDetail.createdAt).toLocaleString()}
          </span>
        </div>
        <hr className="divider" />
      </div>

      <div className="board-content">
        <p>{boardDetail.boardContent}</p>
        {boardDetail.boardImage && (
          <div className="board-image">
            <img
              src={`http://localhost/images/${boardDetail.boardImage}`}
              alt="게시글 이미지"
              className="detail-image"
            />
          </div>
        )}
      </div>

      <div className="board-actions">
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/community')}
        >
          목록으로
        </button>
        &nbsp;&nbsp;
        {/* 수정 버튼: 작성자와 로그인된 사용자가 동일할 경우만 렌더링 */}
        {currentUser?.id === boardDetail.userId && (
          <>
            <button className="btn btn-secondary" onClick={handleEditClick}>
              글수정
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-danger" onClick={handleDeleteClick}>
              글삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BoardDetail;
