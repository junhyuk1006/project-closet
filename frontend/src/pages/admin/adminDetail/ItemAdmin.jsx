import React, { useState } from 'react';
import { Col, Container, Offcanvas, Row } from 'react-bootstrap';

import CustomNavbar from '../../../components/admin/CustomNavbar';

import Ask from '../../../components/admin/content/item/Ask';
import Item from '../../../components/admin/content/item/Item';
import Review from '../../../components/admin/content/item/Review';
import Stock from '../../../components/admin/content/item/Stock';
import Sidebar from '../../../components/admin/sidebar/ItemSidebar';
import ExcelItem from '../../../components/admin/content/item/ExcelItem';
const ItemAdmin = () => {
  // 활성화된 메뉴를 추적하기 위한 상태
  const [activeMenu, setActiveMenu] = useState('Item');
  const [showSidebar, setShowSidebar] = useState(false); // 모바일 환경에서 사이드바 처리

  // 메뉴 클릭 핸들러
  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // 클릭된 메뉴로 상태 변경
    setShowSidebar(false); // 모바일 환경에서 메뉴 클릭 시 사이드바 닫기
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'Item':
        return <Item />;
      case 'Stock':
        return <Stock />;
      case 'Review':
        return <Review />;
      case 'Ask':
        return <Ask />;
      case 'ExcelItem':
        return <ExcelItem />;
      default:
        return <Item />;
    }
  };

  return (
    <div>
      {/* 상단 네비게이션 바 */}
      <CustomNavbar onMenuClick={() => setShowSidebar(true)} />

      {/* Offcanvas 사이드바 */}
      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        className="bg-light"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>상품관리</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Sidebar activeMenu={activeMenu} handleMenuClick={handleMenuClick} />
        </Offcanvas.Body>
      </Offcanvas>

      {/* 메인 콘텐츠 */}
      <Container fluid>
        <Row>
          {/* 사이드바 */}
          <Col
            xs={12}
            md={2}
            className="d-none d-lg-flex flex-column flex-shrink-0 p-3 bg-light"
            style={{ height: '100vh' }}
          >
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
              <span className="fs-4">상품관리</span>
            </div>
            <hr />
            <Sidebar
              activeMenu={activeMenu}
              handleMenuClick={handleMenuClick}
            />
          </Col>
          {/* 대시보드 콘텐츠 */}
          <Col sm={9} className="p-4">
            {renderContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ItemAdmin;
