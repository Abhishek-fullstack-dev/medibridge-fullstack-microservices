import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import BookAppointment from "./pages/patient/BookAppointment";
import Appointments from "./pages/Appointments";

import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import PatientProfile from "./pages/patient/PatientProfile";
import PatientSearch from "./pages/doctor/PatientSearch";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------- Public Routes ---------- */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* ---------- Common Protected Routes ---------- */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/patient/book-appointment"
  element={
    <ProtectedRoute>
      <BookAppointment />
    </ProtectedRoute>
  }
/>

        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />


        {/* ---------- Patient Routes ---------- */}
        <Route
          path="/patient/dashboard"
          element={
            <RoleProtectedRoute allowedRole="PATIENT">
              <PatientDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/patient/profile"
          element={
            <RoleProtectedRoute allowedRole="PATIENT">
              <PatientProfile />
            </RoleProtectedRoute>
          }
        />


        {/* ---------- Doctor Routes ---------- */}
        <Route
          path="/doctor/dashboard"
          element={
            <RoleProtectedRoute allowedRole="DOCTOR">
              <DoctorDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/doctor/profile"
          element={
            <RoleProtectedRoute allowedRole="DOCTOR">
              <DoctorProfile />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/doctor/patients"
          element={
            <RoleProtectedRoute allowedRole="DOCTOR">
              <PatientSearch />
            </RoleProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
