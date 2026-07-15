import {
  FaHome,
  FaShoppingCart,
  FaUtensils,
  FaStore,
  FaTags,
  FaList,
  FaTimes,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menus = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      title: "Orders",
      path: "/admin/orders",
      icon: <FaShoppingCart />,
    },
    {
      title: "Restaurants",
      path: "/admin/restaurants",
      icon: <FaStore />,
    },
    {
      title: "Menu",
      path: "/admin/menu",
      icon: <FaUtensils />,
    },
    {
      title: "Deals",
      path: "/admin/deals",
      icon: <FaTags />,
    },
    {
      title: "Categories",
      path: "/admin/categories",
      icon: <FaList />,
    },
  ];

  return (
    <>
      {/* Overlay */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <div
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-72 bg-[#FC8A06] text-white shadow-lg transform transition-transform duration-300

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-6 border-b border-orange-300">

          <h1 className="text-2xl font-bold">
            Food Admin
          </h1>

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes size={22} />
          </button>

        </div>

        <div className="mt-5">

          {menus.map((menu) => (
            <NavLink
              key={menu.title}
              to={menu.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-8 py-4

                ${
                  isActive
                    ? "bg-white text-[#FC8A06] font-bold"
                    : "hover:bg-orange-500"
                }`
              }
            >
              {menu.icon}

              {menu.title}
            </NavLink>
          ))}

        </div>
      </div>
    </>
  );
};

export default Sidebar;