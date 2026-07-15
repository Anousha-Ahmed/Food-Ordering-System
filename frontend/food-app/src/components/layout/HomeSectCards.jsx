import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSectCards = ({ id,type, image, title, restaurants }) => {
  const navigate = useNavigate();

  if (type === "category")
    return (
      <div 
      className="rounded-xl overflow-hidden"
      onClick={()=>navigate(`/restaurants/category/${id}`)}
      >

        <div className="h-[170px] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-[#03081F] px-3 py-3">
          <h3 className="text-[#FC8A06] font-bold text-sm">
            {title}
          </h3>

          <p className="text-white text-xs">
            {restaurants} Restaurants
          </p>
        </div>

      </div>
    );

  if (type === "partner") {
    return (
      <div className="relative rounded-2xl overflow-hidden h-[260px] sm:h-[300px] lg:h-[330px] group">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
};

export default HomeSectCards;