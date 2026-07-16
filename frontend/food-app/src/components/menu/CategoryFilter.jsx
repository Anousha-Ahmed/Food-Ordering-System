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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex items-center gap-8">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setActiveCategory(item)}
            className={`px-7 py-3 rounded-full font-semibold transition ${
              activeCategory === item
                ? "border-2 border-[#FC8A06] text-[#FC8A06]"
                : "text-[#03081F]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Mobile */}
      <div ref={dropdownRef} className="relative lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 border rounded-full px-4 py-2 bg-white"
        >
          <span>{activeCategory}</span>
          <FaChevronDown
            className={`${open ? "rotate-180" : ""} transition`}
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg w-52">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveCategory(item);
                  setOpen(false);
                }}
                className={`block w-full text-left px-5 py-3 hover:bg-orange-50 ${
                  activeCategory === item
                    ? "text-[#FC8A06] font-semibold"
                    : ""
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