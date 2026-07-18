import React from "react";
import HomeSectCard from "./HomeSectCards";
import { BASE_URL } from "../../api/endpoints";
import { useData } from "../../context/DataContext";

const HomeSectionList = () => {
  const { categories, categoriesLoading } = useData();

  if (categoriesLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 lg:px-0 py-12 mt-[50px]">
        <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold mb-8">
          Order.uk Popular Categories 🤩
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 h-[170px] rounded-t-xl"></div>

              <div className="bg-gray-300 h-[60px] rounded-b-xl mt-1"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

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