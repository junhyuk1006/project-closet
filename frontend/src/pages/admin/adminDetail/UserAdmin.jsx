import React, { useState } from 'react';
import { Col, Container, Offcanvas, Row } from 'react-bootstrap';
import CustomNavbar from '../../../components/admin/CustomNavbar';

import Point from '../../../components/admin/content/user/Point';
import User from '../../../components/admin/content/user/User';
import UserDashboard from '../../../components/admin/content/user/UserDashboard';
import UserLevel from '../../../components/admin/content/user/UserLevel';
import Sidebar from '../../../components/admin/sidebar/UserSidebar';
const UserAdmin = () => {
  // 활성화된 메뉴를 추적하기 위한 상태
  const [activeMenu, setActiveMenu] = useState('User');
  const [showSidebar, setShowSidebar] = useState(false); // 모바일 환경에서 사이드바 처리

  // 메뉴 클릭 핸들러
  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // 클릭된 메뉴로 상태 변경
    setShowSidebar(false); // 모바일 환경에서 메뉴 클릭 시 사이드바 닫기
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'User':
        return <User />;
      case 'UserLevel':
        return <UserLevel />;
      case 'UserDashboard':
        return <UserDashboard />;
      case 'Point':
        return <Point />;
      default:
        return <User />;
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
          <Offcanvas.Title>회원관리</Offcanvas.Title>
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
            <div
              href="#"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >
              <span className="fs-4">회원관리</span>
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

export default UserAdmin;
