import { useEffect, useState } from "react";
import api from "../api/authApi";
import DashboardLayout from "../layout/DashboardLayout";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");  // backend endpoint
      setAppointments(res.data.data || res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch doctors", error);
    }
  };

  const bookAppointment = async (e) => {
    e.preventDefault();

    try {
      await api.post("/appointments", {
        doctorId,
        appointmentDate: date,
      });

      setDoctorId("");
      setDate("");
      fetchAppointments();
      alert("Appointment booked successfully");
    } catch (error) {
      console.error("Failed to book appointment", error);
      alert("Booking failed");
    }
  };
  return (
  <DashboardLayout>
    <h1 className="text-3xl font-bold mb-8 text-sky-700">Appointments</h1>

    {/* Booking Form */}
    <div className="bg-white p-8 rounded-2xl shadow-lg mb-10 border border-sky-100">
      <h2 className="text-xl font-semibold mb-6 text-sky-600">
        Book New Appointment
      </h2>

      <form onSubmit={bookAppointment} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <select
          className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-sky-400"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name} ({doc.specialization})
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-sky-400"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-linear-to-r from-sky-500 to-cyan-500
                     text-white font-semibold rounded-xl
                     shadow-md hover:shadow-xl hover:scale-[1.02]
                     transition-all duration-300"
        >
          Book Appointment
        </button>
      </form>
    </div>

    {/* Appointment Cards */}
    {loading ? (
      <p className="text-gray-600">Loading appointments...</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white p-6 rounded-2xl shadow-md border border-sky-100
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-sky-700">
                Dr. {appt.doctorName}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold
                ${appt.status === "CONFIRMED"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {appt.status}
              </span>
            </div>

            <p className="text-gray-600 mb-2">
              <span className="font-medium">Specialization:</span> {appt.specialization}
            </p>

            <p className="text-gray-600">
              <span className="font-medium">Date:</span> {appt.appointmentDate}
            </p>
          </div>
        ))}
      </div>
    )}
  </DashboardLayout>
);
}

  export default Appointments;
