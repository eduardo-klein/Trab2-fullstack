import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function ProdutoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", valor: "", quantidade: "" });
  const [errors, setErrors] = useState({ nome: "", valor: "", quantidade: "" });

  useEffect(() => {
    if (id) {
      api.get(`/produtos/${id}`).then(res => setForm(res.data));
    }
  }, [id]);

  const validate = () => {
    const newErrors = { nome: "", valor: "", quantidade: "" };
    if (!form.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!form.valor || Number(form.valor) <= 0) newErrors.valor = "Valor deve ser maior que zero";
    if (!form.quantidade || Number(form.quantidade) < 0) newErrors.quantidade = "Quantidade não pode ser negativa";
    setErrors(newErrors);
    return !Object.values(newErrors).some(x => x !== "");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (id) {
      await api.put(`/produtos/${id}`, form);
    } else {
      await api.post("/produtos", form);
    }
    navigate("/produtos");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 400,
        margin: "auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
          Nome:<span style={{ color: "red" }}> *</span>
        </label>
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome do produto"
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            borderColor: errors.nome ? "red" : "#ccc",
          }}
        />
        {errors.nome && <small style={{ color: "red" }}>{errors.nome}</small>}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
          Valor:<span style={{ color: "red" }}> *</span>
        </label>
        <input
          type="number"
          name="valor"
          value={form.valor}
          onChange={handleChange}
          placeholder="Valor do produto"
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            borderColor: errors.valor ? "red" : "#ccc",
          }}
          step="0.01"
          min="0"
        />
        {errors.valor && <small style={{ color: "red" }}>{errors.valor}</small>}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
          Quantidade:<span style={{ color: "red" }}> *</span>
        </label>
        <input
          type="number"
          name="quantidade"
          value={form.quantidade}
          onChange={handleChange}
          placeholder="Quantidade em estoque"
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            borderColor: errors.quantidade ? "red" : "#ccc",
          }}
          min="0"
        />
        {errors.quantidade && (
          <small style={{ color: "red" }}>{errors.quantidade}</small>
        )}
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
          width: "100%",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        Salvar
      </button>
    </form>
  );
}
