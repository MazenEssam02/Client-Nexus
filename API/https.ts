import axios from "axios";
export const apiClient = axios.create({
  baseURL: "http://clientnexus.runasp.net",
  timeout: 10000,
});

export const ServiceProvider = {
  getAll: () => apiClient.get("/api/ServiceProvider"),
  getById: (id) => apiClient.get(`/api/ServiceProvider/${id}`),
  getFeedbacks: (id) =>
    apiClient.get(`/api/Feedback/provider/${id}?pageNumber=1&pageSize=20`),
  getBySearch: (searchQuery) =>
    apiClient.get(`/api/ServiceProvider/Search?searchQuery=${searchQuery}`),
  getQA: (id) => apiClient.get(`/api/qa/provider/${id}?offset=0&limit=20`),
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
  setFeedback: ({ serviceProviderId, rate, feedback }) =>
    apiClient.post("/api/Feedback", {
      serviceProviderId: serviceProviderId,
      rate: rate,
      feedback: feedback,
    }),
};

export const Documents = {
  getAll: () => apiClient.get("/api/Document"),
  getById: (id) => apiClient.get(`/api/Document/${id}`),
};
export const Notifications = {
  getAll: () => apiClient.get("/api/notifications"),
  getById: (id) => apiClient.get(`/api/notifications/${id}`),
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
  get: (id) => apiClient.get("api/Client", { params: { id: id } }),
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
  getEmergencies: () => apiClient.get(`/api/emergency-cases?offset=0&limit=10`),
  deleteEmergency: (id) => apiClient.delete(`/api/emergency-cases/${id}`),
  acceptEmergency: (id, serviceProviderId) =>
    apiClient.patch(`/api/emergency-cases/${id}/accept`, {
      serviceProviderId: serviceProviderId,
    }),
  endEmergency: (id) => apiClient.patch(`/api/emergency-cases/${id}/status`),
};

export const Filter = {
  getCity: () => apiClient.get("api/City"),
  getState: () => apiClient.get("api/State"),
  getSpeciality: () =>
    apiClient.get("api/Specialization/GetAllSpecializations"),
};
export const Payment = {
  sevricePayment: ({
    clientId,
    serviceProviderId,
    serviceName,
    amount,
    email,
    firstName,
    lastName,
    phone,
  }) =>
    apiClient.post(`/api/payment/service`, {
      ClientId: clientId,
      ServiceProviderId: serviceProviderId,
      ServiceName: serviceName,
      Amount: amount,
      Email: email,
      FirstName: firstName,
      LastName: lastName,
      Phone: phone,
    }),
};
