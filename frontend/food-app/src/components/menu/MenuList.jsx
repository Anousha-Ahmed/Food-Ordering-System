import React from "react";
import MenuCard from "./MenuCard";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/slices/cartSlice";
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
  // const dispatch = useDispatch();
  if (!menuItems || menuItems.length === 0) {
    return (
      <h1 className="text-center mt-[50px] text-2xl">No Menu Items Found</h1>
    );
  }

  const categories = [...new Set(menuItems.map((item) => item.category?.name))];

  const handleAddToCart = async (item) => {
    alert("Function called");

    const token = localStorage.getItem("accessToken");
    console.log(API.CART_ADD);
    console.log(token);
    console.log(item.id);

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

      console.log("STATUS:", response.status);
      console.log("RESPONSE:", data);

      if (response.ok) {
        toast.success("Added");
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {/* Discount */}

      <section className="max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-3 gap-6">
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
          <section key={category} className="max-w-7xl mx-auto py-10">
            <h2 className="text-4xl text-[#FC8A06] font-bold mb-8">
              {category}
            </h2>

            <div className="grid grid-cols-3 gap-6">
              {items.map((item) => {
                console.log("Rendering:", item);

                return (
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
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
};
export default MenuList;
