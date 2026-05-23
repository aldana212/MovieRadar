import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#0A0C0E] text-white">
      <Navbar />
      <Sidebar />
      <main
        className="
          sm:ml-72 
          max-w-7xl mx-auto p-6"
      >
        <Outlet />

      </main>
    </div>
  );
};

export default MainLayout;
