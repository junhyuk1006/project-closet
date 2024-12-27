import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Find.css';
import { call } from '../../api/auth/ApiService';

const FindIdForm = () => {
  const [email, setEmail] = useState('');
  const [foundId, setFoundId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFindId = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setFoundId(null);
    try {
      const response = await call(`/auth/find-username?email=${email}`);

      if (!response.ok) {
        const errorToShow =
          response.error || response.message || '아이디를 찾을 수 없습니다.';
        // throw new Error(errorToShow);
      }

      // 성공 시 아이디 표시
      setFoundId(data.data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center">아이디 찾기</h2>
      <form onSubmit={handleFindId}>
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
          아이디 찾기
        </button>
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        {foundId && (
          <p className="text-success mt-3">
            찾은 아이디: <strong>{foundId}</strong>
          </p>
        )}
      </form>
      <div className="text-center mt-3">
        {/* 비밀번호 재설정 페이지로 이동하도록 변경 */}
        <a onClick={() => navigate('/reset-password')} className="auth-link">
          비밀번호 재설정
        </a>
      </div>
    </div>
  );
};

export default FindIdForm;
