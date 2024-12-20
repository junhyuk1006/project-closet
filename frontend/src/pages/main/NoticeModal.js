import { useEffect, useState } from 'react';
import styles from './NoticeModal.module.css';
import { call } from '../../api/auth/ApiService';
import ReactMarkdown from 'react-markdown';

export default function NoticeModal({ id, onClose }) {
  const [notice, setNotice] = useState(null);

  // id 상태 변경시마다 호출
  useEffect(() => {
    // id가 null인 경우 데이터를 초기화 후 요청 막음
    if (!id) {
      setNotice(null);
      return;
    }

    // id에 해당하는 공지 데이터 fetch
    async function fetchNotice() {
      try {
        const response = await call(`/notices/${id}`);
        console.log(response);

        // ISO 8601 형식의 createdAt 데이터를 로컬 시간 형식으로 변환
        const localeDate = toLocaleDate(response.createdAt);
        response.createdAt = localeDate;

        // 변환 데이터로 상태 설정
        setNotice(response);
      } catch (err) {
        console.error('공지사항을 불러오는 데 실패했습니다:', err);
      }
    }
    fetchNotice();
  }, [id]);

  // 로컬 시간 변환 함수
  function toLocaleDate(isoDate) {
    const date = new Date(isoDate);
    const localDate = date.toLocaleString();
    console.log('date: ' + localDate);

    return localDate;
  }

  return (
    notice && (
      <div className={styles.overlay} onClick={onClose}>
        <div
          className={`container ${styles['notice-container']}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className={styles['notice-title']}>{notice.subject}</h2>
          <span className={styles['notice-created-at']}>
            {notice.createdAt}
          </span>
          <ReactMarkdown>{notice.content}</ReactMarkdown>
          <button className={styles['close-btn']} onClick={onClose}>
            ×
          </button>
        </div>
      </div>
    )
  );
}
