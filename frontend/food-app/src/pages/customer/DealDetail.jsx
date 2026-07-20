import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../../components/layout/Topbar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { API, BASE_URL } from "../../api/endpoints";
import { toast } from "react-toastify";
import { FaStar, FaStarHalfAlt, FaPlus, FaMinus } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { useData } from "../../context/DataContext";
import Loader from "../../components/common/Loader"; 

const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deals, dealsLoading } = useData();
  const [deal, setDeal] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!dealsLoading) {
      const foundDeal = deals.find((d) => d.id === Number(id));
      if (foundDeal) {
        setDeal(foundDeal);
        if (foundDeal.items.length > 0) {
          setSelectedImage(`${BASE_URL}${foundDeal.items[0].menu_item.image}`);
        }
      }
    }
  }, [deals, dealsLoading, id]);

 
  if (dealsLoading || !deal) {
    return <Loader />;
  }

  const similarDeals = deals.filter((d) => d.id !== deal.id);

  const handleAddDeal = async () => {
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
        body: JSON.stringify({ deal_id: deal.id, quantity: qty }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Deal Added Successfully");
      } else {
        toast.error(data.error || "Unable to add deal");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server Error");
    }
  };

  return (
    <>
      <TopBar />
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-15">
          <div>
            <div className="border rounded-2xl sm:rounded-3xl overflow-hidden shadow">
              <img
                src={selectedImage}
                alt={deal.name}
                className="w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px] object-cover"
              />
            </div>
            <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-5 overflow-x-auto pb-2">
              {deal.items.map((item) => (
                <img
                  key={item.id}
                  src={`${BASE_URL}${item.menu_item.image}`}
                  alt={item.menu_item.name}
                  onClick={() =>
                    setSelectedImage(`${BASE_URL}${item.menu_item.image}`)
                  }
                  className={`w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-xl object-cover cursor-pointer border-2 flex-shrink-0 ${
                    selectedImage === `${BASE_URL}${item.menu_item.image}`
                      ? "border-orange-500"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="lg:ml-0 lg:pl-4">
            <p className="text-orange-500 font-bold text-sm sm:text-base">
              LIMITED TIME OFFER
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
              {deal.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-4 sm:mt-5">
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStarHalfAlt className="text-yellow-400" />
              <span className="font-semibold">4.8</span>
              <span className="text-gray-500">(250 Reviews)</span>
            </div>
            <p className="text-gray-600 mt-4 sm:mt-6 leading-6 sm:leading-7 md:leading-8 text-sm sm:text-base">
              {deal.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-6 sm:mt-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#FC8A06]">
                £ {deal.combo_price}
              </h1>
              <div className="bg-red-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base">
                {deal.discount_percentage || 25}% OFF
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 sm:mt-8">
              <MdDeliveryDining className="text-[#FC8A06]" size={24} />
              <div>
                <h3 className="font-bold text-sm sm:text-base">
                  Free Delivery
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Delivery in 20-30 Minutes
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 md:mt-10">
              <div className="flex items-center border rounded-full">
                <button
                  className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 hover:bg-gray-100 rounded-l-full transition-colors"
                  onClick={() => qty > 1 && setQty(qty - 1)}
                >
                  <FaMinus className="text-sm sm:text-base" />
                </button>
                <span className="px-4 sm:px-5 md:px-6 font-bold text-sm sm:text-base">
                  {qty}
                </span>
                <button
                  className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 hover:bg-gray-100 rounded-r-full transition-colors"
                  onClick={() => setQty(qty + 1)}
                >
                  <FaPlus className="text-sm sm:text-base" />
                </button>
              </div>
              <button
                className="bg-[#FC8A06] text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors w-full sm:w-auto text-sm sm:text-base"
                onClick={handleAddDeal}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 md:mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
          What's Included
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {deal.items.map((item) => (
            <div
              key={item.id}
              className="border rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow"
            >
              <img
                src={`${BASE_URL}${item.menu_item.image}`}
                className="w-full h-36 sm:h-40 md:h-44 object-cover"
                alt={item.menu_item.name}
              />
              <div className="p-3 sm:p-4">
                <h3 className="font-bold text-sm sm:text-base">
                  {item.menu_item.name}
                </h3>
                <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm">
                  Qty : {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14 md:mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
          From This Restaurant
        </h2>
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
            <img
              src={`${BASE_URL}${deal.items[0]?.menu_item.restaurant?.image}`}
              alt={deal.items[0]?.menu_item.restaurant?.name}
              className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-2xl object-cover"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                {deal.items[0]?.menu_item.restaurant?.name}
              </h2>
              <p className="text-gray-500 mt-1 sm:mt-2 md:mt-3 text-sm sm:text-base">
                {deal.items[0]?.menu_item.restaurant?.description}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 sm:mt-3 md:mt-4">
                <FaStar className="text-yellow-400" />
                <span className="text-sm sm:text-base">4.8 Rating</span>
              </div>
            </div>
          </div>
          <button
            className="bg-[#FC8A06] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors text-sm sm:text-base w-full sm:w-auto"
            onClick={() =>
              navigate(
                `/restaurants/${deal.items[0]?.menu_item.restaurant?.id}`
              )
            }
          >
            View Restaurant
          </button>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16 md:mt-20 mb-12 sm:mb-16 md:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
          Similar Deals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {similarDeals.slice(0, 4).map((item) => {
            const image =
              item.items.length > 0
                ? `${BASE_URL}${item.items[0].menu_item.image}`
                : "https://placehold.co/400x300";
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                onClick={() => navigate(`/offers/${item.id}`)}
              >
                <div className="relative">
                  <img
                    src={image}
                    alt={item.name}
                    className="w-full h-40 sm:h-48 md:h-56 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                    20% OFF
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-base sm:text-lg md:text-xl line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mt-3 sm:mt-4 md:mt-5">
                    <h2 className="text-[#FC8A06] font-bold text-xl sm:text-2xl">
                      £ {item.combo_price}
                    </h2>
                    <button className="bg-[#FC8A06] text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base hover:bg-orange-600 transition-colors w-full sm:w-auto">
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DealDetail;
