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
  async update(formData) {
    try {
      const response = await apiClient.put("api/Client", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating client:", error);
      throw error;
    }
  },
  getAppointments: () =>
    apiClient.get("api/appointments/client?offset=0&limit=10"),
  getAllQuestions: () =>
    apiClient.get("api/qa/all?offset=0&limit=10&onlyUnanswered=false"),
  submitQA: (description) =>
    apiClient
      .post("api/qa/question", { questionBody: description })
      .then((response) => console.log(response))
      .catch((err) => console.log(err)),
  getMyQA: () =>
    apiClient.get("api/qa/client?offset=0&limit=10&onlyUnanswered=false"),
  submitQAFeedback: (id, feedback) =>
    apiClient.patch(`api/qa/${id}/mark?isHelpful=${feedback}`),
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
    meetingTextAddress,
    meetingLatitude,
    meetingLongitude,
  }) =>
    apiClient.post(`/api/emergency-cases`, {
      name: name,
      description: description,
      meetingLatitude: meetingLatitude,
      meetingLongitude: meetingLongitude,
      meetingTextAddress: meetingTextAddress,
    }),
  deleteEmergency: (id) => apiClient.delete(`/api/emergency-cases/${id}`),
  acceptEmergency: (id, serviceProviderId) =>
    apiClient.patch(`/api/emergency-cases/${id}/accept`, {
      serviceProviderId: serviceProviderId,
    }),
};
export const Filter = {
  getCity: () => apiClient.get("api/City"),
  getState: () => apiClient.get("api/State"),
  getSpeciality: () =>
    apiClient.get("api/Specialization/GetAllSpecializations"),
};
