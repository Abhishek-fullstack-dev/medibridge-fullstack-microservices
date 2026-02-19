import { useEffect, useState } from "react";
import patientApi from "../../api/patientApi";
import DashboardLayout from "../../layout/DashboardLayout";

function PatientPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const res = await patientApi.get("/prescriptions");
      setPrescriptions(res.data);
    } catch (err) {
      console.error("Failed to fetch prescriptions", err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">My Prescriptions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prescriptions.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-xl shadow">
            <p className="font-semibold">Doctor: {p.doctorName}</p>
            <p className="text-gray-500">Date: {p.date}</p>

            <a
              href={p.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              View Prescription
            </a>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default PatientPrescriptions;
