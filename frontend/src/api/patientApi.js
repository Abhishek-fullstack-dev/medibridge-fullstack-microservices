import axios from "axios";

const patientApi = axios.create({
  baseURL: "http://localhost:8084/api/patients",
  headers: {
    "Content-Type": "application/json",
  },
});

patientApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default patientApi;
