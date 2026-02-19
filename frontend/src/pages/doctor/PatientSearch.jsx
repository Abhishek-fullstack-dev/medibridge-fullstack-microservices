import { useState } from "react";
import api from "../../api/authApi";
import DashboardLayout from "../../layout/DashboardLayout";

function PatientSearch() {
  const [keyword, setKeyword] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchPatients = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.get(`/patients/search?keyword=${keyword}`);
      setPatients(res.data.data || []);
    } catch (error) {
      console.error("Search failed", error);
      alert("Failed to search patients");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Patient Search</h1>

      {/* Search Box */}
      <form onSubmit={searchPatients} className="flex gap-4 mb-8">
        <input
          type="text"
          className="border p-2 rounded-lg w-80"
          placeholder="Search by name, email or phone"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700">
          Search
        </button>
      </form>

      {/* Results */}
      {loading ? (
        <p>Searching patients...</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold">{patient.name}</h2>
              <p className="text-gray-600">Email: {patient.email}</p>
              <p className="text-gray-600">Phone: {patient.phone}</p>

              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg">
                View Records
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default PatientSearch;
