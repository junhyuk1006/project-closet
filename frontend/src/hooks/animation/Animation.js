import React, { useEffect, useState } from 'react';

// import CSS
import '../../assets/styles/components/Animation.css';

export default function Animation({ children }) {
  const [isVisible, setIsVisible] = useState(false); // fade-in 상태

  useEffect(() => {
    // 컴포넌트가 렌더링된 직후 fade-in 시작
    // const timer = setTimeout(() => setIsVisible(true), 0); // 약간의 딜레이를 줌
    // return () => clearTimeout(timer);
    setIsVisible(true);
  }, []);

  return (
    <div className={`animsition ${isVisible ? 'fade-in' : ''}`}>{children}</div>
  );
}
