import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Usuarios from "./pages/Usuarios";
import UsuarioForm from "./pages/UsuarioForm";
import Produtos from "./pages/Produtos";
import ProdutoForm from "./pages/ProdutoForm";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/novo" element={<UsuarioForm />} />
          <Route path="/usuarios/editar/:id" element={<UsuarioForm />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/novo" element={<ProdutoForm />} />
          <Route path="/produtos/editar/:id" element={<ProdutoForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
