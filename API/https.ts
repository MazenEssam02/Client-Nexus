import axios from "axios";
export const apiClient = axios.create({
  baseURL: "http://clientnexus.runasp.net",
  timeout: 10000,
});
let token = "";
function getToken() {
  apiClient
    .post("api/Auth/login", {
      email: "Georgegeham@outlook.com",
      password: "123456789",
    })
    .then((response) => {
      console.log("Fetched the token Successfully");
      token = response.data.token;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("Finished");
    });
}
getToken();
apiClient.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const ServiceProvider = {
  getAll: () => apiClient.get("/api/ServiceProvider"),
  getById: (id) => apiClient.get(`/api/ServiceProvider/${id}`),
  getFeedbacks: (id) => apiClient.get(`/api/Feedback/provider/${id}`),
  getBySearch: (searchQuery) =>
    apiClient.get(`/api/ServiceProvider/Search?searchQuery=${searchQuery}`),
  getQA: (id) => apiClient.get(`/api/qa/provider/${id}`),
  filter: (filterData) =>
    apiClient.get("/api/ServiceProivder/filter", {
      params: {
        searchQuery: filterData.searchQuery,
        minRate: filterData.minRate,
        state: filterData.state,
        city: filterData.city,
        specializationName: filterData.speciality,
      },
    }),
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

export const Client = {
  get: () => apiClient.get("api/Client"),
  update: ({
    email,
    firstName,
    lastName,
    birthDate,
    phoneNumber,
    newPassword,
  }) =>
    apiClient.put("api/Client", {
      email: email,
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      phoneNumber: phoneNumber,
      newPassword: newPassword,
    }),
};
