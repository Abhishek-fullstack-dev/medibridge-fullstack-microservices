import { Link } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

function PatientDashboard() {
  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Patient Dashboard
        </h1>
        <p className="text-gray-500">
          Manage your health, appointments and prescriptions
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Profile */}
        <Link
          to="/patient/profile"
          className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl
                     border transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-blue-600 text-3xl mb-4">👤</div>
          <h2 className="text-xl font-semibold text-gray-800">
            My Profile
          </h2>
          <p className="text-gray-600 mt-2">
            Complete your patient profile
          </p>
        </Link>


        {/* Find Doctor */}
        <Link
          to="/doctors"
          className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl
                     border transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-green-600 text-3xl mb-4">🩺</div>
          <h2 className="text-xl font-semibold text-gray-800">
            Find Doctor
          </h2>
          <p className="text-gray-600 mt-2">
            Search and book appointments
          </p>
        </Link>

        {/* Appointments */}
        <Link
          to="/appointments"
          className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl
                     border transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-purple-600 text-3xl mb-4">📅</div>
          <h2 className="text-xl font-semibold text-gray-800">
            My Appointments
          </h2>
          <p className="text-gray-600 mt-2">
            View appointment history
          </p>
        </Link>
        <Link to="/patient/book-appointment"
  className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
  <h2 className="text-xl font-semibold">Book Appointment</h2>
  <p className="text-gray-600 mt-2">Schedule your doctor visit</p>
</Link>


      </div>

    </DashboardLayout>
  );
}

export default PatientDashboard;
