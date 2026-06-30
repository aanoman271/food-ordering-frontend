import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import DashboardSkeleton from "../components/DashboardSkeleton";

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
      toast.error("Failed to delete food");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] py-2">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      {/* Left Side Content: Stats Component Container */}
      <div className="hidden lg:block">
        <div className="premium-card p-6">
          <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-5">
            Quick Actions & Stats
          </h3>

          {/* Total Items Data Window */}
          <div className="bg-neutral-50/60 border border-neutral-200/60 rounded-xl p-5">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Total Foods
            </p>
            <p className="text-5xl font-black text-neutral-900 mt-1 tracking-tight">
              {foods.length}
            </p>
            <p className="text-[11px] text-neutral-400 mt-3">
              Live ledger database count
            </p>
          </div>
        </div>
      </div>

      {/* Right Main Content: Food Inventory Table Layout */}
      <div className="lg:col-span-3 premium-card p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            Food Inventory
          </h2>
        </div>

        {foods.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-neutral-200 rounded-xl">
            <p className="text-xs font-medium text-neutral-400">
              No items registered in the database.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/80 border-b border-neutral-200 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  <th className="p-4 rounded-l-xl">Food Item</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {foods.map((food) => (
                  <tr
                    key={food._id}
                    className="hover:bg-neutral-50/40 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={food.image}
                          alt={food.name}
                          className="w-12 h-12 rounded-xl object-cover border border-neutral-100"
                        />
                        <span className="font-bold text-sm text-neutral-900">
                          {food.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="badge-minimal">{food.category}</span>
                    </td>
                    <td className="p-4 font-mono text-sm font-bold text-neutral-900">
                      ${Number(food.price).toFixed(2)}
                    </td>
                    <td className="p-4 text-right">
                      {/* Integrated high precision minimal button architecture */}
                      <button
                        onClick={() => handleDelete(food._id)}
                        className="btn-destructive text-xs"
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
