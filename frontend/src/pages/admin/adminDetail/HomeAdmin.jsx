import React, { useState } from 'react';
import { Container, Row, Col, Offcanvas } from 'react-bootstrap';

import CustomNavbar from '../../../components/admin/CustomNavbar';

import Sidebar from '../../../components/admin/sidebar/Sidebar';
import Ask from '../../../components/admin/content/Ask';
import Dashboard from '../../../components/admin/content/Dashboard';
import Exchange from '../../../components/admin/content/Exchange';
import Notice from '../../../components/admin/content/Notice';
import Order from '../../../components/admin/content/Order';
import Point from '../../../components/admin/content/Point';
import Review from '../../../components/admin/content/Review';
import Sales from '../../../components/admin/content/Sales';
import Stock from '../../../components/admin/content/Stock';
import User from '../../../components/admin/content/User';
const HomeAdmin = () => {
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

      {/* 메인 콘텐츠 */}
      <Container fluid>
        <Row>
          {/* 대시보드 콘텐츠 */}
          <Col sm={9} className="p-4">
            {renderContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeAdmin;
