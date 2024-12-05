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

// Chart.js 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Sales = () => {
  // 매출 데이터 (월별 매출)
  const chartData = {
    labels: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    datasets: [
      {
        label: '매출 (만원)',
        data: [500, 700, 800, 650, 900, 1000, 850, 750, 950, 1100, 1200, 1500],
        backgroundColor: 'rgba(255, 99, 132, 0.7)', // 붉은빛
        borderColor: 'rgba(255, 99, 132, 1)',
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
        text: '월별 매출 통계',
      },
    },
  };

  return (
    <div>
      <h2>매출</h2>
      <p>매출 페이지 입니다.</p>

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
            <Col xs={12} md={4} lg={3}>
              <Form.Group controlId="searchKeyword">
                <Form.Label>검색어</Form.Label>
                <Form.Control as="select">
                  <option>아이디</option>
                  <option>닉네임</option>
                  <option>이메일</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={8} lg={6}>
              <Form.Group controlId="searchInput">
                <Form.Label>검색값</Form.Label>
                <Form.Control type="text" placeholder="검색어 입력" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="align-items-center mb-3">
            <Col xs={12} md={6} lg={4}>
              <Form.Group controlId="dateRange">
                <Form.Label>기간검색</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control type="date" className="me-2" />
                  <Form.Control type="date" />
                </div>
              </Form.Group>
            </Col>
          </Row>
          {/* 버튼 그룹 */}
          <Row className="align-items-center mb-3">
            <Col xs={12} md={6} lg={4}>
              <Form.Group>
                <div className="d-flex gap-2">
                  <Button variant="outline-dark">오늘</Button>
                  <Button variant="outline-dark">일주일</Button>
                  <Button variant="outline-dark">한 달</Button>
                  <Button variant="outline-dark">전체</Button>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="dark" className="me-2">
              검색
            </Button>
            <Button variant="outline-secondary">초기화</Button>
          </div>
        </Form>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>매출액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2억</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Sales;
