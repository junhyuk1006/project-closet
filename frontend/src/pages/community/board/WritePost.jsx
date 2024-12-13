import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { me } from '../../../api/auth/ApiService';
import './WritePost.css'; // 스타일 파일 추가

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자 정보 가져오기
    const fetchUser = async () => {
      try {
        const userData = await me();
        if (userData.error) {
          alert('로그인이 필요합니다.');
          navigate(-1); // 뒤로가기
        } else {
          setUser(userData);
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 중 오류:', error);
        navigate(-1); // 뒤로가기
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

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
