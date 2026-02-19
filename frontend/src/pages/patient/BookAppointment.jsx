import { useEffect, useState } from "react";
import doctorApi from "../../api/doctorApi";
import appointmentApi from "../../api/appointmentApi";
import DashboardLayout from "../../layout/DashboardLayout";
import { getUserId } from "../../utils/auth";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const patientId = getUserId();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await doctorApi.get("/all");
    setDoctors(res.data);
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      await appointmentApi.post("/book", {
        patientId,
        doctorId,
        appointmentDate: date,
        appointmentTime: time,
      });

      setSuccess("Appointment booked successfully");
      setError("");
      setDoctorId("");
      setDate("");
      setTime("");

    } catch (err) {
      setError("Failed to book appointment");
      setSuccess("");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Book Appointment</h1>

      {success && <p className="text-green-600 mb-4">{success}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="bg-white p-8 rounded-xl shadow max-w-xl">
        <form onSubmit={handleBooking} className="grid grid-cols-1 gap-6">

          <select
            className="border p-3 rounded-lg"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                Dr. {doc.name} ({doc.specialization})
              </option>
            ))}
          </select>

          <input
            type="date"
            className="border p-3 rounded-lg"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <input
            type="time"
            className="border p-3 rounded-lg"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Book Appointment
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default BookAppointment;
