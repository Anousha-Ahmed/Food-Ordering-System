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

      <section className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-10 text-center">
              <h2 className="text-2xl font-semibold text-gray-500">
                No Orders Found
              </h2>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.order_id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
                >
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {order.restaurant.name}
                      </h2>

                      <p className="text-gray-500">Order #{order.order_id}</p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-white font-semibold ${
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

                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <p className="text-gray-500 text-sm">Total Amount</p>

                      <h3 className="text-2xl font-bold text-[#FC8A06]">
                        £{order.total_price}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Total Items</p>

                      <h3 className="font-bold text-lg">
                        {order.items.length}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Delivery Address</p>

                      <h3 className="font-semibold">
                        {order.delivery_address}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center flex-wrap gap-4">
                    <p className="text-gray-500">
                      {new Date(order.created_at).toLocaleString()}
                    </p>

                    <Link
                      to={`/orders/${order.order_id}`}
                      className="bg-[#FC8A06] hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
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