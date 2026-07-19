import { useEffect, useState, useCallback } from "react";
import { DataContext } from "./DataContext";
import { API } from "../api/endpoints";
import { toast } from "react-toastify";

const DataProvider = ({ children }) => {
  // States
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [deals, setDeals] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  // Loading States
  const [restaurantsLoading, setRestaurantsLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [dealsLoading, setDealsLoading] = useState(true);
  const [menuLoading, setMenuLoading] = useState(true);

  const [error, setError] = useState(null);

  // Load all data function
  const loadAllData = useCallback(async () => {
    try {
      // Reset loading states
      setRestaurantsLoading(true);
      setCategoriesLoading(true);
      setDealsLoading(true);
      setMenuLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [
        restaurantsRes,
        categoriesRes,
        dealsRes,
        menuRes
      ] = await Promise.all([
        fetch(API.ALL_RESTAURANT),
        fetch(API.ALL_CATEGORY),
        fetch(API.ALL_DEAL),
        fetch(API.ALL_MENUITEM)
      ]);

      // Parse responses
      const restaurantsData = await restaurantsRes.json();
      const categoriesData = await categoriesRes.json();
      const dealsData = await dealsRes.json();
      const menuData = await menuRes.json();

      // Set data if successful
      if (restaurantsRes.ok) {
        setRestaurants(restaurantsData.data || []);
      } else {
        throw new Error("Failed to load restaurants");
      }

      if (categoriesRes.ok) {
        setCategories(categoriesData.data || []);
      } else {
        throw new Error("Failed to load categories");
      }

      if (dealsRes.ok) {
        setDeals(dealsData.data || []);
      } else {
        throw new Error("Failed to load deals");
      }

      if (menuRes.ok) {
        setMenuItems(menuData.data || []);
      } else {
        throw new Error("Failed to load menu items");
      }

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

  // Load data on mount
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Refresh function to reload all data
  const refreshData = () => {
    loadAllData();
  };

  // Context value
  const value = {
    // Data
    restaurants,
    categories,
    deals,
    menuItems,
    
    // Loading states
    restaurantsLoading,
    categoriesLoading,
    dealsLoading,
    menuLoading,
    
    // Error and utilities
    error,
    refreshData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;