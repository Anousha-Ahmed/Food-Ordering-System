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
      <div className="w-[55%] p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-[18px] font-bold leading-6">{name}</h2>

          <p className="text-[13px] text-black mt-5 leading-6">{description}</p>
        </div>

        <h3 className="font-bold text-[22px]">GBP {price}</h3>
      </div>

      {/* Right */}
      <div className="relative w-[45%]">
        <img
          src={image}
          alt=""
          className="absolute right-4 top-4 w-[170px] h-[170px] rounded-xl object-cover"
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
          className="absolute bottom-0 right-0 w-[80px] h-[80px] bg-white/90 rounded-tl-[40px] flex items-center justify-center"
        >
          <img src={AddLogo} alt="" className="w-12" />
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
