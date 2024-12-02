import React, { useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Table } from 'react-bootstrap';
import { FaHome, FaChartBar, FaShoppingCart, FaBoxOpen, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
  // 활성화된 메뉴를 추적하기 위한 상태
  const [activeMenu, setActiveMenu] = useState("Home");

  // 메뉴 클릭 핸들러
  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // 클릭된 메뉴로 상태 변경
  };

  return (
    <div>
      {/* 상단 네비게이션 바 */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Company Name</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#dashboard">Dashboard</Nav.Link>
              <Nav.Link href="#orders">Orders</Nav.Link>
              <Nav.Link href="#settings">Settings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 메인 콘텐츠 */}
      <Container fluid>
        <Row>
          {/* 사이드바 */}
          <Col xs={2} className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ height: "100vh" }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
              <span className="fs-4">Sidebar</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <a
                  href="#"
                  className={`nav-link ${activeMenu === "Home" ? "active" : "link-dark"}`}
                  onClick={() => handleMenuClick("Home")} // 클릭 시 상태 업데이트
                >
                  <FaHome className="me-2" /> Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`nav-link ${activeMenu === "Dashboard" ? "active" : "link-dark"}`}
                  onClick={() => handleMenuClick("Dashboard")}
                >
                  <FaChartBar className="me-2" /> Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`nav-link ${activeMenu === "Orders" ? "active" : "link-dark"}`}
                  onClick={() => handleMenuClick("Orders")}
                >
                  <FaShoppingCart className="me-2" /> Orders
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`nav-link ${activeMenu === "Products" ? "active" : "link-dark"}`}
                  onClick={() => handleMenuClick("Products")}
                >
                  <FaBoxOpen className="me-2" /> Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`nav-link ${activeMenu === "Customers" ? "active" : "link-dark"}`}
                  onClick={() => handleMenuClick("Customers")}
                >
                  <FaUsers className="me-2" /> Customers
                </a>
              </li>
            </ul>
          </Col>

          {/* 대시보드 콘텐츠 */}
          <Col sm={9} className="p-4">
            <h2>Dashboard</h2>
            <hr />
            <div style={{ height: '300px', background: '#f5f5f5', marginBottom: '20px' }}>
              <h5>Graph Area</h5>
            </div>
            <h4>Section title</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Header</th>
                  <th>Header</th>
                  <th>Header</th>
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
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;