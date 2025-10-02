import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Trabalho 2 - G1</h1>
      <Row>
        <Col md={6}>
          <Card className="mb-3 shadow">
            <Card.Body>
              <Card.Title>Gerenciar Usuários</Card.Title>
              <Card.Text>
                Cadastre, edite ou remova usuários do sistema.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate("/usuarios")}>
                Ir para Usuários
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-3 shadow">
            <Card.Body>
              <Card.Title>Gerenciar Produtos</Card.Title>
              <Card.Text>
                Cadastre, edite, busque ou remova produtos do estoque.
              </Card.Text>
              <Button variant="success" onClick={() => navigate("/produtos")}>
                Ir para Produtos
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
