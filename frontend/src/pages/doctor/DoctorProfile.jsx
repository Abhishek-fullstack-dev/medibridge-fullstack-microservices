import { useState } from "react";
import doctorApi from "../../api/doctorApi";
import DashboardLayout from "../../layout/DashboardLayout";

function DoctorProfile() {

  const [profile, setProfile] = useState({
    specialization: "",
    qualification: "",
    experience: "",
    hospitalName: "",
    consultationFee: "",
    availableFrom: "",
    availableTo: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await doctorApi.post("/profile", profile);
      setSuccess("Profile saved successfully");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to save profile");
    }
  };

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Doctor Profile
        </h1>
        <p className="text-gray-500">
          Complete your professional profile for patients
        </p>
      </div>

      {/* Alerts */}
      {success && (
        <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-6 max-w-3xl">
          {success}
        </p>
      )}

      {error && (
        <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 max-w-3xl">
          {error}
        </p>
      )}

      {/* Form Card */}
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-4xl border">

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Specialization */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Specialization
            </label>
            <input
              className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="e.g. Cardiologist"
              value={profile.specialization}
              onChange={(e) =>
                setProfile({ ...profile, specialization: e.target.value })
              }
              required
            />
          </div>

          {/* Qualification */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Qualification
            </label>
            <input
              className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="e.g. MBBS, MD"
              value={profile.qualification}
              onChange={(e) =>
                setProfile({ ...profile, qualification: e.target.value })
              }
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Experience (Years)
            </label>
            <input
              type="number"
              className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="e.g. 5"
              value={profile.experience}
              onChange={(e) =>
                setProfile({ ...profile, experience: e.target.value })
              }
              required
            />
          </div>

          {/* Hospital */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Hospital Name
            </label>
            <input
              className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Hospital or Clinic name"
              value={profile.hospitalName}
              onChange={(e) =>
                setProfile({ ...profile, hospitalName: e.target.value })
              }
              required
            />
          </div>

          {/* Fee */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Consultation Fee (₹)
            </label>
            <input
              type="number"
              className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="e.g. 500"
              value={profile.consultationFee}
              onChange={(e) =>
                setProfile({ ...profile, consultationFee: e.target.value })
              }
              required
            />
          </div>

          {/* Available From */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Available From
            </label>
            <input
              type="time"
              className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={profile.availableFrom}
              onChange={(e) =>
                setProfile({ ...profile, availableFrom: e.target.value })
              }
              required
            />
          </div>

          {/* Available To */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Available To
            </label>
            <input
              type="time"
              className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={profile.availableTo}
              onChange={(e) =>
                setProfile({ ...profile, availableTo: e.target.value })
              }
              required
            />
          </div>

          {/* Save Button */}
          <div className="col-span-1 md:col-span-2 flex justify-end mt-6">
            <button
              className="bg-linear-to-r from-blue-500 to-cyan-500 text-white 
                         px-10 py-3 rounded-xl font-semibold shadow-md
                         hover:opacity-90 hover:scale-[1.02] transition-all"
            >
              Save Profile
            </button>
          </div>

        </form>
      </div>

    </DashboardLayout>
  );
}

export default DoctorProfile;
