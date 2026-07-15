import { FaBars } from "react-icons/fa";
import AuthButtons from "../common/Button/AuthButtons";

const Topbar = ({ setSidebarOpen }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="bg-white shadow flex justify-between items-center px-4 md:px-8 py-4">
      <div className="flex items-center gap-4">
        <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
          <FaBars size={24} />
        </button>

        <h1 className="text-xl md:text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <h2 className="font-semibold">
              {user?.first_name} {user?.last_name}
            </h2>

            {/* <p className="text-gray-500 text-sm">
              {user?.email}
            </p> */}
          </div>
          <div className="p-5">
            <AuthButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
