import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
export const apiClient = axios.create({
  baseURL: "https://clientnexus.runasp.net",
  timeout: 10000,
});
export const Admin = {
  approveServiceProvider: (id) => apiClient.put(`api/Admin/approve/${id}`),
};
export const ServiceProvider = {
  getAll: () => apiClient.get("/api/ServiceProvider"),
  getApplications: () =>
    apiClient.get("/api/ServiceProvider/GetAll?isApproved=false"),
  getById: (id) => apiClient.get(`/api/ServiceProvider/?id=${id}`),
  getAppointments: () =>
    apiClient.get("api/appointments/provider?offset=0&limit=100"),
  deleteAppointment: (id) => apiClient.delete(`/api/appointments/${id}`),
  getFeedbacks: (id) =>
    apiClient.get(`/api/Feedback/provider/${id}?pageNumber=1&pageSize=20`),
  getBySearch: (searchQuery) =>
    apiClient.get(`/api/ServiceProvider/Search?searchQuery=${searchQuery}`),
  getUnansweredQA: () =>
    apiClient.get<
      {
        id: string;
        clientId: string;
      }[]
    >(`/api/qa/all?offset=0&limit=10&onlyUnanswered=true`),
  getQA: (id) => apiClient.get(`/api/qa/provider/${id}`),
  filter: (filterData) => {
    console.log("Filtered data from inside the request", filterData);
    return apiClient.get("/api/ServiceProvider/filter", {
      params: {
        searchQuery: filterData.searchQuery,
        minRate: filterData.minRate,
        state: filterData.state,
        city: filterData.city,
        specializationName: filterData.speciality,
      },
    });
  },
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
      console.log("Form Data from the request", formData);
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
  getAppointments: () => apiClient.get("api/appointments/client?offset=0"),
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
  getFeedbacks: (id) => apiClient.get(`/api/Feedback/Client/${id}`),
};
export const slotTypes = {
  phone: 80,
  "in-office": 73,
  online: 79,
};
export const Slots = {
  getWeek: ({ serviceProviderId, startDate, endDate, type }) =>
    apiClient.get(
      `/api/slots?serviceProviderId=${serviceProviderId}&startDate=${startDate}&endDate=${endDate}&type=${type}`
    ),
  get: async ({ serviceProviderId, startDate, endDate }) => {
    const allSlots = [];
    const slotTypesArray = Object.keys(slotTypes);
    for (const slotType of slotTypesArray) {
      const res = await apiClient.get(
        `/api/slots?serviceProviderId=${serviceProviderId}&startDate=${startDate}&endDate=${endDate}&type=${slotTypes[slotType]}`
      );
      if (res.data && res.data) {
        allSlots.push(...res.data);
      }
    }
    return allSlots;
  },
  getById: (id) => apiClient.get(`/api/slots/${id}`),
  create: ({ date, slotType, duration }) =>
    apiClient.post(`/api/slots`, {
      date,
      slotType,
      slotDuration: duration,
    }),
  generate: ({ startDate, endDate }) =>
    apiClient.post(`/api/slots/generate-slots`, {
      startDate,
      endDate,
    }),
  delete: (id) => apiClient.delete(`/api/slots/${id}`),
};
export const Appointments = {
  bookAppointment: (slotId) =>
    apiClient.post(`/api/appointments`, { slotId: slotId }),
  getById: (id) => apiClient.get(`/api/appointments/${id}`),
  finishAppointment: ({ id, status, reason }) =>
    apiClient.put(`/api/appointments/${id}`, {
      status: status,
      reason: reason,
    }),
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
  getAvailableEmergencies: (long, lat) =>
    apiClient.get(
      long && lat
        ? `/api/emergency-cases/available-emergencies?longitude=${long}&latitude=${lat}&radiusInMeters=10000`
        : "/api/emergency-cases/available-emergencies"
    ),
  deleteEmergency: (id) => apiClient.delete(`/api/emergency-cases/${id}`),
  acceptEmergency: (id, serviceProviderId) =>
    apiClient.patch(`/api/emergency-cases/${id}/accept`, {
      serviceProviderId: serviceProviderId,
    }),
  endEmergency: (id) => apiClient.patch(`/api/emergency-cases/${id}/status`),
  enableEmergency: (status = true) =>
    apiClient.put(`/api/emergency-cases/available-lawyers`, {
      status,
    }),
  sendLawyerLocation: (latitude, longitude) =>
    apiClient.put(`/api/emergency-cases/providers-locations`, {
      latitude: latitude,
      longitude: longitude,
    }),
  createOffer: (caseId, price, transportationType) =>
    apiClient.post(`/api/emergency-cases/${caseId}/offers`, {
      price: price,
      transportationType: transportationType,
    }),
};

export const Filter = {
  getCity: () => apiClient.get("api/City"),
  getState: () => apiClient.get("api/State"),
  getSpeciality: () =>
    apiClient.get("api/Specialization/GetAllSpecializations"),
};
export const Payment = {
  sevricePayment: ({
    serviceProviderId,
    serviceName,
    amount,
    email,
    firstName,
    lastName,
    phone,
  }) =>
    apiClient.post(`/api/payment/service`, {
      ServiceProviderId: serviceProviderId,
      ServiceName: serviceName,
      Amount: amount,
      Email: email,
      FirstName: firstName,
      LastName: lastName,
      Phone: phone,
    }),
  subscription: ({
    serviceProviderId,
    subscriptionType,
    subscriptionTier,
    email,
    firstName,
    lastName,
    phone,
  }) =>
    apiClient.post(`/api/payment/subscription`, {
      serviceProviderId,
      subscriptionType,
      subscriptionTier,
      email,
      firstName,
      lastName,
      phone,
    }),
  getStatus: (referenceKey) =>
    apiClient.get(`api/payment/status/${referenceKey}`),
};
