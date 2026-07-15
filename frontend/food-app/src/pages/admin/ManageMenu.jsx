import { useEffect, useState } from "react";
import { API } from "../../api/endpoints";
import { toast } from "react-toastify";

const emptyForm = {
  name: "",
  price: "",
  description: "",
  restaurant: "",
  category: "",
};

const ManageMenu = () => {
  const [menu, setMenu] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMenu();
    loadRestaurants();
    loadCategories();
  }, []);

  const token = localStorage.getItem("accessToken");

  //  MENU 

  const loadMenu = async () => {
    try {
      const res = await fetch(API.ALL_MENUITEM);
      const data = await res.json();
      setMenu(data.data || data || []);
    } catch (err) {
      console.log(err);
      toast.error("Unable to load menu");
    }
  };

  //  RESTAURANTS 

  const loadRestaurants = async () => {
    try {
      const res = await fetch(API.ALL_RESTAURANT);
      const data = await res.json();
      setRestaurants(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  //  CATEGORIES 

  const loadCategories = async () => {
    try {
      const res = await fetch(API.ALL_CATEGORY);
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  //  INPUT 

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //  SAVE 

  const saveMenu = async () => {
    if (
      !form.name.trim() ||
      !form.price ||
      !form.restaurant ||
      !form.category
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const url = editingId ? API.UPDATE_MENU(editingId) : API.CREATE_MENU;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(editingId ? "Menu Updated" : "Menu Created");
        setEditingId(null);
        setForm(emptyForm);
        loadMenu();
      } else {
        toast.error(data.error || "Error");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  //  EDIT 

  const editMenu = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description || "",
      price: item.price,
      restaurant: item.restaurant?.id || "",
      category: item.category?.id || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //  DELETE 

  const deleteMenu = async (id) => {
    if (!window.confirm("Delete Menu Item?")) return;

    try {
      const response = await fetch(API.DELETE_MENU(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Menu Deleted");
        loadMenu();
      } else {
        toast.error("Unable to delete");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server Error");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
        Manage Menu
      </h1>

      {/*  FORM  */}

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <input
            placeholder="Menu Name *"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
          />

          <input
            placeholder="Price *"
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
          />

          <textarea
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border p-3 rounded-lg col-span-1 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
            rows="3"
          />

          <select
            name="restaurant"
            value={form.restaurant}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
          >
            <option value="">Select Restaurant *</option>
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
          >
            <option value="">Select Category *</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={saveMenu}
          disabled={loading}
          className="w-full sm:w-auto mt-4 bg-[#FC8A06] hover:bg-orange-600 transition text-white px-8 py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? "Saving..." : editingId ? "Update Menu" : "Add Menu"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setForm(emptyForm);
            }}
            className="ml-0 sm:ml-3 mt-3 sm:mt-4 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium w-full sm:w-auto"
          >
            Cancel
          </button>
        )}
      </div>

      {/*  TABLE  */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-[#FC8A06] text-white">
            <tr>
              <th className="py-3 px-3 text-left text-sm">Name</th>
              <th className="py-3 px-3 text-left text-sm">Restaurant</th>
              <th className="py-3 px-3 text-left text-sm">Category</th>
              <th className="py-3 px-3 text-center text-sm">Price</th>
              <th className="py-3 px-3 text-center text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {menu.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No menu items found
                </td>
              </tr>
            ) : (
              menu.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-3 font-medium">{item.name}</td>
                  <td className="py-3 px-3">{item.restaurant?.name || "-"}</td>
                  <td className="py-3 px-3">{item.category?.name || "-"}</td>
                  <td className="py-3 px-3 text-center font-semibold text-[#FC8A06]">
                    £{item.price}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                      <button
                        onClick={() => editMenu(item)}
                        className="w-20 sm:w-24 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMenu(item.id)}
                        className="w-20 sm:w-24 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMenu;
