import { Form, Button, Row, Col, Table } from 'react-bootstrap';
const Review = () => {
  return (
    <div>
      <h2>상품</h2>
      <p>상품 페이지 입니다.</p>

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
                  <option>상품명</option>
                  <option>상품코드</option>
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

          {/* 카테고리 선택 폼 */}
          <Row className="align-items-center mb-3">
            <Col xs={12} md={6} lg={4}>
              <Form.Group controlId="categorySelect">
                <Form.Label>카테고리</Form.Label>
                <Form.Control as="select">
                  <option>전체</option>
                  <option>아우터</option>
                  <option>셔츠</option>
                  <option>청바지</option>
                  <option>a</option>
                  <option>b</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* 가격 설정 폼 */}
          <Row className="align-items-center mb-3">
            <Col xs={12} md={6} lg={4}>
              <Form.Group controlId="priceRange">
                <Form.Label>가격</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="number"
                    className="me-2"
                    placeholder="최소 가격"
                  />
                  <Form.Control type="number" placeholder="최대 가격" />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="align-items-center mb-3">
            <Col xs={12} md={6} lg={4}>
              <Form.Group controlId="dateRange">
                <Form.Label>기간검색(상품등록일)</Form.Label>
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
                <Form.Label>판매여부</Form.Label>
                <div>
                  <Form.Check
                    inline
                    label="전체"
                    type="radio"
                    name="level"
                    defaultChecked
                  />
                  <Form.Check inline label="판매" type="radio" name="level" />
                  <Form.Check inline label="품절" type="radio" name="level" />
                  <Form.Check inline label="중지" type="radio" name="level" />
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
            <th>상품등록일</th>
            <th>판매여부</th>
            <th>가격</th>
            <th>재고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cell</td>
            <td>우븐 숄 머플러 인디라 와인 SA-2HW362WI</td>
            <td>23/11/01</td>
            <td>판매</td>
            <td>45,000</td>
            <td>26</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Cell</td>
            <td>Guy Laroche 토리노 지퍼 동전 카드케이스 GL-9300-TR-NY</td>
            <td>23/11/04</td>
            <td>품절</td>
            <td>56,000</td>
            <td>0</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Review;
