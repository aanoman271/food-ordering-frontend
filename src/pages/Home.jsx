import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import Loadding from "../components/Loadding";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/foods")
      .then((res) => {
        setFoods(res.data);
      })
      .catch((err) => {
        toast.error("Failed to load foods");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (food) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = currentCart.find((item) => item.food._id === food._id);

    if (exist) {
      exist.quantity += 1;
    } else {
      currentCart.push({ food, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    toast.success(`${food.name} added to cart!`);
  };

  if (loading) {
    return <Loadding />;
  }

  return (
    <div className="min-h-screen">
      {/* 🍃 COMPACT MINIMAL HERO */}
      <header className="bg-white border-b border-neutral-200/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Delicious Food Menu
            </h1>
            <p className="text-neutral-500 text-sm mt-1">
              Choose your favorite meals and order instantly.
            </p>
          </div>

          {/* একটা সিম্পল স্ট্যাটাস বা ফিল্টার এরিয়া পরে চাইলে বসাতে পারেন */}
          <div className="text-xs font-medium text-neutral-400 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-200/40 w-fit">
            🟢 Kitchen is open • Fast delivery
          </div>
        </div>
      </header>

      {/* 🛒 MAIN GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {foods.length === 0 ? (
          <div className="text-center py-16 premium-card max-w-sm mx-auto">
            <h3 className="text-base font-semibold text-neutral-800">
              No foods available
            </h3>
            <p className="text-neutral-500 text-xs mt-1">
              Check back later for fresh meals!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {foods.map((food) => (
              <div
                key={food._id}
                className="premium-card flex flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="w-full h-44 bg-neutral-100 overflow-hidden relative">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="badge-minimal shadow-sm bg-white/90 backdrop-blur-xs">
                      {food.category}
                    </span>
                  </div>
                </div>

                {/* Info & Action */}
                <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-neutral-800 line-clamp-1">
                      {food.name}
                    </h3>
                    <p className="text-neutral-500 text-xs mt-1 line-clamp-2 leading-relaxed">
                      {food.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                    <span className="text-lg font-extrabold text-neutral-900">
                      ${food.price}
                    </span>

                    <button
                      onClick={() => handleAddToCart(food)}
                      className="btn-primary text-xs"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
