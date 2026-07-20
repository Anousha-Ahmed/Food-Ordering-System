import { useEffect, useState, useCallback } from "react";
import { DataContext } from "./DataContext";
import { API } from "../api/endpoints";
import { toast } from "react-toastify";

const DataProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [deals, setDeals] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const [restaurantsLoading, setRestaurantsLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [dealsLoading, setDealsLoading] = useState(true);
  const [menuLoading, setMenuLoading] = useState(true);

  const [error, setError] = useState(null);

  const loadAllData = useCallback(async () => {
    try {
      setRestaurantsLoading(true);
      setCategoriesLoading(true);
      setDealsLoading(true);
      setMenuLoading(true);
      setError(null);

      const [restaurantsRes, categoriesRes, dealsRes, menuRes] =
        await Promise.all([
          fetch(API.ALL_RESTAURANT),
          fetch(API.ALL_CATEGORY),
          fetch(API.ALL_DEAL),
          fetch(API.ALL_MENUITEM),
        ]);

      const restaurantsData = await restaurantsRes.json();
      const categoriesData = await categoriesRes.json();
      const dealsData = await dealsRes.json();
      const menuData = await menuRes.json();

      if (restaurantsRes.ok) setRestaurants(restaurantsData.data || []);
      if (categoriesRes.ok) setCategories(categoriesData.data || []);
      if (dealsRes.ok) setDeals(dealsData.data || []);
      if (menuRes.ok) setMenuItems(menuData.data || []);
    } catch (err) {
      console.error("Failed to load data:", err);
      setError(err.message);
      toast.error("Failed to load initial data");
    } finally {
      setRestaurantsLoading(false);
      setCategoriesLoading(false);
      setDealsLoading(false);
      setMenuLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const refreshData = () => {
    loadAllData();
  };

  const value = {
    restaurants,
    categories,
    deals,
    menuItems,
    restaurantsLoading,
    categoriesLoading,
    dealsLoading,
    menuLoading,
    error,
    refreshData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
