import { useEffect, useState } from "react";
import { API } from "../../api/endpoints";
import { toast } from "react-toastify";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(API.ADMIN_ORDERS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log(data);

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

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(API.UPDATE_ORDER_STATUS(id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: status,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Order Updated");
        loadOrders();
      } else {
        toast.error(data.error || "Update Failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server Error");
    } finally {
      setUpdatingId(null);
      setLoading(false);
    }
  };

  // Status color helper
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "accepted":
        return "bg-blue-500";
      case "preparing":
        return "bg-purple-500";
      case "out_for_delivery":
        return "bg-indigo-500";
      case "delivered":
        return "bg-green-600";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
        Manage Orders
        <span className="text-sm font-normal text-gray-500 ml-3">
          ({orders.length})
        </span>
      </h1>

      {/*  TABLE  */}

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-[#FC8A06] text-white">
            <tr>
              <th className="py-3 px-3 text-center text-sm">Order</th>
              <th className="py-3 px-3 text-left text-sm">Restaurant</th>
              <th className="py-3 px-3 text-center text-sm">Items</th>
              <th className="py-3 px-3 text-center text-sm">Total</th>
              <th className="py-3 px-3 text-center text-sm">Status</th>
              <th className="py-3 px-3 text-center text-sm">Update</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders
                .sort((a, b) => a.order_id - b.order_id)
                .map((order) => (
                  <tr
                    key={order.order_id}
                    className="border-b hover:bg-orange-50 transition"
                  >
                    <td className="py-3 px-3 font-semibold text-center text-sm">
                      #{order.order_id}
                    </td>

                    <td className="py-3 px-3">
                      {order.restaurant?.name || "-"}
                    </td>

                    <td className="py-3 px-3 text-center">
                      {order.items?.length || 0}
                    </td>

                    <td className="py-3 px-3 text-center font-semibold text-[#FC8A06]">
                      £{order.total_price}
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs whitespace-nowrap ${getStatusColor(
                          order.current_status
                        )}`}
                      >
                        {order.current_status?.replace(/_/g, " ") || "Unknown"}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <select
                        className="w-full sm:w-auto border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
                        value={order.current_status}
                        onChange={(e) =>
                          updateStatus(order.order_id, e.target.value)
                        }
                        disabled={updatingId === order.order_id}
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="preparing">Preparing</option>
                        <option value="out_for_delivery">
                          Out for Delivery
                        </option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      {updatingId === order.order_id && (
                        <span className="ml-2 text-xs text-gray-500">
                          Updating...
                        </span>
                      )}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
