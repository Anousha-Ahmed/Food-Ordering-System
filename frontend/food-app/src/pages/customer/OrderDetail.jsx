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

      console.log(data.data.items);

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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FC8A06]"></div>
      </div>
    );
  }

  return (
    <>
      <TopBar />
      <Navbar />

      <section className="bg-gray-100 min-h-screen py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center sm:text-left">
            Order Details
          </h1>

          {/* Order Card */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-5">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {order.restaurant.name}
                </h2>

                <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
                  Order #{order.order_id}
                </p>
              </div>

              <span
                className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-white font-semibold text-xs sm:text-sm ${
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

            {/* Updated grid layout - Total Amount on right */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-6 md:mt-8">
              <div>
                <p className="text-gray-500 text-sm sm:text-base">
                  Delivery Address
                </p>

                <h3 className="font-semibold text-base sm:text-lg break-words">
                  {order.delivery_address}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm sm:text-base">Created</p>

                <h3 className="font-semibold text-sm sm:text-base">
                  {new Date(order.created_at).toLocaleString()}
                </h3>
              </div>

              <div className="sm:text-right">
                <p className="text-gray-500 text-sm sm:text-base">
                  Total Amount
                </p>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#FC8A06]">
                  £{order.total_price}
                </h3>
              </div>
            </div>

            {order.current_status === "pending" && (
              <button
                onClick={cancelOrder}
                className="mt-6 sm:mt-8 bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base w-full sm:w-auto"
              >
                Cancel Order
              </button>
            )}
          </div>

          {/* Items */}
          <div className="mt-8 sm:mt-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              Ordered Items
            </h2>

            <div className="space-y-4 sm:space-y-5">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
                >
                  <img
                    src={item.image ? `${BASE_URL}${item.image}` : "/placeholder-image.png"}
                    alt={item.name || "Item"}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold truncate">
                      {item.name || "Unknown Item"}
                    </h3>

                    <p className="text-gray-500 mt-1 text-sm sm:text-base">
                      Type: {item.type || "unknown"}
                    </p>

                    <p className="text-gray-500 text-sm sm:text-base">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <div className="text-left sm:text-right w-full sm:w-auto">
                    <h3 className="text-lg sm:text-xl font-bold text-[#FC8A06]">
                      £{item.subtotal}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      £{item.price_at_order} each
                    </p>
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