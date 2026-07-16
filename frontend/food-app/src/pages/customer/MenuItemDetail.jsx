import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API, BASE_URL } from "../../api/endpoints";

const MenuItemDetail = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(API.MENUITEM_DETAIL(id))
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data);
      });
  }, [id]);

  if (!item) return <h1>Loading...</h1>;

  return (
    <div className="max-w-6xl mx-auto py-20">
      <img src={`${BASE_URL}${item.image}`} className="w-80 rounded-xl" />

      <h1 className="text-5xl font-bold mt-8">{item.name}</h1>

      <p className="mt-5">{item.description}</p>

      <h2 className="text-2xl font-bold mt-5">GBP {item.price}</h2>

      <p className="mt-5">Restaurant :{item.restaurant.name}</p>

      <p>Category :{item.category.name}</p>
    </div>
  );
};

export default MenuItemDetail;
