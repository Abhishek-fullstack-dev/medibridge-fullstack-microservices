import { Link } from "react-router-dom";
import { getUserRole } from "../utils/auth";

function Sidebar() {
  const role = getUserRole();

  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-5">
      <h2 className="text-lg font-bold mb-6">Dashboard</h2>

      <ul className="space-y-4">

        {role === "DOCTOR" && (
          <>
            <li>
              <Link to="/doctor/dashboard" className="block p-2 rounded hover:bg-blue-100">
                Doctor Dashboard
              </Link>
            </li>

            <li>
              <Link to="/doctor/profile" className="block p-2 rounded hover:bg-blue-100">
                My Profile
              </Link>
            </li>

            <li>
              <Link to="/doctor/patients" className="block p-2 rounded hover:bg-blue-100">
                Patients
              </Link>
            </li>
          </>
        )}

        {role === "PATIENT" && (
          <>
            <li>
              <Link to="/patient/dashboard" className="block p-2 rounded hover:bg-blue-100">
                Patient Dashboard
              </Link>
            </li>

            <li>
              <Link to="/patient/profile" className="block p-2 rounded hover:bg-blue-100">
                My Profile
              </Link>
            </li>

            <li>
              <Link to="/patient/prescriptions" className="block p-2 rounded hover:bg-blue-100">
                My Prescriptions
              </Link>
            </li>
          </>
        )}

      </ul>
    </div>
  );
}

export default Sidebar;
