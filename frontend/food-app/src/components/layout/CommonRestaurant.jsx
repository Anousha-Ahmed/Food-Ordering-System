import React, { useEffect, useState } from "react";
import { API } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

const CommonRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API.ALL_RESTAURANT)
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-8 lg:px-0 py-8 mt-[20px]">
      <h2 className="text-[32px] font-bold mb-8">All Restaurants</h2>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-5">
        {restaurants.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/restaurants/${item.id}`)}
            className="rounded-xl overflow-hidden shadow cursor-pointer hover:scale-105 duration-300"
          >
            <img
              src={
                item.image
                  ? `${BASE_URL}${item.image}`
                  : "https://placehold.co/300x200"
              }
              alt={item.name}
              className="w-full h-[150px] object-cover"
            />

            <div className="bg-[#FC8A06] py-3">
              <h3 className="text-center text-white font-semibold">
                {item.name}
              </h3>
              <h3 className="text-center text-white font-semibold">
                {item.address}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommonRestaurant;
