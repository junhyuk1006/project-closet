import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /** StrictMode
   *  기능: 의도적인 마운트/언마운트 실행
   *  문제:
   *    1. fetch 등 데이터리가 2번 반독됨
   *    2. 네트워크 데이터 로딩 속도 저하
   *
   *  결론: 개발 환경 경우 주석처리로 테스트 속도 향상
   *  주의: React Nginx 배포환경에서 해당 문제가 발생하지 않으며, 해당 기능이 필요하여 배포시 주석 해제 필요
   */

  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
