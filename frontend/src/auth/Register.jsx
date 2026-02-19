import { useState } from "react";
import api from "../api/authApi";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
        role,
      });

      if (res.data.success) {
        setSuccess("Registration successful! Please login.");
        setError("");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Branding Section */}
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-blue-700 via-sky-500 to-cyan-400 
                relative items-center justify-center text-white">

        <div className="absolute bottom-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-32"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,29,158,17.39,
              70.36-15.34,136.33-58.08,207-65.73,
              65.57-7.08,136.1,19.92,196,34.66,
              63.73,15.64,127.6,14.9,190-5.38,
              60.12-19.59,113.23-53.05,174-60.32,
              59.73-7.15,117.51,18.51,173,41.7V0Z"
              fill="#ffffff"
              opacity=".25"
            ></path>
          </svg>
        </div>

        <div className="z-10 text-center px-10">
          <h1 className="text-5xl font-bold tracking-wide mb-4">MediBridge</h1>
          <p className="text-lg opacity-90">
            Your Digital Healthcare Companion
          </p>
          <p className="mt-4 text-sm opacity-80">
            Book doctors • Manage profiles • Secure prescriptions
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-8">

        <div className="max-w-md w-full animate-fadeIn">

          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 mb-6">
            Join MediBridge to access healthcare services
          </p>

          {error && (
            <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
              {error}
            </p>
          )}

          {success && (
            <p className="bg-green-100 text-green-600 p-2 rounded mb-4 text-sm">
              {success}
            </p>
          )}

          <form onSubmit={handleRegister} className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <select
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="PATIENT">Patient</option>
              <option value="DOCTOR">Doctor</option>
            </select>

            <button
              type="submit"
               className="w-full bg-linear-to-r from-blue-600 to-sky-500 text-white py-3 rounded-xl">

            
              Register
            </button>

          </form>

          <p className="mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/" className="text-blue-600 font-semibold hover:underline">
              Login
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;
