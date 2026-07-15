import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/layout/Topbar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { API, BASE_URL } from "../../api/endpoints";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/slices/cartSlice";

import {
  FaStar,
  FaStarHalfAlt,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

import { MdDeliveryDining } from "react-icons/md";

const DealDetail = () => {
  const { id } = useParams();
  // const dispatch = useDispatch();

  const [deal, setDeal] = useState(null);
  const [allDeals, setAllDeals] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(API.DEAL_DETAIL(id))
      .then(res => res.json())
      .then(data => {
        setDeal(data.data);
  
        if (data.data.items.length > 0) {
          setSelectedImage(
            `${BASE_URL}${data.data.items[0].menu_item.image}`
          );
        }
      });
  }, [id]);
  useEffect(() => {
    fetch(API.ALL_DEAL)
      .then(res => res.json())
      .then(data => setAllDeals(data.data || []));
  }, []);

  if (!deal)
    return <h1 className="text-center mt-20 text-3xl font-bold">Loading...</h1>;

  const similarDeals = allDeals.filter((d) => d.id !== deal.id);

  const handleAddDeal = async () => {
    const token = localStorage.getItem("accessToken");
  
    if (!token) {
      toast.error("Please login first");
      return;
    }
  
    try {
      // ✅ FIX: Add the deal as a single item, not individual menu items
      const response = await fetch(API.CART_ADD, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deal_id: deal.id,  // ← Send deal_id instead of menu_item_id
          quantity: qty,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Deal Added Successfully");
        // Optional: Navigate to cart or stay
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

      <section className="max-w-7xl mx-auto py-10">
        <div className="grid grid-cols-2 gap-15">
          {/* LEFT */}

          <div className="rounded-2xl overflow-hidden shadow-md">
            <div className="border rounded-3xl overflow-hidden shadow">
              <img
                src={selectedImage}
                alt=""
                className="w-full h-[380px] object-cover"
              />
            </div>

            <div className="flex gap-4 mt-5">
              {deal.items.map((item) => (
                <img
                  key={item.id}
                  src={`${BASE_URL}${item.menu_item.image}`}
                  alt=""
                  onClick={() =>
                    setSelectedImage(`${BASE_URL}${item.menu_item.image}`)
                  }
                  className={`w-24 h-24 rounded-xl object-cover cursor-pointer border-2 ${
                    selectedImage === `${BASE_URL}${item.menu_item.image}`
                      ? "border-orange-500"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}

          <div className="ml-12">
            <p className="text-orange-500 font-bold">LIMITED TIME OFFER</p>

            <h1 className="text-5xl font-bold mt-2">{deal.name}</h1>

            {/* Rating */}

            <div className="flex items-center gap-2 mt-5">
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStarHalfAlt className="text-yellow-400" />

              <span className="font-semibold">4.8</span>

              <span className="text-gray-500">(250 Reviews)</span>
            </div>

            <p className="text-gray-600 mt-6 leading-8">{deal.description}</p>

            {/* Price */}

            <div className="flex items-center gap-5 mt-8">
              <h1 className="text-4xl font-bold text-[#FC8A06]">
                £ {deal.combo_price}
              </h1>

              <div className="bg-red-500 text-white px-4 py-3 rounded-full font-bold">
                {deal.discount_percentage || 25}% OFF
              </div>
            </div>

            {/* Delivery */}

            <div className="flex items-center gap-3 mt-8">
              <MdDeliveryDining className="text-[#FC8A06]" size={30} />

              <div>
                <h3 className="font-bold">Free Delivery</h3>

                <p className="text-gray-500">Delivery in 20-30 Minutes</p>
              </div>
            </div>

            {/* Quantity */}

            <div className="flex items-center gap-8 mt-10">
              <div className="flex items-center border rounded-full">
                <button
                  className="px-5 py-3"
                  onClick={() => qty > 1 && setQty(qty - 1)}
                >
                  <FaMinus />
                </button>

                <span className="px-6 font-bold">{qty}</span>

                <button className="px-5 py-3" onClick={() => setQty(qty + 1)}>
                  <FaPlus />
                </button>
              </div>

              <button 
              className="bg-[#FC8A06] text-white px-12 py-4 rounded-xl font-bold hover:bg-orange-600"
              onClick={handleAddDeal}
              >
                Add To Cart
              </button>

              
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}

      <section className="max-w-7xl mx-auto mt-12">
        <h2 className="text-3xl font-bold mb-8">What's Included</h2>

        <div className="grid grid-cols-4 gap-6">
          {deal.items.map((item) => (
            <div
              key={item.id}
              className="border rounded-2xl overflow-hidden shadow"
            >
              <img
                src={`${BASE_URL}${item.menu_item.image}`}
                className="w-full h-44 object-cover"
                alt=""
              />

              <div className="p-4">
                <h3 className="font-bold">{item.menu_item.name}</h3>

                <p className="text-gray-500 mt-2">Qty : {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-8">From This Restaurant</h2>

        <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              src={`${BASE_URL}${deal.items[0]?.menu_item.restaurant?.image}`}
              alt=""
              className="w-32 h-32 rounded-2xl object-cover"
            />

            <div>
              <h2 className="text-3xl font-bold">
                {deal.items[0]?.menu_item.restaurant?.name}
              </h2>

              <p className="text-gray-500 mt-3">
                {deal.items[0]?.menu_item.restaurant?.description}
              </p>

              <div className="flex items-center gap-2 mt-4">
                <FaStar className="text-yellow-400" />

                <span>4.8 Rating</span>
              </div>
            </div>
          </div>

          <button className="bg-[#FC8A06] text-white px-8 py-4 rounded-xl font-bold">
            View Restaurant
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto mt-20 mb-20">
        <h2 className="text-3xl font-bold mb-8">Similar Deals</h2>

        <div className="grid grid-cols-4 gap-6">
          {similarDeals.slice(0, 4).map((item) => {
            const image =
              item.items.length > 0
                ? `${BASE_URL}${item.items[0].menu_item.image}`
                : "https://placehold.co/400x300";

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl duration-300 cursor-pointer"
                onClick={() => (window.location.href = `/offers/${item.id}`)}
              >
                <div className="relative">
                  <img
                    src={image}
                    alt=""
                    className="w-full h-56 object-cover"
                  />

                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    20% OFF
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-xl">{item.name}</h3>

                  <p className="text-gray-500 mt-2 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center mt-5">
                    <h2 className="text-[#FC8A06] font-bold text-2xl">
                      £ {item.combo_price}
                    </h2>

                    <button className="bg-[#FC8A06] text-white px-5 py-2 rounded-full">
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