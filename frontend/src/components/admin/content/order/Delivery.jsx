import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Table, Pagination } from 'react-bootstrap';
import { getDelivery } from '../../../../api/admin/order/order';

const Delivery = () => {
  const [delivery, setDelivery] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(20);
  const [pageGroup, setPageGroup] = useState(0);

  const [searchParams, setSearchParams] = useState({
    searchKeyword: 'deliveryNo',
    searchInput: '',
    startDate: '',
    endDate: '',
    deliveryStatus: '',
  });

  useEffect(() => {
    fetchDelivery(currentPage, size, searchParams);
  }, []);

  const fetchDelivery = (page, size, searchParams) => {
    const params = {
      page,
      size,
      ...searchParams,
    };
    getDelivery(params)
      .then((response) => {
        setDelivery(response.content);
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
    fetchDelivery(page, size, searchParams);
  };

  const handleSearch = () => {
    setCurrentPage(0);
    fetchDelivery(0, size, searchParams);
  };

  const handleReset = () => {
    setSearchParams({
      searchKeyword: 'deliveryNo',
      searchInput: '',
      startDate: '',
      endDate: '',
    });
    setCurrentPage(0);
    setSize(20);
  };

  return (
    <div>
      <h2>배송</h2>
      <p>배송 페이지 입니다.</p>

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
                <Form.Control
                  as="select"
                  name="searchKeyword"
                  value={searchParams.searchKeyword}
                  onChange={(e) =>
                    updateSearchParams('searchKeyword', e.target.value)
                  }
                >
                  <option value="deliveryNo">배송번호</option>
                  <option value="orderNo">주문번호</option>
                  <option value="email">이메일</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={8} lg={6}>
              <Form.Group controlId="searchInput">
                <Form.Label>검색값</Form.Label>
                <Form.Control
                  name="searchInput"
                  value={searchParams.searchInput}
                  type="text"
                  placeholder="검색어 입력"
                  onChange={(e) =>
                    updateSearchParams('searchInput', e.target.value)
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="align-items-center mb-3">
            <Col xs={12} md={6} lg={4}>
              <Form.Group controlId="dateRange">
                <Form.Label>기간검색(주문일)</Form.Label>
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
                  <Form.Check inline label="배송전" type="radio" name="level" />
                  <Form.Check inline label="배송중" type="radio" name="level" />
                  <Form.Check
                    inline
                    label="배송완료"
                    type="radio"
                    name="level"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-3">
            <Button variant="dark" className="me-2" onClick={handleSearch}>
              검색
            </Button>
            <Button variant="outline-secondary" onClick={handleReset}>
              초기화
            </Button>
          </div>
        </Form>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>번호</th>
            <th>배송번호</th>
            <th>이메일</th>
            <th>주문번호</th>
            <th>주문날짜</th>
            <th>배송조회</th>
          </tr>
        </thead>
        <tbody>
          {delivery.map((del, index) => (
            <tr key={del.id}>
              <td>{index + 1 + currentPage * size}</td>
              <td>{del.deliveryNumber}</td>
              <td>{del.email}</td>
              <td>{del.orderNumber}</td>
              <td>{del.paymentDate}</td>
              <td>{del.deliveryNumber ? del.deliveryStatus : '배송전'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center mt-5">
        {/* Pagination */}
        <Pagination>
          {/** 이전 그룹 버튼 */}
          <Pagination.Prev
            hidden={pageGroup === 0}
            onClick={() => setPageGroup(pageGroup - 1)}
          >
            이전
          </Pagination.Prev>
          {/** 현재 그룹의 페이지 번호 */}
          {Array.from(
            { length: Math.min(10, totalPages - pageGroup * 10) },
            (_, i) => {
              const pageNumber = pageGroup * 10 + i;
              return (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === currentPage}
                  className={`custom-page-item ${pageNumber === currentPage ? 'custom-active' : ''}`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber + 1}
                </Pagination.Item>
              );
            }
          )}

          {/** 다음 그룹 버튼 */}
          <Pagination.Next
            hidden={(pageGroup + 1) * 10 >= totalPages}
            onClick={() => setPageGroup(pageGroup + 1)}
          >
            다음
          </Pagination.Next>
        </Pagination>
      </div>
    </div>
  );
};

export default Delivery;
