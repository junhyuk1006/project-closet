import React, { useState, useEffect } from 'react';
import MyPageHeader from '../../components/myPage/MyPageHeader';
import Pagination from '../../pages/public/Pagination'; // 분리된 Pagination 컴포넌트 임포트
import { call } from '../../api/auth/ApiService';
import '../../assets/styles/myPage/MyPage.css';

const MyPoint = () => {
  const [points, setPoints] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0); // 나의 적립금
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;
  const blockSize = 5; // 한 블록에 표시할 페이지 수

  const fetchPoints = async (page) => {
    try {
      const response = await call(
        `/api/point/getPointByUserid?page=${page}&size=${pageSize}`,
        'GET'
      );
      setPoints(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching points:', error);
    }
  };

  const fetchTotalPoints = async () => {
    try {
      const response = await call(`/api/point/getTotalPointByUserid`, 'GET');
      setTotalPoints(response.totalPoints); // 백엔드에서 "totalPoints" 필드로 전달된 값
    } catch (error) {
      console.error('Error fetching total points:', error);
    }
  };

  useEffect(() => {
    fetchPoints(currentPage); // 포인트 데이터 가져오기
  }, [currentPage]);

  useEffect(() => {
    fetchTotalPoints(); // 나의 적립금 데이터 가져오기
  }, []);

  return (
    <div>
      <MyPageHeader
        title="적립금 조회"
        description="적립금은 적립일 기준 1년간 사용 가능하며, 만료 기간이 한 달 이내로 남은 포인트는 소멸 예정 포인트에 표시됩니다."
      />
      {/* 나의 적립금 표시 */}
      <div className="point-label1">
        나의 적립금: <strong>{totalPoints}p</strong>
      </div>

      <div className="point-list">
        {points.map((point) => (
          <div className="point-item" key={point.id}>
            <div className="point-info">
              <div className="date">{point.createdAt}</div>
              <div className="description">{point.pointReason}</div>
            </div>
            <div
              className="points"
              style={{
                color:
                  point.pointType === '적립'
                    ? '#32A2F5'
                    : point.pointType === '차감' || point.pointType === '만료'
                      ? '#ED623D'
                      : 'black',
              }}
            >
              {point.pointType === '적립'
                ? `+${point.point}p`
                : `-${point.point}p`}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination 컴포넌트 사용 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        blockSize={blockSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default MyPoint;
