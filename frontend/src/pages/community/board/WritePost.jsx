import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ title, content }); // 여기서 서버로 데이터를 전송하는 로직 추가
    try {
      const response = await fetch('http://localhost:80/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          boardTitle: title,
          boardContent: content,
        }),
      });

      if (response.ok) {
        alert('글이 작성되었습니다.');
        navigate('/board'); // 글작성 후 게시판으로 이동
      } else {
        alert('글 작성 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('서버와의 통신 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
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
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            className="form-control"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          작성 완료
        </button>
      </form>
    </div>
  );
};

export default WritePost;
