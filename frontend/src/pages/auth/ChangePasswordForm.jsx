import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Find.css';
import { call } from '../../api/auth/ApiService';

const ChangePasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 token 파라미터 추출
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');
    if (!tokenFromUrl) {
      setErrorMessage('토큰이 없습니다. 유효한 링크로 접근해주세요.');
    } else {
      setToken(tokenFromUrl);
    }
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!token) {
      setErrorMessage('토큰이 유효하지 않습니다. 다시 시도해주세요.');
      return;
    }

    try {
      const response = await call('/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        const errorToShow =
          data.error || data.message || '비밀번호 변경에 실패했습니다.';
        throw new Error(errorToShow);
      }
      setSuccessMessage(
        '비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.'
      );
      // 일정 시간 후 로그인 페이지로 이동할 수도 있음
      // setTimeout(() => navigate('/signin'), 2000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center">비밀번호 변경</h2>
      <form onSubmit={handleChangePassword}>
        <div className="form-group mb-3">
          <label htmlFor="newPassword">새 비밀번호</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            placeholder="새 비밀번호를 입력해주세요."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-secondary w-100">
          비밀번호 변경
        </button>
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        {successMessage && (
          <p className="text-success mt-3">{successMessage}</p>
        )}
      </form>
      <div className="text-center mt-3">
        <span className="auth-link" onClick={() => navigate('/Login')}>
          로그인 페이지로 이동
        </span>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
