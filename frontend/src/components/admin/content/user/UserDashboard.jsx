import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { getUserMonth, getUserDate } from '../../../../api/admin/user/user';

// Chart.js 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserLevel = () => {
  const [userMonth, setUserMonth] = useState([]);
  const [userDate, setUserDate] = useState(0);

  const [searchParams, setSearchParams] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchUserMonth();
  }, []);

  const fetchUserMonth = () => {
    getUserMonth()
      .then((response) => {
        console.log(response);
        setUserMonth(response);
      })
      .catch((error) => console.error(error));
  };

  const fetchUserDate = (searchParams) => {
    getUserDate(searchParams)
      .then((response) => {
        setUserDate(response);
      })
      .catch((error) => console.error(error));
  };

  const updateSearchParams = (key, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleSearch = () => {
    fetchUserDate(searchParams);
  };

  const setDateRange = (range) => {
    const today = new Date();

    switch (range) {
      case 'today':
        updateSearchParams('startDate', formatDate(today));
        updateSearchParams('endDate', formatDate(today));
        break;
      case 'week':
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        updateSearchParams('startDate', formatDate(oneWeekAgo));
        updateSearchParams('endDate', formatDate(today));
        break;
      case 'month':
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1);
        updateSearchParams('startDate', formatDate(oneMonthAgo));
        updateSearchParams('endDate', formatDate(today));
        break;
      case 'all':
        updateSearchParams('startDate', '');
        updateSearchParams('endDate', '');
        break;
      default:
        break;
    }
  };

  const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);

  const completeData = allMonths.map((month) => {
    const found = userMonth.find((item) => item.month === month);
    return {
      year: found ? found.year : new Date().getFullYear,
      month,
      totalUser: found ? found.totalUser : 0,
    };
  });

  const labels = completeData.map((item) => `${item.month}월`);

  // 샘플 데이터 (월별 가입자 수)
  const chartData = {
    labels,
    datasets: [
      {
        label: '가입자 수',
        data: completeData.map((item) => item.totalUser),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // 차트 옵션
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '월별 가입 통계',
      },
    },
  };

  return (
    <div>
      <h2>가입통계</h2>
      <p>가입통계 페이지입니다.</p>
      {/* 막대 그래프 */}
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
          marginBottom: '30px',
        }}
      >
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* 기본 검색 폼 */}
      <div
        className="search-form mb-4"
        style={{
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '5px',
        }}
      >
        <Form>
          <Row className="align-items-center mb-3">
            <Col xs={12} md={6} lg={4}>
              <Form.Group controlId="dateRange">
                <Form.Label>기간검색</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={searchParams.startDate}
                    className="me-2"
                    onChange={(e) =>
                      updateSearchParams('startDate', e.target.value)
                    }
                  />
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={searchParams.endDate}
                    onChange={(e) =>
                      updateSearchParams('endDate', e.target.value)
                    }
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          {/* 버튼 그룹 */}
          <Row className="align-items-center mb-3">
            <Col xs={12} md={6} lg={4}>
              <Form.Group>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-dark"
                    onClick={() => setDateRange('today')}
                  >
                    오늘
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => setDateRange('week')}
                  >
                    일주일
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => setDateRange('month')}
                  >
                    한 달
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => setDateRange('all')}
                  >
                    전체
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="dark" className="me-2" onClick={handleSearch}>
              검색
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => setSearchParams({ startDate: '', endDate: '' })}
            >
              초기화
            </Button>
          </div>
        </Form>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>가입 수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userDate}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default UserLevel;
