import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://clientnexus.runasp.net/swagger/index.html/api",
  timeout: 10000,
});
const Lawyers = {
  getAll: () => apiClient.get("/ServiceProvider"),
  getById: (id) => apiClient.get(`/ServiceProvider/${id}`),
};
const Articles = {
  getAll: () => apiClient.get("/Document"),
  getById: (id) => apiClient.get(`/Document/${id}`),
};
