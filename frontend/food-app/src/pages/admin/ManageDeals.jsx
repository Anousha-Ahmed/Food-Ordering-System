import { useState } from "react";
import { API, BASE_URL } from "../../api/endpoints";
import { toast } from "react-toastify";
import { useData } from "../../context/DataContext";
import Loader from "../../components/common/Loader";

const emptyForm = {
  restaurant_id: "",
  name: "",
  description: "",
  combo_price: "",
  image: null,
  is_active: true,
  is_featured: false,
};

const ManageDeals = () => {
  const { deals, dealsLoading, restaurants, refreshData } = useData();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImage = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const saveDeal = async () => {
    if (!form.restaurant_id || !form.name.trim() || !form.combo_price) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("restaurant_id", form.restaurant_id);
      formData.append("name", form.name);
      formData.append("description", form.description || "");
      formData.append("combo_price", form.combo_price);
      formData.append("is_active", form.is_active);
      formData.append("is_featured", form.is_featured);
      if (form.image) formData.append("image", form.image);

      const response = await fetch(
        editingId ? API.UPDATE_DEAL(editingId) : API.CREATE_DEAL,
        {
          method: editingId ? "PATCH" : "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(editingId ? "Deal Updated" : "Deal Created");
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
      setLoading(false);
    }
  };

  const editDeal = (deal) => {
    setEditingId(deal.id);
    setForm({
      restaurant_id: deal.restaurant_id,
      name: deal.name,
      description: deal.description || "",
      combo_price: deal.combo_price,
      image: null,
      is_active: deal.is_active,
      is_featured: deal.is_featured,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteDeal = async (id) => {
    if (!window.confirm("Delete Deal?")) return;
    try {
      const response = await fetch(API.DELETE_DEAL(id), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success("Deal Deleted");
        refreshData();
      } else {
        toast.error("Unable to delete");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server Error");
    }
  };

  // ✅ Loader
  if (dealsLoading) {
    return <Loader />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
        Manage Deals
        <span className="text-sm font-normal text-gray-500 ml-3">
          ({deals.length})
        </span>
      </h1>

      <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <select
            name="restaurant_id"
            value={form.restaurant_id}
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
          <input
            type="text"
            name="name"
            placeholder="Deal Name *"
            value={form.name}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
          />
          <input
            type="number"
            step="0.01"
            name="combo_price"
            placeholder="Combo Price *"
            value={form.combo_price}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
          />
          <input
            type="file"
            onChange={handleImage}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#FC8A06] file:text-white hover:file:bg-orange-600"
          />
          <textarea
            rows={3}
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border rounded-lg p-3 col-span-1 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
          />
          <div className="flex flex-wrap gap-4 sm:gap-8 col-span-1 sm:col-span-2">
            <label className="flex gap-2 items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                checked={form.is_featured}
                onChange={handleChange}
                className="w-4 h-4 accent-[#FC8A06]"
              />
              <span className="text-sm sm:text-base">Featured</span>
            </label>
            <label className="flex gap-2 items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_active"
                checked={form.is_active}
                onChange={handleChange}
                className="w-4 h-4 accent-[#FC8A06]"
              />
              <span className="text-sm sm:text-base">Active</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={saveDeal}
            disabled={loading}
            className="w-full sm:w-auto bg-[#FC8A06] hover:bg-orange-600 transition text-white px-8 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
            ) : null}
            {loading ? "Saving..." : editingId ? "Update Deal" : "Create Deal"}
          </button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 transition text-white px-6 py-3 rounded-lg font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-[#FC8A06] text-white">
            <tr>
              <th className="py-3 px-3 text-center text-sm">Image</th>
              <th className="py-3 px-3 text-left text-sm">Name</th>
              <th className="py-3 px-3 text-center text-sm">Price</th>
              <th className="py-3 px-3 text-center text-sm">Featured</th>
              <th className="py-3 px-3 text-center text-sm">Status</th>
              <th className="py-3 px-3 text-center text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No deals found
                </td>
              </tr>
            ) : (
              deals.map((deal) => (
                <tr
                  key={deal.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-3 text-center">
                    {deal.image ? (
                      <img
                        src={`${BASE_URL}${deal.image}`}
                        className="w-16 h-14 mx-auto rounded object-cover"
                        alt=""
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-medium">{deal.name}</td>
                  <td className="py-3 px-3 text-center font-semibold text-[#FC8A06]">
                    £{deal.combo_price}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {deal.is_featured ? (
                      <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs">
                        Yes
                      </span>
                    ) : (
                      <span className="bg-gray-300 text-gray-600 px-2 py-1 rounded-full text-xs">
                        No
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {deal.is_active ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => editDeal(deal)}
                      className="bg-blue-500 hover:bg-blue-600 transition text-white px-3 py-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteDeal(deal.id)}
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
    </div>
  );
};

export default ManageDeals;
