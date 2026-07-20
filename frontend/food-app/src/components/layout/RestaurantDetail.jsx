import React, { useEffect, useState } from "react";
import TopBar from "./Topbar";
import Navbar from "./Navbar";
import { FaClock } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import Burger from "../../assets/RestaurantDetailImg/Burger.png";
import Girl from "../../assets/RestaurantDetailImg/Girl.png";
import Review from "../../assets/RestaurantDetailImg/Review.png";
import MenuList from "../menu/MenuList";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantLocation from "./RestaurantLocation";
import CustomerReviews from "./CustomerReviews";
import CommonRestaurant from "./CommonRestaurant";
import Footer from "./Footer";
import { API, BASE_URL } from "../../api/endpoints";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/common/Loader"; 

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({
    restaurants: [],
    categories: [],
    menu_items: [],
  });

  useEffect(() => {
    fetch(API.RESTAURANT_DETAIL(id))
      .then((res) => res.json())
      .then((data) => {
        setRestaurant(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  // ✅ Loader
  if (loading || !restaurant) {
    return <Loader />;
  }

  const handleSearch = async (value) => {
    setSearch(value);
    if (!value.trim()) {
      setResults({ restaurants: [], categories: [], menu_items: [] });
      return;
    }
    try {
      const response = await fetch(
        `${API.SEARCH}?q=${encodeURIComponent(value)}`
      );
      const data = await response.json();
      if (response.ok) {
        setResults({
          restaurants: data.data?.restaurants || [],
          categories: data.data?.categories || [],
          menu_items: data.data?.menu_items || [],
        });
      } else {
        setResults({ restaurants: [], categories: [], menu_items: [] });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TopBar />
      <Navbar />
      <section>
        <div className="relative bg-[#03081F] rounded-xl mx-4 sm:mx-6 lg:mx-8 max-w-7xl lg:mx-auto mt-6 sm:mt-8 md:mt-10 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[430px] overflow-hidden">
          <img
            src={Burger}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 z-10 px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 flex flex-col justify-center">
            <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2 md:mb-3 max-w-[90%] sm:max-w-[80%] md:max-w-[70%]">
              {restaurant.description}
            </p>
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold mb-2 sm:mb-4 md:mb-6 lg:mb-8">
              {restaurant.name}
            </h1>
            <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-3">
              {restaurant.address}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-5">
              <div className="border border-white/80 rounded-full px-3 sm:px-5 md:px-8 lg:px-14 py-1 sm:py-2 md:py-2.5 lg:py-3 flex items-center gap-1.5 sm:gap-2 md:gap-3 text-white text-[10px] sm:text-xs md:text-sm lg:text-base backdrop-blur-sm bg-white/10">
                <BiFoodMenu
                  size={14}
                  className="sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] lg:w-[22px] lg:h-[22px]"
                />
                <span className="whitespace-nowrap">Minimum Order: 12 GBP</span>
              </div>
              <div className="border border-white/80 rounded-full px-3 sm:px-5 md:px-8 lg:px-14 py-1 sm:py-2 md:py-2.5 lg:py-3 flex items-center gap-1.5 sm:gap-2 md:gap-3 text-white text-[10px] sm:text-xs md:text-sm lg:text-base backdrop-blur-sm bg-white/10">
                <MdDeliveryDining
                  size={14}
                  className="sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] lg:w-[22px] lg:h-[22px]"
                />
                <span className="whitespace-nowrap">
                  Delivery in 20-25 Minutes
                </span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 bg-[#FC8A06] text-white px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 md:py-3.5 lg:py-4 rounded-tr-xl z-10">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <FaClock className="text-sm sm:text-base md:text-lg" />
              <span className="text-xs sm:text-sm md:text-base font-medium">
                Open until 3:00 AM
              </span>
            </div>
          </div>
          <div className="hidden md:block absolute right-4 lg:right-8 top-8 lg:top-16 z-10">
            <img
              src={Girl}
              alt=""
              className="w-[180px] sm:w-[250px] md:w-[320px] lg:w-[420px] h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] object-cover rounded-lg"
            />
          </div>
          <div className="hidden lg:block absolute right-[280px] md:right-[200px] lg:right-[380px] bottom-8 md:bottom-10 lg:bottom-12 bg-white rounded-xl p-1 shadow-xl z-10">
            <img
              src={Review}
              alt=""
              className="h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px]"
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-[70px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center sm:text-left">
              All Offers from {restaurant.name}
            </h2>
            <div className="relative w-full sm:w-[280px] md:w-[300px] lg:w-[330px]">
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="🔍 Search Restaurant, Category or Menu..."
                className="border border-gray-400 rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 w-full outline-none text-sm sm:text-base"
              />
              {search &&
                results.restaurants.length === 0 &&
                results.categories.length === 0 &&
                results.menu_items.length === 0 && (
                  <div className="absolute top-12 sm:top-14 left-0 w-full bg-white shadow-lg rounded-xl p-4 text-center text-gray-500 z-50 text-sm">
                    No Results Found
                  </div>
                )}
              {(results.restaurants.length > 0 ||
                results.categories.length > 0 ||
                results.menu_items.length > 0) && (
                <div className="absolute top-12 sm:top-14 left-0 w-full bg-white rounded-xl shadow-xl border z-50 max-h-96 overflow-y-auto">
                  {results.restaurants.length > 0 && (
                    <>
                      <div className="bg-orange-100 px-4 py-2 font-bold text-[#FC8A06] text-sm">
                        Restaurants
                      </div>
                      {results.restaurants.map((restaurant) => (
                        <div
                          key={restaurant.id}
                          onClick={() => {
                            navigate(`/restaurants/${restaurant.id}`);
                            setSearch("");
                            setResults({
                              restaurants: [],
                              categories: [],
                              menu_items: [],
                            });
                          }}
                          className="flex items-center gap-3 p-3 border-b hover:bg-gray-100 cursor-pointer"
                        >
                          <img
                            src={`${BASE_URL}${restaurant.image}`}
                            alt={restaurant.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-sm sm:text-base">
                              {restaurant.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500">
                              {restaurant.menu_items?.length || 0} Menu Items
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {results.categories.length > 0 && (
                    <>
                      <div className="bg-orange-100 px-4 py-2 font-bold text-[#FC8A06] text-sm">
                        Categories
                      </div>
                      {results.categories.map((category) => (
                        <div
                          key={category.id}
                          onClick={() => {
                            navigate(`/restaurants/category/${category.id}`);
                            setSearch("");
                            setResults({
                              restaurants: [],
                              categories: [],
                              menu_items: [],
                            });
                          }}
                          className="p-3 border-b hover:bg-gray-100 cursor-pointer"
                        >
                          <h3 className="font-semibold text-sm sm:text-base">
                            📂 {category.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {category.restaurants?.length || 0} Restaurants
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                  {results.menu_items.length > 0 && (
                    <>
                      <div className="bg-orange-100 px-4 py-2 font-bold text-[#FC8A06] text-sm">
                        Menu Items
                      </div>
                      {results.menu_items.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            navigate(`/restaurants/${item.restaurant.id}`);
                            setSearch("");
                            setResults({
                              restaurants: [],
                              categories: [],
                              menu_items: [],
                            });
                          }}
                          className="flex gap-3 p-3 border-b hover:bg-gray-100 cursor-pointer"
                        >
                          <img
                            src={`${BASE_URL}${item.image}`}
                            alt={item.name}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm sm:text-base truncate">
                              {item.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                              Restaurant : {item.restaurant.name}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                              Category : {item.category?.name}
                            </p>
                            <p className="font-bold text-[#FC8A06] text-sm sm:text-base">
                              £ {item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <MenuList menuItems={restaurant.menu_items} />
        <RestaurantInfo />
        <RestaurantLocation />
        <CustomerReviews />
        <CommonRestaurant />
        <Footer />
      </section>
    </>
  );
};

export default RestaurantDetail;
