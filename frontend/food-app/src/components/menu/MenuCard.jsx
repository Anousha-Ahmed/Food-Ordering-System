import React from "react";
import AddLogo from "../../assets/RestaurantDetailImg/AddLogo.png";
import { useNavigate } from "react-router-dom";

const MenuCard = ({
  id,
  type,
  description,
  image,
  name,
  price,
  onAddToCart,
}) => {
  const navigate = useNavigate();

  // Discount Card
  if (type === "discount") {
    return (
      <div className="rounded-2xl overflow-hidden group cursor-pointer">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover duration-300 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className="relative bg-white rounded-2xl border border-gray-100 shadow-[0_8px_35px_rgba(0,0,0,0.12)] flex h-[220px] overflow-hidden"
      // onClick={()=>navigate(`/menuitem/${id}`)}
    >
      {/* Left */}
      <div className="w-[55%] p-4 sm:p-5 md:p-6 flex flex-col justify-between overflow-hidden">
        <div className="flex-1 min-h-0">
          {/* ✅ Name Truncate - 1 line */}
          <h2 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold leading-6 truncate">
            {name}
          </h2>

          {/* ✅ Description Truncate - 2 lines max */}
          <p className="text-[12px] sm:text-[13px] text-black mt-2 md:mt-3 leading-5 line-clamp-2">
            {description}
          </p>
        </div>

        {/* ✅ Price - Fixed at bottom */}
        <h3 className="font-bold text-[18px] sm:text-[20px] md:text-[22px] mt-2 flex-shrink-0">
          GBP {price}
        </h3>
      </div>

      {/* Right */}
      <div className="relative w-[45%]">
        <img
          src={image}
          alt={name}
          className="absolute right-2 sm:right-3 md:right-4 top-3 sm:top-4 w-[130px] sm:w-[150px] md:w-[170px] h-[130px] sm:h-[150px] md:h-[170px] rounded-xl object-cover"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            try {
              onAddToCart();
            } catch (err) {
              console.error(err);
            }
          }}
          className="absolute bottom-0 right-0 w-[65px] sm:w-[70px] md:w-[80px] h-[65px] sm:h-[70px] md:h-[80px] bg-white/90 rounded-tl-[35px] sm:rounded-tl-[40px] flex items-center justify-center"
        >
          <img
            src={AddLogo}
            alt="Add to cart"
            className="w-9 sm:w-10 md:w-12"
          />
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
