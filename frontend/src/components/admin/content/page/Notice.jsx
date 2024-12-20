import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Table, Pagination } from 'react-bootstrap';

const Notice = () => {
  const [Notices, setNotices] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(20);
  const [pageGroup, setPageGroup] = useState(0);

  // 검색 상태 하나의 객체로 관리
  const [searchParams, setSearchParams] = useState({
    searchKeyword: 'title',
    searchInput: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchNotice(currentPage, size, searchParams);
  }, []);

  const fetchNotice = (page, size, searchParams) => {
    const params = {
      page,
      size,
      ...searchParams,
    };
    getNotice(params)
      .then((response) => {
        setNotices(response.content);
        setTotalPages(response.totalPages);
      })
      .catch((error) => console.error(error));
  };

  const updateSearchParams = (key, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: value,
    }));
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

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchPointUser(page, size, searchParams);
  };

  const handleSearch = () => {
    setCurrentPage(0);
    fetchPointUser(0, size, searchParams);
  };

  const handleReset = () => {
    setSearchParams({
      searchKeyword: 'email',
      searchInput: '',
      startDate: '',
      endDate: '',
      grade: '',
    });
    setCurrentPage(0);
    setSize(20);
  };

  return (
    <div>
      <h2>공지</h2>
      <p>공지 페이지 입니다.</p>

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
                  <option>제목</option>
                  <option>내용</option>
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
            <th>내용</th>
            <th>생성날짜</th>
            <th>만료날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Notice;
