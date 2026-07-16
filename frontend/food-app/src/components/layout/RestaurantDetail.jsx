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

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
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
        console.log(data);
        setRestaurant(data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  if (!restaurant) {
    return <h1>Loading...</h1>;
  }

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      setResults({
        restaurants: [],
        categories: [],
        menu_items: [],
      });
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
        setResults({
          restaurants: [],
          categories: [],
          menu_items: [],
        });
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
        {/* Hero */}

        <div className="bg-[#03081F] rounded-xl h-[430px] relative max-w-7xl mx-auto mt-10">
          {/* Background Burger */}
          <img
            src={Burger}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />

          {/* <div className="absolute bg-black/35"></div> */}

          <div className="absolute left-10 top-24 text-white z-10">
            <p className="text-lg mb-3">{restaurant.description}</p>

            <h1 className="text-6xl font-semibold mb-8">{restaurant.name}</h1>
            <p className="text-lg mb-3">{restaurant.address}</p>

            <div className="flex gap-5">
              <div className="border border-white rounded-full px-14 py-3 flex items-center gap-3">
                <BiFoodMenu size={22} />
                <span>Minimum Order: 12 GBP</span>
              </div>

              <div className="border border-white rounded-full px-14 py-3 flex items-center gap-3">
                <MdDeliveryDining size={22} />
                <span>Delivery in 20-25 Minutes</span>
              </div>
            </div>
          </div>

          {/* Orange Button */}

          <div className="absolute top-[400px] left-0 bg-[#FC8A06] text-white px-12 py-4 rounded-tr-xl">
            <div className="flex items-center gap-2">
              <FaClock />
              <span>Open until 3:00 AM</span>
            </div>
          </div>

          {/* Food Image */}

          <div className="absolute right-8 top-16">
            <img
              src={Girl}
              className="w-[420px] h-[300px] object-cover rounded-lg"
            />
          </div>

          {/* Rating Card */}

          <div className="absolute right-[380px] bottom-12 bg-white rounded-xl p-1 shadow-xl">
            <img src={Review} className="h-[120px]" />
          </div>
        </div>

        {/* Bottom */}

        <div className="flex justify-between items-center  max-w-7xl mx-auto mt-[70px]">
          <h2 className="text-4xl font-bold">
            All Offers from {restaurant.name}
          </h2>

          <div className="relative w-[330px]">
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="🔍 Search Restaurant, Category or Menu..."
              className="border border-gray-400 rounded-full px-6 py-3 w-full outline-none"
            />
            {search &&
              results.restaurants.length === 0 &&
              results.categories.length === 0 &&
              results.menu_items.length === 0 && (
                <div className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-xl p-4 text-center text-gray-500 z-50">
                  No Results Found
                </div>
              )}

            {(results.restaurants.length > 0 ||
              results.categories.length > 0 ||
              results.menu_items.length > 0) && (
              <div className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-xl border z-50 max-h-96 overflow-y-auto">
                {/* Restaurants */}

                {results.restaurants.length > 0 && (
                  <>
                    <div className="bg-orange-100 px-4 py-2 font-bold text-[#FC8A06]">
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
                          className="w-12 h-12 rounded-lg object-cover"
                        />

                        <div>
                          <h3 className="font-semibold">{restaurant.name}</h3>

                          <p className="text-sm text-gray-500">
                            {restaurant.menu_items?.length || 0} Menu Items
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Categories */}

                {results.categories.length > 0 && (
                  <>
                    <div className="bg-orange-100 px-4 py-2 font-bold text-[#FC8A06]">
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
                        <h3 className="font-semibold">📂 {category.name}</h3>

                        <p className="text-sm text-gray-500">
                          {category.restaurants?.length || 0} Restaurants
                        </p>
                      </div>
                    ))}
                  </>
                )}

                {/* Menu */}

                {results.menu_items.length > 0 && (
                  <>
                    <div className="bg-orange-100 px-4 py-2 font-bold text-[#FC8A06]">
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
                          className="w-14 h-14 rounded-lg object-cover"
                        />

                        <div>
                          <h3 className="font-semibold">{item.name}</h3>

                          <p className="text-sm text-gray-500">
                            Restaurant : {item.restaurant.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            Category : {item.category?.name}
                          </p>

                          <p className="font-bold text-[#FC8A06]">
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
