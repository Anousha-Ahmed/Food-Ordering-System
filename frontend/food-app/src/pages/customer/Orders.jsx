import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../api/endpoints";
import { toast } from "react-toastify";

import TopBar from "../../components/layout/Topbar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Loader from "../../components/common/Loader"; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");

      if (!token) {
        toast.error("Please login first");
        setLoading(false);
        return;
      }

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
      console.error(err);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "accepted": return "bg-blue-500";
      case "preparing": return "bg-purple-500";
      case "out_for_delivery": return "bg-indigo-500";
      case "delivered": return "bg-green-600";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case "pending": return "Pending";
      case "accepted": return "Accepted";
      case "preparing": return "Preparing";
      case "out_for_delivery": return "Out for Delivery";
      case "delivered": return "Delivered";
      case "cancelled": return "Cancelled";
      default: return status;
    }
  };

  return (
    <>
      <TopBar />
      <Navbar />

      <section className="min-h-screen bg-gray-100 py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-bold mb-8">My Orders</h1>


          {loading ? (
            <Loader />
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-16 text-center">
              <h2 className="text-2xl font-semibold text-gray-500">
                No Orders Found
              </h2>
              <p className="text-gray-400 mt-2">
                Start ordering your favourite food!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.order_id} className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold">{order.restaurant.name}</h2>
                      <p className="text-gray-500">Order #{order.order_id}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-white font-semibold ${getStatusColor(order.current_status)}`}>
                      {getStatusDisplay(order.current_status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mt-6">
                    <div>
                      <p className="text-gray-500">Total Amount</p>
                      <h3 className="text-2xl font-bold text-[#FC8A06]">£{order.total_price}</h3>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Items</p>
                      <h3 className="font-bold text-lg">{order.items.length}</h3>
                    </div>
                    <div>
                      <p className="text-gray-500">Delivery Address</p>
                      <h3 className="font-semibold">{order.delivery_address}</h3>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <p className="text-gray-500">{new Date(order.created_at).toLocaleString()}</p>
                    <Link to={`/orders/${order.order_id}`} className="bg-[#FC8A06] hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold">
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