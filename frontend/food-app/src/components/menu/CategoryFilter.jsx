import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const CategoryFilter = () => {
  const [active, setActive] = useState("Burgers");
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const categories = [
    "Burgers",
    "Pizza",
    "Fries",
    "Drinks",
    "Desserts"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex items-center gap-8">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`px-7 py-3 rounded-full text-[15px] font-semibold transition-all duration-300 mt-10 ${
              active === item
                ? "border-2 border-[#FC8A06] text-[#FC8A06]"
                : "text-[#03081F] hover:text-[#FC8A06]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Mobile & Tablet */}
      <div
        ref={dropdownRef}
        className="relative lg:hidden z-[999]"
      >
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm"
        >
          <span className="text-sm font-medium">
            {active}
          </span>

          <FaChevronDown
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-[9999]">

            {categories.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActive(item);
                  setOpen(false);
                }}
                className={`block w-full text-left px-5 py-3 transition hover:bg-orange-50 ${
                  active === item
                    ? "text-[#FC8A06] font-semibold"
                    : "text-[#03081F]"
                }`}
              >
                {item}
              </button>
            ))}

          </div>
        )}
      </div>
    </>
  );
};

export default CategoryFilter;