import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Table, Pagination } from 'react-bootstrap';
import { getAllUserAdmin } from '../../../../api/admin/user/user';
import '../../../../assets/styles/admin/user.css';
const User = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(20);

  useEffect(() => {
    fetchUsers(currentPage, size);
  }, [currentPage, size]);

  const fetchUsers = (page, size) => {
    getAllUserAdmin(page, size)
      .then((response) => {
        setUsers(response.content);
        setTotalPages(response.totalPages);
      })
      .catch((error) => console.error(error));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2>회원관리</h2>
      <p>회원관리 페이지 입니다.</p>
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
                <Form.Label>기간검색(가입날짜)</Form.Label>
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
                    label="일반회원"
                    type="radio"
                    name="level"
                  />
                  <Form.Check
                    inline
                    label="우수회원"
                    type="radio"
                    name="level"
                  />
                  <Form.Check
                    inline
                    label="특별회원"
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
            <th>아이디</th>
            <th>닉네임</th>
            <th>등급</th>
            <th>생년월일</th>
            <th>포인트</th>
            <th>구매수</th>
            <th>가입일</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1 + currentPage * size}</td>
              <td>{user.username}</td>
              <td>{user.nickname}</td>
              <td>{user.grade}</td>
              <td>{user.birth}</td>
              <td>{user.point}</td>
              <td>{user.buy}</td>
              <td>{user.createdAt}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item
            key={i}
            active={i === currentPage}
            className={`custom-page-item ${i === currentPage ? 'custom-active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default User;
