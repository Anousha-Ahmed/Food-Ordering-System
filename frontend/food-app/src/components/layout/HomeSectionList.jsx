import React, { useEffect, useState } from "react";
import HomeSectCard from "./HomeSectCards";
import { API, BASE_URL } from "../../api/endpoints";

const HomeSectionList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetch(API.ALL_CATEGORY);
      const data = await response.json();

      if (response.ok) {
        setCategories(data.data || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-0 py-12 mt-[50px]">
      <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold mb-8">
        Order.uk Popular Categories 🤩
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5">
        {categories.map((item) => (
          <HomeSectCard
            key={item.id}
            id={item.id}
            type="category"
            image={`${BASE_URL}${item.image}`}
            title={item.name}
            restaurants={item.restaurant_count}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeSectionList;