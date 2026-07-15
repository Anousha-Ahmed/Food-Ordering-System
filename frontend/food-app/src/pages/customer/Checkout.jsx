import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";

import TopBar from "../../components/layout/Topbar";
import Navbar from "../../components/layout/Navbar";

// import { useSelector, useDispatch } from "react-redux";
// import {
//   increaseQuantity,
//   decreaseQuantity,
//   removeFromCart,
// } from "../../redux/slices/cartSlice";

import { toast } from "react-toastify";
import Footer from "../../components/layout/Footer";
import { API, BASE_URL } from "../../api/endpoints";

const Checkout = () => {
  // const dispatch = useDispatch();

  // const cartItems = useSelector((state) => state.cart.cartItems);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  // In Checkout.jsx - loadCart function
  const loadCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(API.CART, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      // ✅ Debug logs
      console.log("=== CART API RESPONSE ===");
      console.log("Full response:", data);
      console.log("Cart items:", data.data?.items);
      console.log("Total price:", data.data?.total_price);

      if (response.ok) {
        if (data.data?.items && data.data.items.length > 0) {
          console.log("First item:", data.data.items[0]);
          console.log("Item fields:", Object.keys(data.data.items[0]));
        } else {
          console.log("⚠️ No items in cart data");
        }
        setCartItems(data.data.items || []);
      } else {
        toast.error(data.error || "Unable to load cart");
      }
    } catch (err) {
      console.log("Error loading cart:", err);
    }
  };

  // Dynamic Amounts
  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const total = subtotal;

  // remove item
  const handleRemove = async (item) => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(API.CART_DELETE(item.id), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      toast.success("Item Removed");
      loadCart();
    }
  };

  // Increase Quantity
  const handleIncrease = async (item) => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(API.CART_UPDATE(item.id), {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: item.quantity + 1,
      }),
    });

    if (response.ok) {
      loadCart();
    }
  };

  // Decrease Quantity
  const handleDecrease = async (item) => {
    if (item.quantity == 1) {
      handleRemove(item);
      return;
    }

    const token = localStorage.getItem("accessToken");

    const response = await fetch(API.CART_UPDATE(item.id), {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: item.quantity - 1,
      }),
    });
    if (response.ok) {
      loadCart();
    }
  };

  const handleStripePayment = async () => {
    try {
      if (cartItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      const token = localStorage.getItem("accessToken");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      if (!deliveryAddress.trim()) {
        toast.error("Please enter delivery address");
        return;
      }

      localStorage.setItem("deliveryAddress", deliveryAddress);

      const response = await fetch(API.STRIPE_CHECKOUT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.checkout_url;
      } else {
        toast.error(data.error || "Unable to create Stripe session");
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

      <section className="min-h-screen py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Group Order Checkout</h1>

          <div className="grid grid-cols-12 gap-8">
            {/* LEFT */}

            <div className="col-span-8">
              <div className="bg-white rounded-lg shadow">
                {/* Header */}

                <div className="flex justify-between items-center border-b px-6 py-4">
                  <div className="flex items-center gap-3 text-[25px] font-semibold">
                    <FaShoppingCart />
                    My Cart
                  </div>
                </div>

                {/* Empty Cart */}

                {cartItems.length === 0 && (
                  <div className="text-center py-10 text-gray-500">
                    Cart is Empty
                  </div>
                )}

                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b p-6"
                  >
                    <div className="flex gap-5">
                      <img
                        src={`${BASE_URL}${item.image}`}
                        alt={item.name}
                        className="w-28 h-24 rounded object-cover"
                      />
                      <div>
                        <h3 className="font-bold">{item.name}</h3>

                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                          {item.type}
                        </span>

                        <h4 className="font-bold mt-3">£{item.price}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleDecrease(item)}
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        -
                      </button>

                      <span className="font-bold">{item.quantity}</span>

                      <button
                        onClick={() => handleIncrease(item)}
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        +
                      </button>

                      <button
                        onClick={() => handleRemove(item)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                {/* Bottom */}

                <div className="p-6 text-right space-y-2">
                  <p>
                    Subtotal
                    <span className="ml-8 font-semibold">
                      £{subtotal.toFixed(2)}
                    </span>
                  </p>

                  <h2 className="text-xl font-bold">
                    Total
                    <span className="ml-8">£{total.toFixed(2)}</span>
                  </h2>
                </div>
              </div>

              {/* Friends */}

              <div className="mt-8 space-y-4">
                {[
                  {
                    name: "Veress Botond",
                    paid: false,
                  },
                  {
                    name: "Erdei Barna",
                    paid: true,
                  },
                  {
                    name: "Mellau Máté",
                    paid: true,
                  },
                ].map((person, index) => (
                  <div
                    key={index}
                    className="bg-white rounded px-6 py-5 flex justify-between items-center shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <MdCheckCircle className="text-yellow-500" />

                      {person.name}
                    </div>

                    {person.paid ? (
                      <span className="text-yellow-500 font-semibold">
                        Paid
                      </span>
                    ) : (
                      <span className="font-semibold">14.00 RON</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}

            <div className="col-span-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-3xl font-bold mb-6">Total Payment</h2>
                <div className="mt-5 mb-5">
                  <label className="block font-semibold mb-2">
                    Delivery Address
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Enter your delivery address..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>

                <hr />

                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleStripePayment}
                  className="w-full bg-[#FC8A06] text-white rounded py-3 mt-8 font-semibold"
                >
                  Pay With Card
                </button>

                <p className="text-xs text-gray-500 mt-8 leading-6">
                  Complete your payment securely using Stripe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Checkout;
