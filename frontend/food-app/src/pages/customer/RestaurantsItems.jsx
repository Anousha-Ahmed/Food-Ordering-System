import TopBar from "../../components/layout/Topbar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FaClock } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import Burger from "../../assets/RestaurantDetailImg/Burger.png";
import Girl from "../../assets/RestaurantDetailImg/Girl.png";
import Review from "../../assets/RestaurantDetailImg/Review.png";
import { useState, useEffect } from "react";
import MenuCard from "../../components/menu/MenuCard";
import { useNavigate } from "react-router-dom";
import { API, BASE_URL } from "../../api/endpoints";
import CommonRestaurant from "../../components/layout/CommonRestaurant";
import { toast } from "react-toastify";

const RestaurantsItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API.ALL_MENUITEM)
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  // Categories
  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category?.name).filter(Boolean)),
  ];

  // Filtered Items
  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category?.name === activeCategory);

  const handleAddToCart = async (item) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const response = await fetch(API.CART_ADD, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menu_item_id: item.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Added to cart");
      } else {
        toast.error(data.error || data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TopBar />
      <Navbar />

      {/* Hero Section - Fully Responsive */}
      <div className="relative bg-[#03081F] rounded-xl mx-4 sm:mx-6 lg:mx-8 max-w-7xl lg:mx-auto mt-6 sm:mt-8 md:mt-10 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[430px] overflow-hidden">
        <img
          src={Burger}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />

        {/* Hero Content */}
        <div className="absolute inset-0 z-10 px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 flex flex-col justify-center">
          <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-3 max-w-[90%] sm:max-w-[80%] md:max-w-[70%]">
            Discover your favourite restaurants and order delicious food.
          </p>

          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-6 md:mb-8">
            Restaurants
          </h1>

          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            <div className="border border-white/80 rounded-full px-4 sm:px-6 md:px-8 lg:px-14 py-1.5 sm:py-2 md:py-2.5 lg:py-3 flex items-center gap-2 sm:gap-3 text-white text-xs sm:text-sm md:text-base backdrop-blur-sm bg-white/10">
              <BiFoodMenu
                size={16}
                className="sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px] lg:w-[22px] lg:h-[22px]"
              />
              <span className="whitespace-nowrap">Minimum Order: 12 GBP</span>
            </div>

            <div className="border border-white/80 rounded-full px-4 sm:px-6 md:px-8 lg:px-14 py-1.5 sm:py-2 md:py-2.5 lg:py-3 flex items-center gap-2 sm:gap-3 text-white text-xs sm:text-sm md:text-base backdrop-blur-sm bg-white/10">
              <MdDeliveryDining
                size={16}
                className="sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px] lg:w-[22px] lg:h-[22px]"
              />
              <span className="whitespace-nowrap">
                Delivery in 20-25 Minutes
              </span>
            </div>
          </div>
        </div>

        {/* Open Until Badge */}
        <div className="absolute bottom-0 left-0 bg-[#FC8A06] text-white px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 md:py-3.5 lg:py-4 rounded-tr-xl z-10">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <FaClock className="text-sm sm:text-base md:text-lg" />
            <span className="text-xs sm:text-sm md:text-base font-medium">
              Open until 3:00 AM
            </span>
          </div>
        </div>

        {/* Girl Image - Hidden on small screens */}
        <div className="hidden md:block absolute right-4 lg:right-8 top-8 lg:top-16 z-10">
          <img
            src={Girl}
            alt="Girl"
            className="w-[180px] sm:w-[250px] md:w-[320px] lg:w-[420px] h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] object-cover rounded-lg"
          />
        </div>

        {/* Review Image - Hidden on small screens */}
        <div className="hidden lg:block absolute right-[280px] md:right-[200px] lg:right-[380px] bottom-8 md:bottom-10 lg:bottom-12 bg-white rounded-xl p-1 shadow-xl z-10">
          <img
            src={Review}
            alt="Review"
            className="h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px]"
          />
        </div>
      </div>

      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 md:mt-16 lg:mt-[70px]">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left">
          All Offers from Restaurants
        </h2>
      </div>

      {/* Categories - Responsive Horizontal Scroll */}
      <div className="bg-[#F3F3F3] mt-6 sm:mt-8 md:mt-10 lg:mt-[80px] py-4 sm:py-5 px-4 sm:px-6 lg:px-8 overflow-x-auto">
        <div className="flex flex-nowrap sm:flex-wrap gap-3 sm:gap-4 md:gap-6 lg:gap-[70px] justify-start sm:justify-center items-center min-w-max sm:min-w-0">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-5 md:px-6 lg:px-[30px] py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap text-xs sm:text-sm md:text-base ${
                activeCategory === category
                  ? "bg-[#03081F] text-white shadow-lg transform scale-105"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items - Responsive Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center sm:text-left">
          {activeCategory === "All" ? "All Menu Items" : activeCategory}
        </h2>

        {filteredItems.length === 0 ? (
          <div className="flex justify-center items-center h-40 sm:h-52">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-500">
              No Items Found
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="transform hover:scale-[1.02] transition-transform duration-300"
              >
                <MenuCard
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={`${BASE_URL}${item.image}`}
                  onAddToCart={() => handleAddToCart(item)}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <CommonRestaurant />
      
      <Footer />
    </>
  );
};

export default RestaurantsItems;
