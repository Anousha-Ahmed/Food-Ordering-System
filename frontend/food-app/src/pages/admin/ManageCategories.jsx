import { useEffect, useState } from "react";
import { API } from "../../api/endpoints";
import { toast } from "react-toastify";

const emptyForm = {
  name: "",
};

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    loadCategories();
  }, []);

  // ---------------- LOAD ----------------

  const loadCategories = async () => {
    try {
      const response = await fetch(API.ALL_CATEGORY);
      const data = await response.json();

      if (response.ok) {
        setCategories(data.data || []);
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to load categories");
    }
  };

  // ---------------- INPUT ----------------

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- SAVE ----------------

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
        toast.success(
          editingId ? "Category Updated" : "Category Created"
        );

        setEditingId(null);
        setForm(emptyForm);
        loadCategories();
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

  // ---------------- EDIT ----------------

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

  // ---------------- DELETE ----------------

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
        loadCategories();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Heading */}

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
        Manage Categories
      </h1>

      {/* ================= FORM ================= */}

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
            className="w-full sm:w-auto bg-[#FC8A06] hover:bg-orange-600 transition text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? "Saving..." : (editingId ? "Update Category" : "Add Category")}
          </button>

        </div>

      </div>

      {/* ================= TABLE ================= */}

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

        <table className="w-full min-w-[400px]">

          <thead className="bg-[#FC8A06] text-white">

            <tr>

              <th className="py-3 px-3 text-center text-sm">
                ID
              </th>

              <th className="py-3 px-3 text-left text-sm">
                Category Name
              </th>

              <th className="py-3 px-3 text-center text-sm">
                Actions
              </th>

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

                  <tr
                    key={category.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="text-center py-3 px-3 text-sm">
                      {category.id}
                    </td>

                    <td className="py-3 px-3">
                      {category.name}
                    </td>

                    <td className="py-3 px-3">

                      <div className="flex flex-col sm:flex-row justify-center items-center gap-2">

                        <button
                          onClick={() => editCategory(category)}
                          className="w-20 sm:w-24 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition text-sm"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteCategory(category.id)}
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

export default ManageCategories;