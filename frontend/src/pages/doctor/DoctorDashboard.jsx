import { Link } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

function DoctorDashboard() {
  return (
    <DashboardLayout>

      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Doctor Admin Panel
        </h1>
        <p className="text-gray-500">
          Manage your profile, patients, and appointments from one place
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Profile Card */}
        <Link
          to="/doctor/profile"
          className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border hover:border-blue-500"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              My Profile
            </h2>
            <span className="text-blue-600 text-2xl">👨‍⚕️</span>
          </div>

          <p className="text-gray-600 mt-3">
            Update your professional profile & availability
          </p>

          <p className="mt-5 text-blue-600 font-medium group-hover:underline">
            Manage Profile →
          </p>
        </Link>

        {/* Appointments Card */}
        <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border hover:border-green-500 cursor-pointer">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Appointments
            </h2>
            <span className="text-green-600 text-2xl">📅</span>
          </div>

          <p className="text-gray-600 mt-3">
            View and manage today's appointments
          </p>

          <p className="mt-5 text-green-600 font-medium">
            View Appointments →
          </p>
        </div>

        {/* Patients Card */}
        <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border hover:border-purple-500 cursor-pointer">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Patients
            </h2>
            <span className="text-purple-600 text-2xl">🧑‍🤝‍🧑</span>
          </div>

          <p className="text-gray-600 mt-3">
            View patient records & medical history
          </p>

          <p className="mt-5 text-purple-600 font-medium">
            View Patients →
          </p>
        </div>

        {/* Search Patients */}
        <Link
          to="/doctor/patients"
          className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border hover:border-orange-500"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Search Patients
            </h2>
            <span className="text-orange-600 text-2xl">🔍</span>
          </div>

          <p className="text-gray-600 mt-3">
            Find and manage your patients easily
          </p>

          <p className="mt-5 text-orange-600 font-medium group-hover:underline">
            Search Now →
          </p>
        </Link>

      </div>

    </DashboardLayout>
  );
}

export default DoctorDashboard;
