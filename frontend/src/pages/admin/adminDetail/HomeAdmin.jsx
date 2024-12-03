import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import CustomNavbar from '../../../components/admin/CustomNavbar';

import Dashboard from '../../../components/admin/content/Dashboard';
const HomeAdmin = () => {
  const [showSidebar, setShowSidebar] = useState(false); // 모바일 환경에서 사이드바 처리
  return (
    <div>
      {/* 상단 네비게이션 바 */}
      <CustomNavbar onMenuClick={() => setShowSidebar(true)} />

      {/* 메인 콘텐츠 */}
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
      >
        <Row className="w-100">
          {/* 대시보드 콘텐츠 */}
          <Col sm={12} md={10} lg={9} xl={8} className="p-4 mx-auto">
            <Dashboard />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeAdmin;
