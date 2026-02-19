import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:8080/api/doctor_service",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default authApi;
