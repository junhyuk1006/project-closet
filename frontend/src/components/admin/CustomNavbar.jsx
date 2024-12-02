import { Navbar, Nav, Container, Button } from 'react-bootstrap';

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
            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#orders">Orders</Nav.Link>
            <Nav.Link href="#settings">Settings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
