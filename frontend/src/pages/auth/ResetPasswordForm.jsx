import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Find.css'; // 기존 CSS 사용
import { call } from '../../api/auth/ApiService';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await call(
        `/auth/reset-password?email=${email}&username=${username}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        const errorToShow =
          data.error ||
          data.message ||
          '비밀번호 재설정 링크 전송에 실패했습니다.';
        throw new Error(errorToShow);
      }

      setSuccessMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>비밀번호 재설정</h2>
      <form onSubmit={handleResetPassword}>
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
          비밀번호 재설정 링크 보내기
        </button>
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        {successMessage && (
          <p className="text-success mt-3">{successMessage}</p>
        )}
      </form>
      <div className="text-center mt-3">
        <span className="auth-link" onClick={() => navigate('/find-id')}>
          아이디 찾기
        </span>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
