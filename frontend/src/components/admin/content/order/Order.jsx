import { Form, Button, Row, Col, Table } from 'react-bootstrap';
const Order = () => {
  return (
    <div>
      <h2>주문</h2>
      <p>주문 페이지 입니다.</p>
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
                  <option>주문번호</option>
                  <option>회원아이디</option>
                  <option>상품이름</option>
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
                <Form.Label>기간검색(주문일)</Form.Label>
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
            <th>주문날짜</th>
            <th>주문번호</th>
            <th>상품이미지</th>
            <th>상품이름</th>
            <th>수량</th>
            <th>가격</th>
            <th>총주문액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2024/12/04</td>
            <td>24120410080576</td>
            <td>cell</td>
            <td>선인장 자수패치 반팔T</td>
            <td>2</td>
            <td>20,000</td>
            <td>40,000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2024/12/05</td>
            <td>24120510052475</td>
            <td>cell</td>
            <td>우븐 숄 머플러 인디라 와인 SA-2HW362WI</td>
            <td>1</td>
            <td>34,000</td>
            <td>34,000</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Order;
