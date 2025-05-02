import axios from "axios";

const baseURL = "http://clientnexus.runasp.net/api";
const api = axios.create({
  baseURL: baseURL,
  // You can add default headers, timeouts, etc., here if needed
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`,
  // },
  timeout: 10000,
});

export default api;
