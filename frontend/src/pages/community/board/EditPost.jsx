import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getBoardDetail,
  updateBoard,
} from '../../../api/community/board/Board';
import './WritePost.css'; // 동일한 CSS 재사용

const EditPost = () => {
  const { boardId } = useParams(); // URL에서 게시글 ID 가져오기
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 기존 게시글 데이터 가져오기
    const fetchBoard = async () => {
      try {
        const data = await getBoardDetail(boardId); // 기존 글 정보 가져오기
        setTitle(data.boardTitle); // 제목 설정
        setContent(data.boardContent); // 내용 설정
      } catch (error) {
        console.error('게시글 데이터를 불러오는 중 오류:', error);
        alert('게시글을 불러오는 중 문제가 발생했습니다.');
        navigate('/community'); // 오류 시 게시판으로 이동
      }
    };

    fetchBoard();
  }, [boardId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      boardTitle: title,
      boardContent: content,
    };

    try {
      await updateBoard(boardId, updatedData); // 데이터 전달
      alert('글이 수정되었습니다.');
      navigate(`/board/${boardId}`); // 수정 후 상세 페이지로 이동
    } catch (error) {
      console.error('서버와의 통신 중 오류:', error);
      alert('글 수정 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className="write-post-container">
      <h2 className="form-title">글 수정</h2>
      <form onSubmit={handleSubmit} className="write-post-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            제목
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="content" className="form-label">
            내용
          </label>
          <textarea
            id="content"
            className="form-control"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-submit mt-3">
          수정 완료
        </button>
        <button
          type="button"
          className="btn btn-cancel mt-3"
          onClick={() => navigate(-1)}
        >
          취소
        </button>
      </form>
    </div>
  );
};

export default EditPost;
