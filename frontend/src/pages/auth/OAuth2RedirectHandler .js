import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    if (token) {
      // JWT 저장
      localStorage.setItem('token', token);

      // 메인 페이지로 리디렉션
      navigate('/');
    } else {
      // 토큰이 없을 경우 로그인 페이지로 리디렉션
      navigate('/login');
    }
  }, [location, navigate]);

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <h3>Processing OAuth2 Login...</h3>
    </div>
  );
};

export default OAuth2RedirectHandler;
