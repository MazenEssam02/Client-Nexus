import axios from "axios";
import { useMutation } from "@tanstack/react-query";
const apiClient = axios.create({
  baseURL: "http://clientnexus.runasp.net",
  timeout: 10000,
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

const Articles = {
  getAll: () => apiClient.get("/Document"),
  getById: (id) => apiClient.get(`/Document/${id}`),
};
export const register = async () => {
  const response = await apiClient.post("/api/Auth/register", {
    FirstName: "Mazen",
    LastName: "Mazen",
    Email: "mazenessam2011@outlook.com",
    Password: "123456789",
    PhoneNumber: "01111265118",
    UserType: 67,
  });
  console.log(response.data);
  // Assuming the backend sends { token: "your-jwt-token" }
  const { token } = response.data;
  return token;
};
export const login = async () => {
  const response = await apiClient.post("/api/Auth/login", {
    email: "mazenessam2011@outlook.com",
    password: "123456789",
  });
  // console.log(response.data);
  // Assuming the backend sends { token: "your-jwt-token" }
  const { token } = response.data;
  return token;
};
export const createCategory = async (categoryData) => {
  const token = await login();
  // console.log(token);
  const response = await apiClient.get(
    "api/qa/client?offset=0&limit=10&onlyUnanswered=false",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

// export const useCreateCategory = () => {
//   return useMutation(createCategory);
// };
// const app = () => {
//   const { mutate, isLoading, isError, error } = useCreateCategory();

//   const handleCreate = () => {
//     mutate({
//       name: "New Category", // example payload
//     });
//   };
//   handleCreate();
// };
createCategory();
