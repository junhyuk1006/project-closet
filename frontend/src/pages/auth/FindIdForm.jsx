import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Find.css';

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
      // 백엔드에 아이디 찾기 API 요청
      const response = await fetch('http://localhost/api/auth/find-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setFoundId(data.username); // 성공 시 아이디 표시
      } else {
        throw new Error(data.message || '아이디를 찾을 수 없습니다.');
      }
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
        <a onClick={() => navigate('/find-password')} className="auth-link">
          비밀번호 찾기
        </a>
      </div>
    </div>
  );
};

export default FindIdForm;
