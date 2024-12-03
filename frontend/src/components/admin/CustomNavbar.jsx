import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavbar = ({ onMenuClick }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Company Name</Navbar.Brand>
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
              <Link to="/admin/" className="nav-link">
                홈
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/admin/user" className="nav-link">
                회원관리
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/admin/order" className="nav-link">
                주문관리
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/admin/item" className="nav-link">
                상품관리
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
