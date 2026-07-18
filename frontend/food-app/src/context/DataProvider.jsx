import { useEffect, useState } from "react";
import { DataContext } from "./DataContext";
import { API } from "../api/endpoints";

const DataProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [deals, setDeals] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const [restaurantsLoading, setRestaurantsLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [dealsLoading, setDealsLoading] = useState(true);
  const [menuLoading, setMenuLoading] = useState(true);

  useEffect(() => {
    // Restaurants
    fetch(API.ALL_RESTAURANT)
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data.data || []);
      })
      .catch(console.error)
      .finally(() => setRestaurantsLoading(false));

    // Categories
    fetch(API.ALL_CATEGORY)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data || []);
      })
      .catch(console.error)
      .finally(() => setCategoriesLoading(false));

    // Deals
    fetch(API.ALL_DEAL)
      .then((res) => res.json())
      .then((data) => {
        setDeals(data.data || []);
      })
      .catch(console.error)
      .finally(() => setDealsLoading(false));

    // Menu Items
    fetch(API.ALL_MENUITEM)
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data.data || []);
      })
      .catch(console.error)
      .finally(() => setMenuLoading(false));
  }, []);

  return (
    <DataContext.Provider
      value={{
        restaurants,
        restaurantsLoading,

        categories,
        categoriesLoading,

        deals,
        dealsLoading,

        menuItems,
        menuLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;