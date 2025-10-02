import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { Table, Button, Form, Row, Col, Container } from "react-bootstrap";

interface Produto {
  id: number;
  nome: string;
  valor: number;
  quantidade: number;
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtros, setFiltros] = useState({ nome: "", valor: "", quantidade: "" });

  const carregarProdutos = async () => {
    const params: any = {};
    if (filtros.nome) params.nome = filtros.nome;
    if (filtros.valor) params.valor = filtros.valor;
    if (filtros.quantidade) params.quantidade = filtros.quantidade;

    const res = await api.get("/produtos/buscar", { params });
    setProdutos(res.data);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const deletar = async (id: number) => {
    await api.delete(`/produtos/${id}`);
    setProdutos(produtos.filter(p => p.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    carregarProdutos();
  };

  return (
    <Container className="mt-4">
      <h2>Produtos</h2>
      <Link to="/produtos/novo">
        <Button className="mb-3">Novo Produto</Button>
      </Link>

      <Form onSubmit={handleBuscar} className="mb-3">
        <Row>
          <Col><Form.Control name="nome" placeholder="Nome" value={filtros.nome} onChange={handleChange} /></Col>
          <Col><Form.Control type="number" name="valor" placeholder="Valor" value={filtros.valor} onChange={handleChange} /></Col>
          <Col><Form.Control type="number" name="quantidade" placeholder="Quantidade" value={filtros.quantidade} onChange={handleChange} /></Col>
          <Col><Button type="submit">Buscar</Button></Col>
        </Row>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>R$ {p.valor}</td>
              <td>{p.quantidade}</td>
              <td>
                <Link to={`/produtos/editar/${p.id}`}>
                  <Button variant="warning" size="sm" className="me-2">Editar</Button>
                </Link>
                <Button variant="danger" size="sm" onClick={() => deletar(p.id)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
