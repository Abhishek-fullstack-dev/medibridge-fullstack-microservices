import { useEffect, useState } from "react";
import api from "../api/authApi";
import DashboardLayout from "../layout/DashboardLayout";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data.data || res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch doctors", error);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-sky-700">Find Doctors</h1>
        <p className="text-gray-500 mt-1">
          Search and book appointments with trusted specialists
        </p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading doctors...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white p-7 rounded-2xl shadow-md border border-sky-100
                         hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* Doctor Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-sky-400 to-cyan-500
                                flex items-center justify-center text-white text-xl font-bold">
                  {doctor.name?.charAt(0)}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Dr. {doctor.name}
                  </h2>
                  <p className="text-sm text-sky-600 font-medium">
                    {doctor.specialization}
                  </p>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Email:</span> {doctor.email}</p>
                <p><span className="font-medium">Phone:</span> {doctor.phone}</p>
              </div>

              {/* Action */}
              <button
  className="mt-6 w-full bg-linear-to-r from-sky-500 to-cyan-500 
             text-white py-2.5 rounded-xl font-semibold
             shadow-md hover:opacity-90 hover:scale-[1.02]
             transition-all duration-300"
>
  Book Appointment
</button>

            </div>
          ))}

        </div>
      )}
    </DashboardLayout>
  );
}

export default Doctors;
