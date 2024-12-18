import { useEffect, useState } from 'react';
import styles from './NoticeModal.module.css';
import { call } from '../../api/auth/ApiService';

export default function NoticeModal({ id, onClose }) {
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (!id) {
      setNotice(null);
      return;
    }

    async function fetchNotice() {
      try {
        const response = await call(`/notices/${id}`);
        console.log(response);
        setNotice(response);
      } catch (err) {
        console.error('공지사항을 불러오는 데 실패했습니다:', err);
      }
    }
    fetchNotice();
  }, [id]);

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
          <p>{notice.content}</p>
          <button className={styles['close-btn']} onClick={onClose}>
            ×
          </button>
        </div>
      </div>
    )
  );
}
