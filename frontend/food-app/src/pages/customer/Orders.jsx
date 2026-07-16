import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../api/endpoints";
import { toast } from "react-toastify";

import TopBar from "../../components/layout/Topbar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(API.USER_ORDERS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setOrders(data.data || []);
      } else {
        toast.error(data.error || "Unable to load orders");
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

      <section className="min-h-screen bg-gray-100 py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center sm:text-left">
            My Orders
          </h1>

          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 sm:p-10 md:p-16 text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-500">
                No Orders Found
              </h2>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                Start ordering your favourite food!
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {orders.map((order) => (
                <div
                  key={order.order_id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-5 md:p-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                    <div>
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                        {order.restaurant.name}
                      </h2>

                      <p className="text-gray-500 text-sm sm:text-base">
                        Order #{order.order_id}
                      </p>
                    </div>

                    <span
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white font-semibold text-xs sm:text-sm ${
                        order.current_status === "pending"
                          ? "bg-yellow-500"
                          : order.current_status === "accepted"
                          ? "bg-green-600"
                          : order.current_status === "cancelled"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {order.current_status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-4 sm:mt-5 md:mt-6">
                    <div>
                      <p className="text-gray-500 text-xs sm:text-sm">Total Amount</p>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#FC8A06]">
                        £{order.total_price}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-500 text-xs sm:text-sm">Total Items</p>

                      <h3 className="font-bold text-base sm:text-lg">
                        {order.items.length}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-500 text-xs sm:text-sm">Delivery Address</p>

                      <h3 className="font-semibold text-sm sm:text-base break-words">
                        {order.delivery_address}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {new Date(order.created_at).toLocaleString()}
                    </p>

                    <Link
                      to={`/orders/${order.order_id}`}
                      className="bg-[#FC8A06] hover:bg-orange-600 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold transition text-sm sm:text-base w-full sm:w-auto text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Orders;