import { useEffect, useState } from "react";
import patientApi from "../../api/patientApi";
import DashboardLayout from "../../layout/DashboardLayout";

function PatientProfile() {

  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    medicalHistory: "",
    allergies: "",
    chronicDiseases: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch existing profile
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await patientApi.get("/profile");
      if (res.data) {
        setProfile(res.data);
      }
    } catch {
      console.log("No profile found. Create new.");
    }
  };

  // Save profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await patientApi.post("/profile", profile);
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
          Patient Profile
        </h1>
        <p className="text-gray-500">
          Keep your health information up to date
        </p>
      </div>

      {success && (
        <p className="bg-green-100 text-green-700 px-4 py-2 rounded-lg mb-6">
          {success}
        </p>
      )}

      {error && (
        <p className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-6">
          {error}
        </p>
      )}

      {/* Form Card */}
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-4xl">

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Full Name
            </label>
            <input
              className="border border-gray-300 p-3 w-full rounded-xl
                         focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Age
            </label>
            <input
              type="number"
              className="border border-gray-300 p-3 w-full rounded-xl
                         focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Gender
            </label>
            <select
              className="border border-gray-300 p-3 w-full rounded-xl
                         focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              required
            >
              <option value="">Select</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Phone Number
            </label>
            <input
              className="border border-gray-300 p-3 w-full rounded-xl
                         focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              required
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Address
            </label>
            <input
              className="border border-gray-300 p-3 w-full rounded-xl
                         focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              required
            />
          </div>

          {/* Medical History */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Medical History
            </label>
            <textarea
              rows="3"
              className="border border-gray-300 p-3 w-full rounded-xl
                         focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={profile.medicalHistory}
              onChange={(e) =>
                setProfile({ ...profile, medicalHistory: e.target.value })
              }
            />
          </div>

          {/* Allergies */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Allergies
            </label>
            <input
              className="border border-gray-300 p-3 w-full rounded-xl
                         focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={profile.allergies}
              onChange={(e) =>
                setProfile({ ...profile, allergies: e.target.value })
              }
            />
          </div>

          {/* Chronic Diseases */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Chronic Diseases
            </label>
            <input
              className="border border-gray-300 p-3 w-full rounded-xl
                         focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={profile.chronicDiseases}
              onChange={(e) =>
                setProfile({ ...profile, chronicDiseases: e.target.value })
              }
            />
          </div>

          {/* Button */}
          <div className="md:col-span-2">
            <button
  className="bg-linear-to-r from-blue-600 to-cyan-500
             text-white px-10 py-3 rounded-xl font-semibold
             shadow-lg hover:opacity-90 hover:scale-[1.02]
             transition-all duration-300"
>
  Save Profile
</button>

          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}

export default PatientProfile;
