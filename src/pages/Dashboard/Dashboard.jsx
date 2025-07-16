import Sidebar from "../../components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-zinc-700 text-white">
      <Sidebar />
      <div className="flex-1 bg-zinc-900">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
