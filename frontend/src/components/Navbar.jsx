import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const role = getUserRole();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      
      {/* App Name */}
      <h1 className="text-xl font-bold tracking-wide">
        MediBridge
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <span className="font-medium">
          {role === "DOCTOR" ? "Doctor Panel" : "Patient Panel"}
        </span>

        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-1.5 rounded-lg font-semibold
                     hover:bg-blue-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
