import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    try {
      const res = await axiosInstance.get("/foods");
      setFoods(res.data);
    } catch (err) {
      toast.error("Failed to fetch inventory");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?",
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/foods/${id}`);
      setFoods((prev) => prev.filter((food) => food._id !== id));
      toast.success("Food deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete food", err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-sm font-mono text-[#a3a39e] tracking-widest">
        LOADING_LEDGER_DATA...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      {/* LEFT SIDE CONTENT: Mobile এ এটি সম্পূর্ণ লুকিয়ে (hidden) থাকবে */}
      <div className="hidden lg:block space-y-6">
        <div className="bg-[#fcfcfb] border border-[#e5e5e0] rounded-2xl p-6 shadow-sm">
          <h3 className="text-md font-semibold text-[#1a1a1a] mb-5 tracking-tight">
            Quick Actions & Stats
          </h3>

          {/* Total Foods Card */}
          <div className="bg-white border border-[#e5e5e0] rounded-xl p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <p className="text-xs font-mono text-[#a3a39e] uppercase tracking-wider">
              Total Foods
            </p>
            <p className="text-5xl font-bold text-[#1a1a1a] mt-2 tracking-tight">
              {foods.length}
            </p>
            <p className="text-[11px] text-[#73736d] mt-3">
              Live ledger database count
            </p>
          </div>

          {/* Recent Orders Stub */}
          <div className="bg-white border border-[#e5e5e0] rounded-xl p-5 mb-4">
            <p className="text-xs font-mono text-[#a3a39e] uppercase tracking-wider mb-3">
              Recent Logs
            </p>
            <div className="space-y-2 text-xs font-mono text-[#73736d]">
              <p>#101 - Update Success</p>
              <p>#102 - Index Refreshed</p>
              <p>#103 - Connection Secure</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT MAIN CONTENT: এটি ফুল উইথ নিবে মোবাইলে */}
      <div className="lg:col-span-3 bg-white border border-[#e5e5e0] rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-[#1a1a1a]">
            Food Inventory
          </h2>
        </div>

        {foods.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#e5e5e0] rounded-xl">
            <p className="text-sm text-[#a3a39e]">
              No items registered in the database.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fcfcfb] border border-[#e5e5e0] text-xs font-mono uppercase tracking-wider text-[#73736d]">
                  <th className="p-4 rounded-l-xl">Food (Icon & Name)</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e5e0]/60">
                {foods.map((food) => (
                  <tr
                    key={food._id}
                    className="hover:bg-[#fafafa]/80 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={food.image}
                          alt={food.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[#e5e5e0]"
                        />
                        <span className="font-medium text-sm text-[#1a1a1a]">
                          {food.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2.5 py-1 text-[11px] font-mono bg-[#f4f4f3] text-[#52524e] rounded-md border border-[#e5e5e0]/40">
                        {food.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-sm font-semibold text-[#1a1a1a]">
                      ${Number(food.price).toFixed(2)}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(food._id)}
                        className="text-xs font-medium  hover:text-[#a3a39e]     text-red-600 hover:bg-[#a3a39e]/60 px-3 py-1.5 rounded-lg border border-transparent hover:border-[#a3a39e] transition-all cursor-pointer"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
