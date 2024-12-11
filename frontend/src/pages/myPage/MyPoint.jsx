import React, { useState, useEffect } from 'react';
import MyPageHeader from '../../components/myPage/MyPageHeader';
import '../../assets/styles/myPage/MyPage.css';

const MyPoint = () => {
  const [point, setPoint] = useState([]);
  const [totalPoint, setTotalPoint] = useState([]);
  const [expirePoint, setExpirePoint] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pointResponse, totalResponse, expireResponse] =
          await Promise.all([
            fetch('http://localhost:80/api/point/getPointByUserid?userId=1'),
            fetch(
              'http://localhost:80/api/point/getTotalPointByUserid?userId=1'
            ),
            fetch(
              'http://localhost:80/api/point/getExpirePointByUserid?userId=1'
            ),
          ]);

        const point = await pointResponse.json(); // 적립 내역
        const totalPoint = await totalResponse.json(); // 총 적립금
        const expirePoint = await expireResponse.json(); // 소멸 예정 적립금

        setPoint(point);
        setTotalPoint(totalPoint);
        setExpirePoint(expirePoint);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <MyPageHeader
        title="적립금 조회"
        description="적립금은 적립일 기준 1년간 사용 가능하며, 만료 기간이 한 달 이내로 남은 포인트는 소멸 예정 포인트에 표시됩니다."
      />
      <div className="point-label1">
        나의 적립금 : <strong>{totalPoint}p</strong>
      </div>
      <div className="point-label2">
        소멸예정 적립금 : <strong>{expirePoint}p</strong>
      </div>

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
                : `-${point.point}p`}
            </div>
          </div>
        ))}
      </div>

      <div className="mypage-line" />
    </div>
  );
};

export default MyPoint;
