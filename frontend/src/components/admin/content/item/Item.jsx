import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Table, Pagination } from 'react-bootstrap';
import { getItem } from '../../../../api/admin/item/item';
const Item = () => {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(20);
  const [pageGroup, setPageGroup] = useState(0);

  const [searchParams, setSearchParams] = useState({
    searchKeyword: 'orderNo',
    searchInput: '',
    startDate: '',
    endDate: '',
    category: '',
    minPrice: 0,
    maxPrice: 0,
    status: '',
  });

  useEffect(() => {
    fetchItem(currentPage, size, searchParams);
  }, []);

  const fetchItem = (page, size, searchParams) => {
    const params = {
      page,
      size,
      ...searchParams,
    };
    getItem(params)
      .then((response) => {
        setItems(response.content);
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
    fetchItem(page, size, searchParams);
  };

  const handleSearch = () => {
    setCurrentPage(0);
    fetchItem(0, size, searchParams);
  };

  const handleReset = () => {
    setSearchParams({
      searchKeyword: 'orderNo',
      searchInput: '',
      startDate: '',
      endDate: '',
      category: '',
      minPrice: 0,
      maxPrice: 0,
      status: '',
    });
    setCurrentPage(0);
    setSize(20);
  };

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
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1 + currentPage * size}</td>
              <td>{item.mainImage}</td>
              <td>{item.itemName}</td>
              <td>{item.itemCategory}</td>
              <td>{item.itemPrice}</td>
              <td>{item.createdAt}</td>
              <td>{item.status}</td>
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

export default Item;
