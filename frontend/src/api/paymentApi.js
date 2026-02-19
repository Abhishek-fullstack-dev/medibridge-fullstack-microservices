import axios from "axios";

const paymentApi = axios.create({
  baseURL: "http://localhost:8084/api/payments",
  headers: { "Content-Type": "application/json" },
});

paymentApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default paymentApi;
