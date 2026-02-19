import DashboardLayout from "../layout/DashboardLayout";
import { getUserFromToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = getUserFromToken();
  const navigate = useNavigate();

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-sky-700">
          Welcome, Dr. {user?.name || "Doctor"} 👨‍⚕️
        </h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening today on{" "}
          <span className="font-semibold text-sky-600">MediBridge</span>
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        
        <div className="bg-white p-8 rounded-2xl shadow-md border border-sky-100
                        hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <p className="text-gray-500 mb-2">Total Patients</p>
          <h2 className="text-4xl font-bold text-sky-600">120</h2>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md border border-sky-100
                        hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <p className="text-gray-500 mb-2">Appointments Today</p>
          <h2 className="text-4xl font-bold text-cyan-600">15</h2>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md border border-sky-100
                        hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <p className="text-gray-500 mb-2">Pending Reports</p>
          <h2 className="text-4xl font-bold text-amber-600">8</h2>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div
          onClick={() => navigate("/doctor/profile")}
          className="bg-linear-to-br from-sky-500 to-cyan-500 text-white p-6 rounded-2xl shadow-lg
                     hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">My Profile</h3>
          <p className="text-sm opacity-90">Update your professional details</p>
        </div>

        <div
          onClick={() => navigate("/appointments")}
          className="bg-linear-to-br from-emerald-500 to-teal-500 text-white p-6 rounded-2xl shadow-lg
                     hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">Appointments</h3>
          <p className="text-sm opacity-90">View today's bookings</p>
        </div>

        <div
          onClick={() => navigate("/doctor/patients")}
          className="bg-linear-to-br from-indigo-500 to-violet-500 text-white p-6 rounded-2xl shadow-lg
                     hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">Patients</h3>
          <p className="text-sm opacity-90">Manage patient records</p>
        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;
