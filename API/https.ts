import axios from "axios";
export const apiClient = axios.create({
  baseURL: "http://clientnexus.runasp.net",
  timeout: 10000,
});
apiClient.interceptors.request.use((config) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtYXplbmVzc2FtMjAxMUBvdXRsb29rLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkNsaWVudCIsImV4cCI6MTc0NjIwNTk2MSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3QiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdCJ9.Few__14m3U-LcWRV_WNQSgDkYyFvTxcS3HRUW5nExkc";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const Lawyers = {
  getAll: () => apiClient.get("/ServiceProvider"),
  getById: (id) => apiClient.get(`/ServiceProvider/${id}`),
  auth: () =>
    apiClient.post("/Auth/login", {
      email: "Mazenessam2011@outlook.com",
      password: "123456789",
    }),
};

export const Documents = {
  getAll: () => apiClient.get("/api/Document"),
  getById: (id) => apiClient.get(`/api/Document/${id}`),
};
