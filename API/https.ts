import axios from "axios";
import SSE from "react-native-sse";
export const apiClient = axios.create({
  baseURL: "http://clientnexus.runasp.net",
  timeout: 10000,
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
export const Slots = {
  getWeek: ({ serviceProviderId, startDate, endDate, type }) =>
    apiClient.get(
      `/api/slots?serviceProviderId=${serviceProviderId}&startDate=${startDate}&endDate=${endDate}&type=${type}`
    ),
  getById: (id) => apiClient.get(`/api/slots/${id}`),
};
export const Appointments = {
  bookAppointment: (slotId) =>
    apiClient.post(`/api/appointments`, { slotId: slotId }),
  getById: (id) => apiClient.get(`/api/appointments/${id}`),
};
export const EmeregencyCases = {
  requestEmergency: ({
    name,
    description,
    meetingLatitude,
    meetingLongitude,
  }) =>
    apiClient.post(`/api/emergency-cases`, {
      name: name,
      description: description,
      meetingLatitude: meetingLatitude,
      meetingLongitude: meetingLongitude,
    }),
  deleteEmergency: (id) => apiClient.delete(`/api/emergency-cases/${id}`),
};
