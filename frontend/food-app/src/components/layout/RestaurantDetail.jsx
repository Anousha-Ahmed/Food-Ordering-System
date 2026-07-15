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
import { API } from "../../api/endpoints";
import { useParams } from "react-router-dom";

const RestaurantDetail = () => {
  const { id } = useParams();
  console.log("Restaurant ID:", id);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    fetch(API.RESTAURANT_DETAIL(id))
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // console.log("Restaurant Data:", data.data);
        // console.log("Menu Items:", data.data.menu_items);

        setRestaurant(data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  if (!restaurant) {
    return <h1>Loading...</h1>;
  }
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

          <div className="border border-gray-400 rounded-full px-6 py-3 w-[330px]">
            <input
              type="text"
              placeholder="🔍 Search from menu..."
              className="outline-none w-full"
            />
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
