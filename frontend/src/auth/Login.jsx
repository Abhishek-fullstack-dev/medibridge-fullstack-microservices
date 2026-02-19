import { useState } from "react";
import authApi from "../api/authApi";
import { Link } from "react-router-dom";
import { getUserRole } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await authApi.post("/login", { email, password });

      if (res.data.success) {
        localStorage.setItem("token", res.data.data);

        const role = getUserRole();

        if (role === "DOCTOR") {
          window.location.href = "/doctor/dashboard";
        } else {
          window.location.href = "/patient/dashboard";
        }
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Invalid email or password");
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
            Smart Healthcare. Anytime. Anywhere.
          </p>
          <p className="mt-4 text-sm opacity-80">
            Doctors • Patients • Prescriptions • Payments
          </p>
        </div>
      </div>

      {/* Right Login Form Section */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-8">

        <div className="max-w-md w-full animate-fadeIn">

          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-6">
            Login to your MediBridge account
          </p>

          {error && (
            <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className="w-full bg-linear-to-r from-blue-600 to-sky-500 text-white py-3 rounded-xl">
              Login
            </button>

          </form>

          <p className="mt-6 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
