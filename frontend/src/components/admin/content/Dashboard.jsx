import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // 플러그인 import
import '../../../assets/styles/admin/admin.css';
import { getMainUser } from '../../../api/admin/main/main';

// Chart.js 모듈 등록
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Dashboard = () => {
  const [userToday, setUserToday] = useState([]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식
    fetchMainUser(formattedDate);
    console.log(formattedDate);
  }, []);

  const fetchMainUser = (date) => {
    getMainUser(date)
      .then((response) => {
        setUserToday(response);
      })
      .catch((error) => console.error(error));
  };

  const chartData = {
    labels: ['Tops', 'Bottoms', 'Outerwear', 'Skirts', 'Dresses', 'Sportswear'], // 옷의 종류
    datasets: [
      {
        label: '판매량',
        data: [300, 150, 200, 100, 100, 100], // 팔린 수량
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          'red',
          'black',
        ], // 색상
        hoverOffset: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true, // 반응형 설정
    maintainAspectRatio: false, // 부모 요소에 따라 비율 조정
    plugins: {
      legend: {
        position: 'bottom', // 범례 위치
      },
      datalabels: {
        color: 'white', // 라벨 색상
        font: {
          size: 14, // 라벨 폰트 크기
          weight: 'bold',
        },
        formatter: (value, context) => {
          // 데이터 값에 퍼센트 표시
          const total = context.chart.data.datasets[0].data.reduce(
            (a, b) => a + b,
            0
          );
          const percentage = ((value / total) * 100).toFixed(1) + '%';
          return `${percentage}`;
        },
        align: 'center',
        anchor: 'center',
      },
    },
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <hr />
      <h3>종류별 판매현황</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
          marginBottom: '20px',
        }}
      >
        {/* 원형 그래프 추가 */}
        <div style={{ width: '100%', maxWidth: '500px', height: '300px' }}>
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* 주문 통계 표 */}
      <h4>오늘 주문 통계</h4>
      <Row className="mb-4">
        <Col>
          <Table bordered>
            <thead>
              <tr>
                <th colSpan="2">주문현황</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>총 주문건수</td>
                <td>40</td>
              </tr>
              <tr>
                <td>총 주문액</td>
                <td>2,623,600</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <Table bordered>
            <thead>
              <tr>
                <th colSpan="5">주문상태 현황</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>입금대기</td>
                <td>입금완료</td>
                <td>배송준비</td>
                <td>배송중</td>
                <td>배송완료</td>
              </tr>
              <tr>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>1</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <Table bordered>
            <thead>
              <tr>
                <th colSpan="6">구매확정/클레임 현황</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>구매확정</td>
                <td>취소</td>
                <td>환불</td>
                <td>반품</td>
                <td>교환</td>
              </tr>
              <tr>
                <td>0</td>
                <td>39</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <h4>오늘 가장 많이 본 상품</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>순위</th>
            <th>상품명</th>
            <th>분류</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Classic T-shirt</td>
            <td>Tops</td>
            <td>45</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Leathre Jacket</td>
            <td>Outerwear</td>
            <td>25</td>
          </tr>
        </tbody>
      </Table>

      <br />
      <br />
      <h4>오늘 회원가입 인원 수</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th colSpan="2">유저현황</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>회원가입 수</td>
            <td>{userToday.todayUser}</td>
          </tr>
          <tr>
            <td>총 유저 수</td>
            <td>{userToday.totalUser}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Dashboard;
