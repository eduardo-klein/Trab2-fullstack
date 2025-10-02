import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function UsuarioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", senha: "", tipo: "" });
  const [errors, setErrors] = useState({ nome: "", senha: "", tipo: "" });

  useEffect(() => {
    if (id) {
      api.get(`/usuarios/${id}`).then(res => setForm(res.data));
    }
  }, [id]);

  const validate = () => {
    const newErrors = { nome: "", senha: "", tipo: "" };
    if (!form.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!form.senha.trim() || form.senha.length < 6) newErrors.senha = "Senha deve ter pelo menos 6 caracteres";
    if (!form.tipo) newErrors.tipo = "Tipo é obrigatório";
    setErrors(newErrors);
    return !Object.values(newErrors).some(x => x !== "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (id) {
      await api.put(`/usuarios/${id}`, form);
    } else {
      await api.post("/usuarios", form);
    }
    navigate("/usuarios");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
          Nome:<span style={{ color: "red" }}> *</span>
        </label>
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Digite seu nome"
          style={{ width: "100%", padding: 8, borderRadius: 4, borderColor: errors.nome ? "red" : "#ccc" }}
        />
        {errors.nome && <small style={{ color: "red" }}>{errors.nome}</small>}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
          Senha:<span style={{ color: "red" }}> *</span>
        </label>
        <input
          type="password"
          name="senha"
          value={form.senha}
          onChange={handleChange}
          placeholder="Digite uma senha"
          style={{ width: "100%", padding: 8, borderRadius: 4, borderColor: errors.senha ? "red" : "#ccc" }}
        />
        {errors.senha && <small style={{ color: "red" }}>{errors.senha}</small>}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
          Tipo:<span style={{ color: "red" }}> *</span>
        </label>
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          style={{ width: "100%", padding: 8, borderRadius: 4, borderColor: errors.tipo ? "red" : "#ccc" }}
        >
          <option value="">Selecione o tipo</option>
          <option value="admin">Administrador</option>
          <option value="user">Usuário</option>
          <option value="guest">Convidado</option>
        </select>
        {errors.tipo && <small style={{ color: "red" }}>{errors.tipo}</small>}
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          fontWeight: "bold",
          width: "100%"
        }}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        Salvar
      </button>
    </form>
  );
}
