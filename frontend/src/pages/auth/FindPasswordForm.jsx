import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Find.css';

const FindPasswordForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFindPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    try {
      // 백엔드에 비밀번호 재설정 API 요청
      const response = await fetch('http://localhost/api/auth/find-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('비밀번호 재설정 메일이 전송되었습니다.');
      } else {
        throw new Error(data.message || '비밀번호 찾기에 실패했습니다.');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center">비밀번호 찾기</h2>
      <form onSubmit={handleFindPassword}>
        <div className="form-group mb-3">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="아이디를 입력해주세요."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-secondary w-100">
          비밀번호 찾기
        </button>
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        {successMessage && (
          <p className="text-success mt-3">{successMessage}</p>
        )}
      </form>
      <div className="text-center mt-3">
        <a onClick={() => navigate('/find-id')} className="auth-link">
          아이디 찾기
        </a>
      </div>
    </div>
  );
};

export default FindPasswordForm;
