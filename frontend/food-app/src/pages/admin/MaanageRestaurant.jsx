import { useState } from "react";
import { API, BASE_URL } from "../../api/endpoints";
import { toast } from "react-toastify";
import { useData } from "../../context/DataContext";

const emptyForm = {
  name: "",
  description: "",
  address: "",
  image: null,
  is_featured: false,
  is_active: true,
};

const ManageRestaurants = () => {
  const { restaurants, restaurantsLoading, refreshData } = useData();
  
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("accessToken");

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
    setSaving(true);
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
        refreshData();
      } else {
        toast.error(data.error || "Error");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server Error");
    } finally {
      setSaving(false);
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
        refreshData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Loading State - Jab tak data load ho raha ho
  if (restaurantsLoading) {
    return (
      <div className="p-4 sm:p-5 lg:p-8">
        <div className="flex flex-col justify-center items-center h-96">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FC8A06]"></div>
          <p className="mt-6 text-gray-600 text-lg font-medium">
            Loading Restaurants...
          </p>
          <p className="text-gray-400 text-sm">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-5 lg:p-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
        Manage Restaurants
        <span className="text-sm font-normal text-gray-500 ml-3">
          ({restaurants.length})
        </span>
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
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
          />

          <textarea
            rows={4}
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border rounded-lg p-3 lg:col-span-2 w-full focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
          />

          <input
            type="file"
            onChange={handleImage}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
          />

          <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                checked={form.is_featured}
                onChange={handleChange}
                className="w-4 h-4 accent-[#FC8A06]"
              />
              Featured
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_active"
                checked={form.is_active}
                onChange={handleChange}
                className="w-4 h-4 accent-[#FC8A06]"
              />
              Active
            </label>
          </div>
        </div>

        <button
          onClick={saveRestaurant}
          disabled={saving}
          className="mt-6 bg-[#FC8A06] hover:bg-orange-600 transition text-white rounded-lg px-6 py-3 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
              {editingId ? "Updating..." : "Adding..."}
            </>
          ) : (
            editingId ? "Update Restaurant" : "Add Restaurant"
          )}
        </button>
      </div>

      {/* TABLE */}
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
            {restaurants.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No restaurants found
                </td>
              </tr>
            ) : (
              restaurants
                .sort((a, b) => a.id - b.id)
                .map((restaurant) => (
                  <tr key={restaurant.id} className="border-b hover:bg-gray-50 transition">
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
                        className="bg-blue-500 hover:bg-blue-600 transition text-white px-3 py-2 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteRestaurant(restaurant.id)}
                        className="bg-red-500 hover:bg-red-600 transition text-white px-3 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
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
                className="flex-1 bg-blue-500 hover:bg-blue-600 transition text-white py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteRestaurant(restaurant.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 transition text-white py-2 rounded"
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