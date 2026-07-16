import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const CategoryFilter = ({
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop - lg and above */}
      <div className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-4 flex-wrap justify-end">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setActiveCategory(item)}
            className={`px-4 xl:px-5 2xl:px-7 py-2 xl:py-2.5 2xl:py-3 rounded-full font-semibold transition-all duration-300 text-sm xl:text-base whitespace-nowrap ${
              activeCategory === item
                ? "border-2 border-[#FC8A06] text-[#FC8A06] bg-orange-50"
                : "text-[#03081F] hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Tablet & Mobile - lg and below */}
      <div ref={dropdownRef} className="relative lg:hidden w-full sm:w-auto">
        <button
          onClick={() => setOpen(!open)}
          className="w-full sm:w-auto min-w-[160px] md:min-w-[180px] flex items-center justify-between gap-3 border-2 border-[#FC8A06] rounded-full px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-white hover:bg-orange-50 transition-colors"
        >
          <span className="font-medium text-sm sm:text-base truncate">
            {activeCategory || "All Categories"}
          </span>
          <FaChevronDown
            className={`text-[#FC8A06] transition-transform duration-300 flex-shrink-0 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 sm:right-0 sm:left-auto mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 min-w-[180px] sm:min-w-[200px] md:min-w-[220px] max-h-[300px] overflow-y-auto">
            <ul className="py-1 sm:py-2">
              {categories.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setActiveCategory(item);
                    setOpen(false);
                  }}
                  className={`px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 cursor-pointer transition-colors text-sm sm:text-base ${
                    activeCategory === item
                      ? "bg-[#FC8A06] text-white font-semibold"
                      : "hover:bg-orange-50 text-gray-700"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryFilter;