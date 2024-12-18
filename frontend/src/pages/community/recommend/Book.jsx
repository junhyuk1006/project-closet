import { useEffect, useState } from 'react';

// import CSS
import styles from './Book.module.css';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

// import js
import Calendar from 'react-calendar';
import moment from 'moment';
import { call } from '../../../api/auth/ApiService';
import BookTime from './BookTime';

export default function Book({ isOpen, setIsOpen, coordiId, user }) {
  const [value, onChange] = useState(
    // 초기 상태를 다음날로 지정
    new Date().getTime() + 1000 * 60 * 60 * 24
  );
  const [select, setSelect] = useState(9);

  // 스타일링 예약 함수
  async function reserveStyling() {
    // 캘린더에서 지정한 날짜 + 시간을 변수에 저장
    const date = new Date(value);
    date.setHours(select, 0, 0, 0);

    // reservation 테이블에 저장할 데이터를 객체에 저장
    const reservation = {
      userId: user.id,
      coordiId: coordiId,
      reservationDate: date,
    };
    console.log(reservation);

    // 서버에 POST 요청 전송
    try {
      const data = await call(`/book/coordi`, 'POST', reservation);
      console.log('서버 반환 데이터:', data);

      alert(data.message);
      setIsOpen(false);
      setSelect(9);
    } catch (error) {
      console.error('API 호출 실패:', error);

      // 서버에서 전송한 status에 따른 예외 처리
      if (error.status === 500) {
        alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      } else {
        alert(error.message || '알 수 없는 오류가 발생했습니다.');
      }
    }
  }

  // Modal의 상태 변경마다 실행
  useEffect(() => {
    // 캘린더 초기화
    const initializeCalendar = () => {
      onChange(new Date().getTime() + 1000 * 60 * 60 * 24);
    };

    // 스크롤 최상단으로 이동
    const resetScrollPosition = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };

    // 스크롤 비활성화
    const disableScroll = () => {
      document.querySelector('html').setAttribute('style', 'overflow: hidden');
    };

    // 스크롤 활성화
    const enableScroll = () => {
      document.querySelector('html').removeAttribute('style');
    };

    // 각 함수 캡슐화
    if (isOpen) {
      initializeCalendar();
      resetScrollPosition();
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isOpen]);

  // 날짜를 변경할 때마다 시간을 9시로 초기화
  useEffect(() => {
    setSelect(9);
  }, [value]);

  // 예약이 불가한 날짜를 선택할 시 예외 처리
  useEffect(() => {
    if (value < new Date()) {
      alert('현재 날짜보다 이전 날짜를 선택할 수 없습니다.');
      onChange(new Date().getTime() + 1000 * 60 * 60 * 24);
    }
  }, [value]);

  return (
    isOpen && (
      <div className={styles.container}>
        <div className={`${styles['calendar-container']}`}>
          <h3 className={styles['calendar-title']}>스타일링 예약</h3>

          <Calendar
            value={value}
            onChange={onChange}
            formatDay={(locale, date) => moment(date).format('DD')}
          />

          <div style={{ width: '80%', margin: '0 auto' }}>
            <BookTime select={select} setSelect={setSelect} />
          </div>

          <div className="d-flex justify-content-center gap-4 m-b-20">
            <div
              className={`flex-c-m stext-106 cl6 size-104 bor4 pointer ${styles['b-r-10']} ${styles['btn-blue']} trans-04 m-t-30`}
              onClick={() => {
                reserveStyling();
              }}
            >
              예약
            </div>

            <div
              className={`flex-c-m stext-106 cl6 size-104 bor4 pointer ${styles['b-r-10']} ${styles['btn-red']} trans-04 m-t-30`}
              onClick={() => {
                setIsOpen(false);
                setSelect(9);
              }}
            >
              취소
            </div>
          </div>
        </div>
      </div>
    )
  );
}
