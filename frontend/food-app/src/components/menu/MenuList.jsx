import React from "react";
import MenuCard from "./MenuCard";
import { toast } from "react-toastify";
import { API, BASE_URL } from "../../api/endpoints";

//Discount
import FirstOrderDiscount from "../../assets/RestaurantDetailImg/FirstOrderDiscount.png";
import VeganDiscount from "../../assets/RestaurantDetailImg/VeganDiscount.png";
import IceCreamOffer from "../../assets/RestaurantDetailImg/IceCreamOffer.png";

const Discount = [
  {
    id: 1,
    type: "discount",
    image: FirstOrderDiscount,
  },
  {
    id: 2,
    type: "discount",
    image: VeganDiscount,
  },
  {
    id: 3,
    type: "discount",
    image: IceCreamOffer,
  },
];

const MenuList = ({ menuItems }) => {
  console.log("Menu Items:", menuItems);

  if (!menuItems || menuItems.length === 0) {
    return (
      <h1 className="text-center mt-[30px] sm:mt-[50px] text-xl sm:text-2xl px-4">
        No Menu Items Found
      </h1>
    );
  }

  const categories = [...new Set(menuItems.map((item) => item.category?.name))];

  const handleAddToCart = async (item) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const response = await fetch(API.CART_ADD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          menu_item_id: item.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Added to cart");
      } else {
        toast.error(data.error || "Unable to add to cart");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {/* Discount */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {Discount.map((item) => (
            <MenuCard key={item.id} type="discount" image={item.image} />
          ))}
        </div>
      </section>

      {categories.map((category) => {
        const items = menuItems.filter(
          (item) => item.category?.name === category
        );

        return (
          <section key={category} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#FC8A06] font-bold mb-4 sm:mb-6 md:mb-8">
              {category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {items.map((item) => (
                <MenuCard
                  key={item.id}
                  id={item.id}
                  type={category.toLowerCase()}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={`${BASE_URL}${item.image}`}
                  onAddToCart={() => handleAddToCart(item)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
};

export default MenuList;