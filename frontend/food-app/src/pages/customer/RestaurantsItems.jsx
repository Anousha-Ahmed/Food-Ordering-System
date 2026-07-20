import TopBar from "../../components/layout/Topbar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FaClock } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import Burger from "../../assets/RestaurantDetailImg/Burger.png";
import Girl from "../../assets/RestaurantDetailImg/Girl.png";
import Review from "../../assets/RestaurantDetailImg/Review.png";
import { useState } from "react";
import MenuCard from "../../components/menu/MenuCard";
import { API, BASE_URL } from "../../api/endpoints";
import CommonRestaurant from "../../components/layout/CommonRestaurant";
import { toast } from "react-toastify";
import { useData } from "../../context/DataContext";
import Loader from "../../components/common/Loader";

const RestaurantsItems = () => {
  const { menuItems, menuLoading } = useData();
  const [activeCategory, setActiveCategory] = useState("All");

  // ✅ View More States
  const [visibleCount, setVisibleCount] = useState(6); // Initially show 6 items
  const incrementCount = 6; // Load 6 more each time

  if (menuLoading) {
    return (
      <>
        <TopBar />
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category?.name).filter(Boolean)),
  ];

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category?.name === activeCategory);

  // ✅ View More Logic
  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  // ✅ Load More Handler
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + incrementCount);
  };

  // ✅ Reset when category changes
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(6); // Reset to 6 items
  };

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
        body: JSON.stringify({ menu_item_id: item.id }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Added to cart");
      } else {
        toast.error(data.error || data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <TopBar />
      <Navbar />

      <div className="relative bg-[#03081F] rounded-xl mx-4 sm:mx-6 lg:mx-8 max-w-7xl lg:mx-auto mt-6 sm:mt-8 md:mt-10 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[430px] overflow-hidden">
        <img
          src={Burger}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 z-10 px-4 sm:px-6 md:px-8 lg:px-10 py-6 flex flex-col justify-center">
          <p className="text-white text-sm mb-3">
            Discover your favourite restaurants and order delicious food.
          </p>
          <h1 className="text-white text-4xl lg:text-6xl font-semibold mb-8">
            Restaurants
          </h1>
          <div className="flex flex-wrap gap-4">
            <div className="border border-white rounded-full px-8 py-3 flex items-center gap-3 text-white bg-white/10">
              <BiFoodMenu />
              <span>Minimum Order: 12 GBP</span>
            </div>
            <div className="border border-white rounded-full px-8 py-3 flex items-center gap-3 text-white bg-white/10">
              <MdDeliveryDining />
              <span>Delivery in 20-25 Minutes</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 bg-[#FC8A06] text-white px-10 py-4 rounded-tr-xl">
          <div className="flex items-center gap-2">
            <FaClock />
            <span>Open until 3:00 AM</span>
          </div>
        </div>
        <div className="hidden md:block absolute right-8 top-16">
          <img src={Girl} alt="" className="w-[420px] h-[300px] object-cover" />
        </div>
        <div className="hidden lg:block absolute right-[380px] bottom-12 bg-white rounded-xl p-1 shadow-xl">
          <img src={Review} alt="" className="h-[120px]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 px-4">
        <h2 className="text-4xl font-bold">All Offers from Restaurants</h2>
      </div>

      <div className="bg-[#F3F3F3] mt-16 py-5 overflow-x-auto">
        <div className="flex gap-6 justify-center min-w-max px-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-8 py-3 rounded-full font-semibold transition ${
                activeCategory === category
                  ? "bg-[#03081F] text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">
            {activeCategory === "All" ? "All Menu Items" : activeCategory}
          </h2>
          {/* ✅ Show total items */}
          <span className="text-gray-500 text-sm">
            Showing {Math.min(visibleCount, filteredItems.length)} of{" "}
            {filteredItems.length} items
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="h-40 flex justify-center items-center">
            <h2 className="text-3xl font-bold text-gray-500">No Items Found</h2>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleItems.map((item) => (
                <MenuCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={`${BASE_URL}${item.image}`}
                  onAddToCart={() => handleAddToCart(item)}
                />
              ))}
            </div>

            {/* ✅ View More Button */}
            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-[#FC8A06] text-white rounded-full font-semibold hover:bg-orange-600 transition"
                >
                  View More ({filteredItems.length - visibleCount} remaining)
                </button>
              </div>
            )}

            {/* ✅ Show All Button (when all items are loaded) */}
            {!hasMore && visibleCount > 6 && (
              <div className="text-center mt-6">
                <p className="text-gray-500 text-sm">
                  All {filteredItems.length} items loaded
                </p>
              </div>
            )}
          </>
        )}
      </section>

      <CommonRestaurant />
      <Footer />
    </>
  );
};

export default RestaurantsItems;
