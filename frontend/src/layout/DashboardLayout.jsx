import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow p-6 min-h-[80vh]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
