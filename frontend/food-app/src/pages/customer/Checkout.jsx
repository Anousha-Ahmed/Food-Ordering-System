import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import TopBar from "../../components/layout/Topbar";
import Navbar from "../../components/layout/Navbar";
import { toast } from "react-toastify";
import Footer from "../../components/layout/Footer";
import { API, BASE_URL } from "../../api/endpoints";
import Loader from "../../components/common/Loader";

const Checkout = () => {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch(API.CART, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setCartItems(data.data?.items || []);
      } else {
        toast.error(data.error || "Unable to load cart");
      }
    } catch (err) {
      console.log("Error loading cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );
  const total = subtotal;

  const handleRemove = async (item) => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(API.CART_DELETE(item.id), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      toast.success("Item Removed");
      loadCart();
    }
  };

  const handleIncrease = async (item) => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(API.CART_UPDATE(item.id), {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    });
    if (response.ok) {
      loadCart();
    }
  };

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
      body: JSON.stringify({ quantity: item.quantity - 1 }),
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
        headers: { Authorization: `Bearer ${token}` },
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

  // ✅ Loader
  if (loading) {
    return (
      <>
        <TopBar />
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <section className="min-h-screen bg-gray-100 py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center sm:text-left">
            Group Order Checkout
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow overflow-hidden h-full flex flex-col">
                <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-[25px] font-semibold">
                    My Cart
                  </div>
                  <span className="text-sm sm:text-base text-gray-500">
                    {cartItems.length} items
                  </span>
                </div>
                {cartItems.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 px-6 bg-gray-50">
                    <p className="text-xl sm:text-2xl font-semibold text-gray-600">
                      Your Cart is Empty
                    </p>
                    <p className="text-sm sm:text-base text-gray-400 mt-2">
                      Start adding some delicious items!
                    </p>
                  </div>
                )}
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b p-4 sm:p-5 md:p-6 gap-4 sm:gap-0"
                  >
                    <div className="flex gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto">
                      <img
                        src={`${BASE_URL}${item.image}`}
                        alt={item.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-24 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm sm:text-base truncate">
                          {item.name}
                        </h3>
                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full inline-block mt-1">
                          {item.category?.name || item.type || "Food"}
                        </span>
                        <h4 className="font-bold mt-2 text-sm sm:text-base">
                          £{item.price}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          onClick={() => handleDecrease(item)}
                          className="bg-gray-200 hover:bg-gray-300 px-3 sm:px-4 py-1.5 rounded-lg text-sm sm:text-base transition-colors"
                        >
                          -
                        </button>
                        <span className="font-bold w-6 text-center text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrease(item)}
                          className="bg-gray-200 hover:bg-gray-300 px-3 sm:px-4 py-1.5 rounded-lg text-sm sm:text-base transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1.5 rounded-lg text-sm transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="p-4 sm:p-5 md:p-6 text-right space-y-2 bg-gray-50 mt-auto">
                  <p className="text-sm sm:text-base">
                    Subtotal{" "}
                    <span className="ml-6 sm:ml-8 font-semibold">
                      £{subtotal.toFixed(2)}
                    </span>
                  </p>
                  <h2 className="text-lg sm:text-xl font-bold">
                    Total{" "}
                    <span className="ml-6 sm:ml-8">£{total.toFixed(2)}</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-gray-50 rounded-lg shadow p-4 sm:p-5 md:p-6 border border-gray-200 h-full flex flex-col">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
                  Total Payment
                </h2>
                <div className="mt-4 sm:mt-5 mb-4 sm:mb-5">
                  <label className="block font-semibold mb-2 text-sm sm:text-base">
                    Delivery Address
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter your delivery address..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base bg-white"
                  />
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between font-bold text-base sm:text-lg md:text-xl">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleStripePayment}
                  className="w-full bg-[#FC8A06] hover:bg-[#e07a05] text-white rounded-lg py-3 sm:py-4 mt-6 sm:mt-8 font-semibold text-sm sm:text-base transition-colors"
                >
                  Pay With Card
                </button>
                <p className="text-xs text-gray-500 mt-4 sm:mt-6 leading-5 sm:leading-6">
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
