import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API, BASE_URL } from "../../api/endpoints";

const MenuItemDetail = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(API.MENUITEM_DETAIL(id));
        const data = await res.json();

        setItem(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold">Loading Menu Item...</h1>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-red-500">
          Menu Item Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <img
        src={`${BASE_URL}${item.image}`}
        alt={item.name}
        className="w-80 h-80 object-cover rounded-xl"
      />

      <h1 className="text-5xl font-bold mt-8">
        {item.name}
      </h1>

      <p className="mt-5 text-gray-600">
        {item.description}
      </p>

      <h2 className="text-2xl font-bold text-[#FC8A06] mt-5">
        £ {item.price}
      </h2>

      <p className="mt-5">
        <span className="font-semibold">Restaurant:</span>{" "}
        {item.restaurant?.name}
      </p>

      <p className="mt-2">
        <span className="font-semibold">Category:</span>{" "}
        {item.category?.name}
      </p>
    </div>
  );
};

export default MenuItemDetail;