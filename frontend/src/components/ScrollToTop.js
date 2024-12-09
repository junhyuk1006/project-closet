import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // window.scrollTo(0, 0); // 스크롤하듯이 이동
    window.scroll({ top: 0, behavior: 'instant' }); // 즉시 상단으로 이동
  }, [pathname]);

  return null;
}
