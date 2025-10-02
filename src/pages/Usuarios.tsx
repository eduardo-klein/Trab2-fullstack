import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { Table, Button, Container } from "react-bootstrap";

interface Usuario {
  id: number;
  nome: string;
  senha: string;
  tipo: string;
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
  api.get("/usuarios")
    .then(res => {
      //console.log("Resposta da API:", res.data);
      setUsuarios(res.data);
    })
    .catch(err => {
      console.error("Erro ao buscar usuários:", err);
    });
}, []);

  const deletar = async (id: number) => {
    await api.delete(`/usuarios/${id}`);
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  return (
    <Container className="mt-4">
      <h2>Usuários</h2>
      <Link to="/usuarios/novo">
        <Button className="mb-3">Novo Usuário</Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nome}</td>
              <td>{u.tipo}</td>
              <td>
                <Link to={`/usuarios/editar/${u.id}`}>
                  <Button variant="warning" size="sm" className="me-2">
                    Editar
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deletar(u.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
