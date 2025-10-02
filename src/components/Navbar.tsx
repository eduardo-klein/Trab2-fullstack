import { Navbar, Container, Nav } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

export default function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Trabalho 2 - G1</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <LinkContainer to="/usuarios">
              <Nav.Link>Usuários</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/produtos">
              <Nav.Link>Produtos</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
