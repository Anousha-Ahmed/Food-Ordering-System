import React, { useState } from "react";
import SidebarImg from "../../assets/RestaurantDetailImg/SidebarImg.png";
import FirstOrderDiscount from '../../assets/RestaurantDetailImg/FirstOrderDiscount.png'

const menuItems = [
  "Pizzas",
  "Garlic Bread",
  "Calzone",
  "Kebabas",
  "Salads",
  "Cold drinks",
  "Happy Meal®",
  "Desserts",
  "Hot drinks",
  "Sauces",
  "Orbit®",
];

const Discount = [
    {
      id: 1,
      image: FirstOrderDiscount,
    },
  ];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
    <div>
    <div className="w-[280px] bg-white border border-[#D9D9D9] rounded-lg shadow-sm mx-[35px] ml-[4px]">

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-gray-300">

        <img
          src={SidebarImg}
          alt="Menu"
          className="w-8 h-8"
        />

        <h2 className="text-[30px] font-bold text-[#03081F] py-[18px]">
          Menu
        </h2>

      </div>

      {/* Menu Items */}
      <div>

        {menuItems.map((item, index) => (

          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-full text-left px-5 py-4 text-[17px] font-bold transition-all duration-200
            ${
              activeIndex === index
                ? "bg-[#03081F] text-white"
                : "bg-white text-[#03081F] hover:bg-gray-50"
            }`}
          >
            {item}
          </button>

        ))}

      </div>
    </div>


    <div className="w-[320px] mx-[3px] my-[35px]">
        <div>
            {Discount.map((item) => (
            <div key={item.id}>
                <img
                src={item.image}
                className="w-full h-[220] object-cover rounded-xl"
                />
            </div>
            ))}
        </div>
    </div>
</div>

</>

  );
};

export default Sidebar;