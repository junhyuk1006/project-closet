import { Form, Button, Row, Col, Table } from 'react-bootstrap';

const Ask = () => {
  return (
    <div>
      <h2>상품문의</h2>
      <p>상품문의 페이지 입니다.</p>
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
                <Form.Label>기간검색(작성일)</Form.Label>
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

          <Row className="align-items-center">
            <Col xs={12}>
              <Form.Group controlId="levelSearch">
                <Form.Label>레벨검색</Form.Label>
                <div>
                  <Form.Check
                    inline
                    label="전체"
                    type="radio"
                    name="level"
                    defaultChecked
                  />
                  <Form.Check
                    inline
                    label="답변 대기"
                    type="radio"
                    name="level"
                  />
                  <Form.Check
                    inline
                    label="답변 완료"
                    type="radio"
                    name="level"
                  />
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
            <th>이미지</th>
            <th>상품명</th>
            <th>내용</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>답변상태</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cell</td>
            <td>우븐 숄 머플러 인디라 와인 SA-2HW362WI</td>
            <td>XX 색상 재입고 예정일이 언제인가요?</td>
            <td>asdf1234</td>
            <td>24/12/03</td>
            <td>답변완료</td>
            <td>active</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Cell</td>
            <td>Guy Laroche 토리노 지퍼 동전 카드케이스 GL-9300-TR-NY</td>
            <td>배송 기간은 얼마나 걸리나요?</td>
            <td>zxcv1234</td>
            <td>24/10/03</td>
            <td>답변대기</td>
            <td>inactive</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Ask;
