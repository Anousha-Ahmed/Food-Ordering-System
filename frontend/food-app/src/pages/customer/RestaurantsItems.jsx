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
// import { addToCart } from "../../redux/slices/cartSlice";
// import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const RestaurantsItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API.ALL_MENUITEM)
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data.data);
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

      {/* Hero */}
      <div className="bg-[#03081F] rounded-xl h-[430px] relative max-w-7xl mx-auto mt-10">
        <img
          src={Burger}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />

        <div className="absolute left-10 top-24 text-white z-10">
          <p className="text-lg mb-3">
            Discover your favourite restaurants and order delicious food.
          </p>

          <h1 className="text-6xl font-semibold mb-8">Restaurants</h1>

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

        <div className="absolute top-[400px] left-0 bg-[#FC8A06] text-white px-12 py-4 rounded-tr-xl">
          <div className="flex items-center gap-2">
            <FaClock />
            <span>Open until 3:00 AM</span>
          </div>
        </div>

        <div className="absolute right-8 top-16">
          <img
            src={Girl}
            alt=""
            className="w-[420px] h-[300px] object-cover rounded-lg"
          />
        </div>

        <div className="absolute right-[380px] bottom-12 bg-white rounded-xl p-1 shadow-xl">
          <img src={Review} alt="" className="h-[120px]" />
        </div>
      </div>
      <div className="flex justify-between items-center  max-w-7xl mx-auto mt-[70px]">
          <h2 className="text-4xl font-bold">
            All Offers from Restaurants
          </h2>
        </div>

      {/* Categories */}
      <div className="bg-[#F3F3F3] mt-[80px] flex flex-wrap justify-center gap-[70px] py-5 px-5">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category)}
            className={`px-[30px] py-3 rounded-full font-semibold transition ${
              activeCategory === category
                ? "bg-[#03081F] text-white"
                : "bg-white text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <section className="max-w-7xl mx-auto py-12">
        <h2 className="text-4xl font-bold mb-8">
          {activeCategory === "All" ? "All Menu Items" : activeCategory}
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id}>
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
      </section>
      <CommonRestaurant />

      <Footer />
    </>
  );
};

export default RestaurantsItems;
