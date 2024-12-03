import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '../../assets/styles/admin/admin.css';

const CustomNavbar = ({ onMenuClick }) => {
  const location = useLocation(); // 현재 경로 가져오기

  // 현재 경로와 비교해 활성화된 링크에 클래스 추가
  const isActive = (path) => location.pathname === path;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container-fluid">
        <Navbar.Brand href="/">Company Name</Navbar.Brand>
        <Button
          variant="outline-light"
          className="d-lg-none"
          onClick={onMenuClick}
        >
          메뉴
        </Button>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* React Router의 Link 컴포넌트로 경로 이동 */}
            <Nav.Item>
              <Link
                to="/admin/"
                className={`nav-link ${isActive('/admin/') ? 'active-link' : ''}`}
              >
                홈
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/admin/user"
                className={`nav-link ${isActive('/admin/user') ? 'active-link' : ''}`}
              >
                회원관리
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/admin/order"
                className={`nav-link ${isActive('/admin/order') ? 'active-link' : ''}`}
              >
                주문관리
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/admin/item"
                className={`nav-link ${isActive('/admin/item') ? 'active-link' : ''}`}
              >
                상품관리
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/admin/page"
                className={`nav-link ${isActive('/admin/page') ? 'active-link' : ''}`}
              >
                페이지관리
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default CustomNavbar;
