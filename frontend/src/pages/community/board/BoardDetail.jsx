import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBoardDetail } from '../../../api/community/board/Board';
import './BoardDetail.css'; // 스타일을 위한 CSS 파일

const BoardDetail = () => {
  const { id } = useParams();
  const [boardDetail, setBoardDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
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
          onClick={() => navigate('/board')}
        >
          목록으로
        </button>
      </div>
    </div>
  );
};

export default BoardDetail;
