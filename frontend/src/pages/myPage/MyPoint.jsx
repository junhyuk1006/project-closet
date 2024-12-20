import React, { useState, useEffect } from 'react';
import MyPageHeader from '../../components/myPage/MyPageHeader';
import Pagination from '../../pages/public/Pagination'; // 수정된 Pagination 컴포넌트
import { call } from '../../api/auth/ApiService';
import { useUser } from '../../api/auth/UserContext';
import '../../assets/styles/myPage/MyPage.css';

const MyPoint = () => {
  const [points, setPoints] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const { user, loading } = useUser();
  const pageSize = 6;
  const blockSize = 5;

  useEffect(() => {
    if (!loading && user) {
      fetchPoints(currentPage); // 포인트 데이터 가져오기
      fetchTotalPoints(); // 나의 적립금 데이터 가져오기
    }
  }, [loading, user, currentPage]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!user || !user.id) {
    return <div>로그인이 필요합니다.</div>;
  }

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
      setTotalPoints(response);
    } catch (error) {
      console.error('Error fetching total points:', error);
    }
  };

  return (
    <div>
      <MyPageHeader
        title="적립금 조회"
        description="적립금은 사이트 내에서 상품 구매 시 현금처럼 사용할 수 있습니다."
      />
      <div className="point-label1">
        나의 적립금: <strong>{totalPoints}p</strong>
      </div>

      <div className="point-list">
        {points.map((point) => (
          <div className="point-item" key={point.id}>
            <div className="point-info">
              <div className="date">
                {new Date(point.createdAt).toLocaleDateString()}
              </div>

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
