import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const initialForm = {
  name: "",
  price: "",
  category: "",
  image: "",
  description: "",
};

const AddNewFood = () => {
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axiosInstance.post("/foods", formData);
      setFormData(initialForm);
      toast.success("Food item added safely.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Main Content Card Layout */}
      <div className="premium-card p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            Add New Food Entry
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Item Name Input Field */}
          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Food Title
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Artisan Sourdough"
              className="ledger-input"
              required
            />
          </div>

          {/* Pricing and Categorization Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Price ($)
              </label>
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number"
                min="1"
                step="0.01"
                placeholder="12.50"
                className="ledger-input"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Category
              </label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                type="text"
                placeholder="Bakery"
                className="ledger-input"
                required
              />
            </div>
          </div>

          {/* Media Location Source Asset Input */}
          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Image URL
            </label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              type="text"
              placeholder="https://images.unsplash.com/..."
              className="ledger-input"
              required
            />
          </div>

          {/* Longform Text Description Input Area */}
          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter comprehensive item details..."
              className="ledger-input resize-none"
              required
            />
          </div>

          {/* Form Action Controls and Submission Pipeline */}
          <div className="flex justify-end pt-2">
            <button
              disabled={submitting}
              className="btn-primary w-full sm:w-auto px-8 py-3 disabled:opacity-30 disabled:pointer-events-none"
            >
              {submitting ? "Processing..." : "Commit Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewFood;
