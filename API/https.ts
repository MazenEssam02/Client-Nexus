import axios from "axios";
export const apiClient = axios.create({
  baseURL: "http://clientnexus.runasp.net",
  timeout: 10000,
});
apiClient.interceptors.request.use((config) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtYXplbmVzc2FtMjAxMUBvdXRsb29rLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkNsaWVudCIsImV4cCI6MTc0NjM1OTczOCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3QiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdCJ9.uLjtxtXlqoxG-3vnlAT9rtZheIMtp-C8Dg6Z8FLfHZU";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const ServiceProvider = {
  getAll: () => apiClient.get("/api/ServiceProvider"),
  getById: (id) => apiClient.get(`/api/ServiceProvider/${id}`),
  getFeedbacks: (id) => apiClient.get(`/api/Feedback/provider/${id}`),
  getQA: (id) => apiClient.get(`/api/qa/provider/${id}`),
};

export const Documents = {
  getAll: () => apiClient.get("/api/Document"),
  getById: (id) => apiClient.get(`/api/Document/${id}`),
};
export const Specialization = {
  getAll: () => apiClient.get("/api/Specialization/GetAllSpecializations"),
  delete: (id) => apiClient.delete(`/api/Specialization/delete/${id}`),
  add: ({ name, serviceProviderTypeId }) =>
    apiClient.post("/api/Specialization", {
      name: name,
      serviceProviderTypeId: serviceProviderTypeId,
    }),
};
