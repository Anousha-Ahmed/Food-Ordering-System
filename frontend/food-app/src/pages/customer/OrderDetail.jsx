import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API, BASE_URL } from "../../api/endpoints";
import { toast } from "react-toastify";
import TopBar from "../../components/layout/Topbar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const OrderDetail = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(API.ORDER_DETAIL(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setOrder(data.data);
      } else {
        toast.error(data.error || "Unable to load order");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server Error");
    }
  };

  const cancelOrder = async () => {
    try {
      const token = localStorage.getItem("accessToken");
  
      const response = await fetch(API.CANCEL_ORDER(id), {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(data.message);
  
        loadOrder();
      } else {
        toast.error(data.error || data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Server Error");
    }
  };

  if (!order) {
    return (
      <div className="text-center py-20 text-3xl font-bold">Loading...</div>
    );
  }

  return (
    <>
      <TopBar />
      <Navbar />

      <section className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Order Details</h1>

          {/* Order Card */}

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center flex-wrap gap-5">
              <div>
                <h2 className="text-3xl font-bold">{order.restaurant.name}</h2>

                <p className="text-gray-500 mt-2">Order #{order.order_id}</p>
              </div>

              <span
                className={`px-5 py-2 rounded-full text-white font-semibold ${
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

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="text-gray-500">Delivery Address</p>

                <h3 className="font-semibold text-lg">
                  {order.delivery_address}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Total Amount</p>

                <h3 className="text-3xl font-bold text-[#FC8A06]">
                  £{order.total_price}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Created</p>

                <h3 className="font-semibold">
                  {new Date(order.created_at).toLocaleString()}
                </h3>
              </div>
            </div>

            {order.current_status === "pending" && (
              <button
                onClick={cancelOrder}
                className="mt-8 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Cancel Order
              </button>
            )}
          </div>

          {/* Items */}

          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-6">Ordered Items</h2>

            <div className="space-y-5">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md p-5 flex gap-6 items-center"
                >
                  <img
                    src={`${BASE_URL}${item.image}`}
                    alt={item.name}
                    className="w-28 h-28 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{item.name}</h3>

                    <p className="text-gray-500 mt-2">Type: {item.type}</p>

                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>

                  <div className="text-right">
                    <h3 className="text-xl font-bold text-[#FC8A06]">
                      £{item.subtotal}
                    </h3>

                    <p className="text-gray-500">£{item.price_at_order} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default OrderDetail;