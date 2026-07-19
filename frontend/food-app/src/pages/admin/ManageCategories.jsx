import { useState } from "react";
import { API } from "../../api/endpoints";
import { toast } from "react-toastify";
import { useData } from "../../context/DataContext";

const emptyForm = {
  name: "",
};

const ManageCategories = () => {
  const { categories, categoriesLoading, refreshData } = useData();
  
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveCategory = async () => {
    if (!form.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setLoading(true);

    try {
      const url = editingId
        ? API.UPDATE_CATEGORY(editingId)
        : API.CREATE_CATEGORY;

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
        toast.success(editingId ? "Category Updated" : "Category Created");
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

  const editCategory = (category) => {
    setEditingId(category.id);
    setForm({
      name: category.name,
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete Category?")) return;

    try {
      const response = await fetch(API.DELETE_CATEGORY(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Category Deleted");
        refreshData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Loading State
  if (categoriesLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FC8A06]"></div>
          <p className="mt-6 text-gray-600 text-lg font-medium">
            Loading Categories...
          </p>
          <p className="text-gray-400 text-sm">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
        Manage Categories
        <span className="text-sm font-normal text-gray-500 ml-3">
          ({categories.length})
        </span>
      </h1>

      {/* FORM */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={form.name}
            onChange={handleChange}
            className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
          />

          <button
            onClick={saveCategory}
            disabled={loading}
            className="w-full sm:w-auto bg-[#FC8A06] hover:bg-orange-600 transition text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                Saving...
              </>
            ) : (
              editingId ? "Update Category" : "Add Category"
            )}
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead className="bg-[#FC8A06] text-white">
            <tr>
              <th className="py-3 px-3 text-center text-sm">ID</th>
              <th className="py-3 px-3 text-left text-sm">Category Name</th>
              <th className="py-3 px-3 text-center text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-10 text-gray-500">
                  No categories found
                </td>
              </tr>
            ) : (
              categories
                .sort((a, b) => a.id - b.id)
                .map((category) => (
                  <tr key={category.id} className="border-b hover:bg-gray-50 transition">
                    <td className="text-center py-3 px-3 text-sm">{category.id}</td>
                    <td className="py-3 px-3">{category.name}</td>
                    <td className="py-3 px-3">
                      <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                        <button
                          onClick={() => editCategory(category)}
                          className="w-20 sm:w-24 bg-blue-500 hover:bg-blue-600 transition text-white py-2 rounded-lg text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCategory(category.id)}
                          className="w-20 sm:w-24 bg-red-500 hover:bg-red-600 transition text-white py-2 rounded-lg text-sm"
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

export default ManageCategories;