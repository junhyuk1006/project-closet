import React, { useState } from 'react';
import { Container, Row, Col, Offcanvas } from 'react-bootstrap';

import CustomNavbar from '../../components/admin/CustomNavbar';
import Sidebar from '../../components/admin/Sidebar';
import Ask from '../../components/admin/Content/Ask';
import Dashboard from '../../components/admin/Content/Dashboard';
import Exchange from '../../components/admin/Content/Exchange';
import Notice from '../../components/admin/Content/Notice';
import Order from '../../components/admin/Content/Order';
import Point from '../../components/admin/Content/Point';
import Review from '../../components/admin/Content/Review';
import Sales from '../../components/admin/Content/Sales';
import Stock from '../../components/admin/Content/Stock';
import User from '../../components/admin/Content/User';

const Admin = () => {
  // 활성화된 메뉴를 추적하기 위한 상태
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [showSidebar, setShowSidebar] = useState(false); // 모바일 환경에서 사이드바 처리

  // 메뉴 클릭 핸들러
  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // 클릭된 메뉴로 상태 변경
    setShowSidebar(false); // 모바일 환경에서 메뉴 클릭 시 사이드바 닫기
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return <Dashboard />;
      case 'User':
        return <User />;
      case 'Notice':
        return <Notice />;
      case 'Stock':
        return <Stock />;
      case 'Order':
        return <Order />;
      case 'Exchange':
        return <Exchange />;
      case 'Sales':
        return <Sales />;
      case 'Review':
        return <Review />;
      case 'Ask':
        return <Ask />;
      case 'Point':
        return <Point />;
      default:
        return <Dashboard />;
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
          <Offcanvas.Title>Sidebar</Offcanvas.Title>
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
            <a
              href="/"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >
              <span className="fs-4">Sidebar</span>
            </a>
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

export default Admin;
