import { useEffect, useState } from "react";
import { API } from "../../api/endpoints";
import { toast } from "react-toastify";
import RestaurantRevenueChart from "../../components/admin/RestaurantRevenueChart";
import OverTimeRevenueChart from "../../components/admin/OvertimeRevenueChart";
import Loader from "../../components/common/Loader"; 

const Dashboard = () => {
  const [overview, setOverview] = useState({});
  const [restaurantRevenue, setRestaurantRevenue] = useState([]);
  const [revenueTime, setRevenueTime] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [popularDeals, setPopularDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [
        overviewRes,
        restaurantRes,
        revenueRes,
        statusRes,
        itemsRes,
        dealsRes,
      ] = await Promise.all([
        fetch(API.ADMIN_OVERVIEW, { headers }),
        fetch(API.ADMIN_RESTAURANT_REVENUE, { headers }),
        fetch(API.ADMIN_REVENUE_TIME, { headers }),
        fetch(API.ADMIN_ORDER_STATUS, { headers }),
        fetch(API.ADMIN_POPULAR_ITEMS, { headers }),
        fetch(API.ADMIN_POPULAR_DEALS, { headers }),
      ]);

      const overviewData = await overviewRes.json();
      const restaurantData = await restaurantRes.json();
      const revenueData = await revenueRes.json();
      const statusData = await statusRes.json();
      const itemsData = await itemsRes.json();
      const dealsData = await dealsRes.json();

      if (overviewRes.ok) setOverview(overviewData.data);
      if (restaurantRes.ok) setRestaurantRevenue(restaurantData.data);
      if (revenueRes.ok) setRevenueTime(revenueData.data);
      if (statusRes.ok) setOrderStatus(statusData.data);
      if (itemsRes.ok) setPopularItems(itemsData.data);
      if (dealsRes.ok) setPopularDeals(dealsData.data);
    } catch (err) {
      console.log(err);
      toast.error("Analytics Load Failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loader
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h3>Total Orders</h3>
          <h1 className="text-3xl font-bold">{overview.total_orders || 0}</h1>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h3>Total Revenue</h3>
          <h1 className="text-3xl font-bold">£{overview.total_revenue || 0}</h1>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h3>Restaurants</h3>
          <h1 className="text-3xl font-bold">
            {overview.active_restaurants || 0}
          </h1>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h3>Users</h3>
          <h1 className="text-3xl font-bold">{overview.total_users || 0}</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {orderStatus.length > 0 ? (
          orderStatus.map((item) => (
            <div
              key={item.current_status}
              className="bg-white shadow rounded-xl p-6"
            >
              <h3 className="capitalize">{item.current_status}</h3>
              <h1 className="text-3xl font-bold text-[#FC8A06]">
                {item.count}
              </h1>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center py-10 text-gray-500">
            No order data available
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold mb-5">Popular Items</h2>
          {popularItems.length > 0 ? (
            popularItems.map((item) => (
              <div
                key={item.menu_item__id}
                className="flex flex-col sm:flex-row sm:justify-between gap-2 border-b py-3"
              >
                <div>
                  <h3 className="font-semibold">{item.menu_item__name}</h3>
                  <p className="text-gray-500">
                    {item.menu_item__restaurant_id__name}
                  </p>
                </div>
                <div className="text-right">
                  <p>Sold : {item.total_sold}</p>
                  <p className="font-bold">£{item.total_revenue}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">
              No popular items data
            </p>
          )}
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold mb-5">Popular Deals</h2>
          {popularDeals.length > 0 ? (
            popularDeals.map((deal) => (
              <div
                key={deal.deal__id}
                className="flex flex-col sm:flex-row sm:justify-between gap-2 border-b py-3"
              >
                <div>
                  <h3 className="font-semibold">{deal.deal__name}</h3>
                  <p className="text-gray-500">
                    {deal.deal__restaurant_id__name}
                  </p>
                </div>
                <div className="text-right">
                  <p>Sold : {deal.total_sold}</p>
                  <p className="font-bold">£{deal.total_revenue}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">
              No popular deals data
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RestaurantRevenueChart data={restaurantRevenue} />
        <OverTimeRevenueChart data={revenueTime} />
      </div>
    </div>
  );
};

export default Dashboard;
