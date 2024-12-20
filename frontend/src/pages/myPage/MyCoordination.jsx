import React, { useState, useEffect } from 'react';
import MyPageHeader from '../../components/myPage/MyPageHeader';
import Pagination from '../public/Pagination'; // 분리된 Pagination 컴포넌트 임포트
import { call } from '../../api/auth/ApiService';
import { useUser } from '../../api/auth/UserContext';
import '../../assets/styles/myPage/MyPage.css';

const MyCoordination = () => {
  const { user } = useUser();
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  const fetchReservations = async () => {
    try {
      const response = await call('/api/mypage/getMyReservation', 'GET');
      setReservations(response.data); // API의 응답 구조에 따라 수정
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setError('예약 정보를 가져오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div>
      <MyPageHeader title="나의 코디 조회" description="내가 예약한 코디 신청 정보를 알 수 있습니다." />
      <div className="mypage-label1">코디 예약 현황</div>

      <div className="coordi-rounded-box">
        <hr className="my-4" />
        {error && <div className="error-message">{error}</div>}
        {reservations.length > 0 ? (
          reservations.map((reservation, index) => (
            <div key={index} className="reservation-item">
              <div className="reservation-row">
                <div className="reservation-id-box">예약번호: {reservation.reservationId}</div>
                <div className="reservation-id-box">예약번호: {reservation.reservationStatus}</div>
              </div>

              <p>
                {`${user?.nickname || ''}님이 예약하신 코디네이터는`}
                {reservation.nickname}
                입니다. 예약 날짜:{' '}
                {new Date(reservation.reservationDate).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',

                  hour12: false, // 24시간 형식
                })}
              </p>

              <hr className="my-4" />
            </div>
          ))
        ) : (
          <p>예약 정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MyCoordination;
