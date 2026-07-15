import React from "react";
const Input = () => {
  return (
    <div className="flex items-center w-full h-[58px] bg-white rounded-full overflow-hidden">

      <input
        type="text"
        placeholder="e.g. EC4R 3TE"
        className="flex-1 h-full px-5 lg:px-6 text-[15px] outline-none"
      />

      <button
        className="h-full px-8 lg:w-[175px] bg-[#FC8A06] text-white font-semibold rounded-full text-[15px] transition-all duration-300"
      >
        Search
      </button>

    </div>
  );
};

export default Input;