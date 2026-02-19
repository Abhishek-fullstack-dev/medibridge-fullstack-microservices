import axios from "axios";

const doctorApi = axios.create({
  baseURL: "http://localhost:8081/api/doctors", // your doctor-service port
  headers: {
    "Content-Type": "application/json",
  },
});

// attach JWT token
doctorApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default doctorApi;
