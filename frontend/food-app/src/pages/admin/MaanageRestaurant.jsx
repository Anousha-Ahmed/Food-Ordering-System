import { useEffect, useState } from "react";
import { API, BASE_URL } from "../../api/endpoints";
import { toast } from "react-toastify";

const emptyForm = {
  name: "",
  description: "",
  address: "",
  image: null,
  is_featured: false,
  is_active: true,
};

const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const response = await fetch(API.ALL_RESTAURANT);
      const data = await response.json();

      if (response.ok) {
        setRestaurants(data.data || []);
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to load restaurants");
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImage = (e) => {
    setForm({
      ...form,
      image: e.target.files[0],
    });
  };

  const saveRestaurant = async () => {
    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("address", form.address);
      formData.append("is_featured", form.is_featured);
      formData.append("is_active", form.is_active);

      if (form.image) {
        formData.append("image", form.image);
      }

      const response = await fetch(
        editingId ? API.UPDATE_RESTAURANT(editingId) : API.CREATE_RESTAURANT,
        {
          method: editingId ? "PATCH" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(editingId ? "Restaurant Updated" : "Restaurant Added");

        setEditingId(null);
        setForm(emptyForm);
        loadRestaurants();
      } else {
        toast.error(data.error || "Error");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server Error");
    }
  };

  const editRestaurant = (restaurant) => {
    setEditingId(restaurant.id);

    setForm({
      name: restaurant.name,
      description: restaurant.description,
      address: restaurant.address,
      image: null,
      is_featured: restaurant.is_featured,
      is_active: restaurant.is_active,
    });
  };

  const deleteRestaurant = async (id) => {
    if (!window.confirm("Delete Restaurant?")) return;

    try {
      const response = await fetch(API.DELETE_RESTAURANT(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Restaurant Deleted");
        loadRestaurants();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-3 sm:p-5 lg:p-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
        Manage Restaurants
      </h1>

      {/* FORM */}

      <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <input
            type="text"
            name="name"
            placeholder="Restaurant Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
          />

          <textarea
            rows={4}
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border rounded-lg p-3 lg:col-span-2 w-full"
          />

          <input
            type="file"
            onChange={handleImage}
            className="border rounded-lg p-3"
          />

          <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_featured"
                checked={form.is_featured}
                onChange={handleChange}
              />
              Featured
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_active"
                checked={form.is_active}
                onChange={handleChange}
              />
              Active
            </label>
          </div>
        </div>

        <button
          onClick={saveRestaurant}
          className="mt-6 bg-[#FC8A06] text-white rounded-lg px-6 py-3 w-full sm:w-auto"
        >
          {editingId ? "Update Restaurant" : "Add Restaurant"}
        </button>
      </div>

      {/* =================== Desktop Table =================== */}

      <div className="hidden lg:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#FC8A06] text-white">
            <tr>
              <th className="py-4">Image</th>
              <th>Name</th>
              <th>Address</th>
              <th>Featured</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {restaurants
              .sort((a, b) => a.id - b.id)
              .map((restaurant) => (
                <tr key={restaurant.id} className="border-b">
                  <td className="py-3 flex justify-center">
                    {restaurant.image ? (
                      <img
                        src={`${BASE_URL}${restaurant.image}`}
                        alt=""
                        className="w-20 h-16 rounded object-cover"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td className="text-center">{restaurant.name}</td>

                  <td className="text-center">{restaurant.address}</td>

                  <td className="text-center">
                    {restaurant.is_featured ? "Yes" : "No"}
                  </td>

                  <td className="text-center">
                    {restaurant.is_active ? "Active" : "Inactive"}
                  </td>

                  <td className="text-center">
                    <button
                      onClick={() => editRestaurant(restaurant)}
                      className="bg-blue-500 text-white px-3 py-2 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteRestaurant(restaurant.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* =================== Mobile Cards =================== */}

      <div className="lg:hidden space-y-5">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white rounded-xl shadow p-4">
            {restaurant.image && (
              <img
                src={`${BASE_URL}${restaurant.image}`}
                alt=""
                className="w-full h-48 rounded-lg object-cover mb-4"
              />
            )}

            <h2 className="text-xl font-bold">{restaurant.name}</h2>

            <p className="text-gray-500 mt-2">{restaurant.address}</p>

            <div className="mt-3 space-y-2">
              <p>
                <b>Featured:</b> {restaurant.is_featured ? "Yes" : "No"}
              </p>

              <p>
                <b>Status:</b> {restaurant.is_active ? "Active" : "Inactive"}
              </p>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => editRestaurant(restaurant)}
                className="flex-1 bg-blue-500 text-white py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteRestaurant(restaurant.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRestaurants;
