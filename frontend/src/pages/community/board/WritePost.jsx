import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../api/auth/UserContext'; // useUser 사용
import './WritePost.css'; // 스타일 파일 추가

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useUser(); // 사용자 정보 가져오기
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/login'); // 로그인 페이지로 이동
      return;
    }

    const requestBody = {
      boardTitle: title,
      boardContent: content,
      userId: user.id, // 사용자 ID 확인
    };

    console.log('Request Payload:', requestBody); // JSON 데이터 확인

    try {
      const response = await fetch('http://localhost:80/api/board/write', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          boardTitle: title,
          boardContent: content,
          userId: user.id, // 사용자 ID 추가
        }),
      });

      if (response.ok) {
        alert('글이 작성되었습니다.');
        navigate('/community'); // 글 작성 후 게시판으로 이동
      } else {
        alert('글 작성 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('서버와의 통신 중 오류:', error);
      alert('서버와의 통신 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className="write-post-container">
      <h2 className="form-title">글 작성</h2>
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
          작성 완료
        </button>
      </form>
    </div>
  );
};

export default WritePost;
