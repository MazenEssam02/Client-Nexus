import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://localhost:5015/api",
  timeout: 10000,
});
const Lawyers = {
  getAll: () => apiClient.get("/lawyers"),
  getById: (id) => apiClient.get(`/lawyers/${id}`),
};
const Articles = {
  getAll: () => apiClient.get("/articles"),
  getById: (id) => apiClient.get(`/articles/${id}`),
};
