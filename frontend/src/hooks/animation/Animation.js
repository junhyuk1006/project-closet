import React, { useEffect, useState } from 'react';

// import CSS
import '../../assets/styles/components/Animation.css';

export default function Animation({ children, animationClass }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      // (class="animsition t10 fade-in")
      className={`animsition ${animationClass} ${isVisible ? 'fade-in' : ''}`}
    >
      {children}
    </div>
  );
}
