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
    <div className="mx-auto">
      {/* Side Content Hidden on Mobile
      <div className="hidden lg:block">
        <div className="bg-[#fcfcfb] border border-[#e5e5e0] rounded-2xl p-6 text-xs text-[#73736d] space-y-3 font-mono">
          <p className="font-bold text-[#1a1a1a] text-sm mb-2 font-sans">
            Guidelines
          </p>
          <p>• Prices must be in USD format.</p>
          <p>• Ensure image links are high-res direct URLs.</p>
          <p>• Categorize properly for ledger audit.</p>
        </div>
      </div> */}

      {/* Main Form Area */}
      <div className="lg:col-span-3 bg-white border border-[#e5e5e0] rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-[#1a1a1a]">
            Add New Food Entry
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-[#a3a39e] uppercase tracking-wider mb-2">
              Food Title
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Artisan Sourdough"
              className="w-full bg-[#fcfcfb] border border-[#e5e5e0] rounded-xl p-3 text-sm outline-none focus:border-[#1a1a1a] focus:bg-white transition-all shadow-[inner_0_1px_2px_rgba(0,0,0,0.01)]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#a3a39e] uppercase tracking-wider mb-2">
                Price ($)
              </label>
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number"
                min="1"
                placeholder="12.50"
                className="w-full bg-[#fcfcfb] border border-[#e5e5e0] rounded-xl p-3 text-sm outline-none focus:border-[#1a1a1a] focus:bg-white transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#a3a39e] uppercase tracking-wider mb-2">
                Category
              </label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                type="text"
                placeholder="Bakery"
                className="w-full bg-[#fcfcfb] border border-[#e5e5e0] rounded-xl p-3 text-sm outline-none focus:border-[#1a1a1a] focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#a3a39e] uppercase tracking-wider mb-2">
              Image URL
            </label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              type="text"
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#fcfcfb] border border-[#e5e5e0] rounded-xl p-3 text-sm outline-none focus:border-[#1a1a1a] focus:bg-white transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#a3a39e] uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter comprehensive item details..."
              className="w-full bg-[#fcfcfb] border border-[#e5e5e0] rounded-xl p-3 text-sm outline-none focus:border-[#1a1a1a] focus:bg-white transition-all resize-none"
              required
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              disabled={submitting}
              className="w-full sm:w-auto bg-[#1a1a1a] text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-[#333333] active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
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
