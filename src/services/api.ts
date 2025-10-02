import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // porta da API
});

export default api;
