import React, { useState, useEffect } from 'react';
import '../assets/vendor/animsition/css/animsition.css';
import { useNavigate } from 'react-router-dom';

export default function Animsition({ children }) {
  const [isVisible, setIsVisible] = useState(false); // fade-in 상태
  const [fadeOut, setFadeOut] = useState(false); // fade-out 상태
  const navigate = useNavigate();

  useEffect(() => {
    // 컴포넌트가 렌더링된 직후 fade-in 시작
    const timer = setTimeout(() => setIsVisible(true), 10); // 약간의 딜레이를 줌
    return () => clearTimeout(timer);
  }, []);

  // const handleLinkClick = (url) => {
  //   setFadeOut(true); // fade-out 시작
  //   setTimeout(() => {
  //     navigate(url); // fade-out 완료 후 페이지 이동
  //   }, 800); // fade-out 애니메이션 시간과 일치
  // };

  return (
    <div
      className={`animsition ${fadeOut ? 'fade-out' : isVisible ? 'fade-in' : ''}`}
    >
      {children}
    </div>
  );
}
