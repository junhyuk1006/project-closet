import { Form, Button, Row, Col, Table } from 'react-bootstrap';
const Point = () => {
  return (
    <div>
      <h2>포인트</h2>
      <p>포인트 페이지 입니다.</p>
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
                <Form.Label>기간검색(포인트지급?)</Form.Label>
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
            <th>번호</th>
            <th>아이디</th>
            <th>포인트내용</th>
            <th>지급날짜</th>
            <th>만료날짜</th>
            <th>포인트</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>asdf1234</td>
            <td>회원가입</td>
            <td>2024/09/06</td>
            <td>2025/03/06</td>
            <td>1000</td>
            <td>active</td>
          </tr>
          <tr>
            <td>2</td>
            <td>qwer1234</td>
            <td>상품구매</td>
            <td>2024/09/06</td>
            <td>2025/03/06</td>
            <td>200</td>
            <td>inactive</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Point;
