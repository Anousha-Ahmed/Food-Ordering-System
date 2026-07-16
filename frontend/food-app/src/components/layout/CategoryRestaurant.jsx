import React, { useEffect, useState } from "react";
import { API, BASE_URL } from "../../api/endpoints";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../../components/layout/Topbar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const CategoryRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(API.CATEGORY_DETAIL(id))
      .then((res) => res.json())
      .then((data) => {
        console.log("Category API", data);
        setRestaurants(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <TopBar />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-500">
            Loading Restaurants...
          </h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopBar />
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
          Restaurants
        </h2>

        {restaurants.length === 0 ? (
          <div className="flex justify-center items-center h-40 sm:h-52">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-500">
              No Restaurants Found
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {restaurants.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/restaurants/${item.id}`)}
                className="rounded-xl overflow-hidden shadow hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <img
                  src={`${BASE_URL}${item.image}`}
                  className="w-full h-40 sm:h-44 md:h-48 object-cover hover:scale-105 transition-transform duration-300"
                  alt={item.name}
                />

                <div className="bg-[#FC8A06] py-2 sm:py-2.5 md:py-3">
                  <h3 className="text-center text-white font-semibold text-sm sm:text-base">
                    {item.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default CategoryRestaurant;