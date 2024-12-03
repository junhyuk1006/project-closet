import React, { useState, useEffect } from 'react';
import MyPageHeader from '../../components/myPage/MyPageHeader';
import '../../assets/styles/MyPage/MyPage.css';

const MyPoint = () => {
  const [point, setPoint] = useState([]);

  useEffect(() => {
    const fetchPoint = async () => {
      try {
        const response = await fetch(
          `http://localhost:80/api/point/getPointByUserid?userId=1`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPoint(data); // 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };

    fetchPoint();
  }, []);

  return (
    <div>
      <MyPageHeader title="적립금 조회" description="내 적립금을 확인하세요." />
      <div className="point-label">나의 적립금 : </div>
      <div className="point-label">소멸예정 적립금 : </div>

      <div className="mypage-line" />
      <div className="point-list">
        {point.map((point) => (
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
                : `-${point.point}`}
            </div>
          </div>
        ))}
      </div>

      <div className="mypage-line" />
    </div>
  );
};

export default MyPoint;
