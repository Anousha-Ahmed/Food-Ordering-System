import React, { useEffect, useState } from "react";
import { API, BASE_URL } from "../../api/endpoints";
import { useNavigate, useParams } from "react-router-dom";

const CategoryRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch(API.CATEGORY_DETAIL(id))
      .then((res) => res.json())
      .then((data) => {
        console.log("Category API",data);
        setRestaurants(data.data || []);
      })
      .catch(console.log);
  }, [id]);

  return (
    <section className="max-w-7xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-8">Restaurants</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {restaurants.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/restaurants/${item.id}`)}
            className="rounded-xl overflow-hidden shadow cursor-pointer"
          >
            <img
              src={`${BASE_URL}${item.image}`}
              className="w-full h-48 object-cover"
              alt={item.name}
            />

            <div className="bg-[#FC8A06] py-3">
              <h3 className="text-center text-white font-semibold">
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryRestaurant;
