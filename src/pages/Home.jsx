import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import CardSkelton from "../components/CardSkelton";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(foods);
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

          <div className="text-[10px] font-bold text-neutral-400 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-200/40 w-fit select-none uppercase tracking-wider">
            🟢 Kitchen is open • Fast delivery
          </div>
        </div>
      </header>

      {/*  MAIN GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          /*SKELETON LOADING STATE */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <CardSkelton key={index} />
            ))}
          </div>
        ) : foods.length === 0 ? (
          /*  EMPTY STATE */
          <div className="text-center py-16 premium-card max-w-sm mx-auto p-6">
            <h3 className="text-base font-semibold text-neutral-800">
              No foods available
            </h3>
            <p className="text-neutral-500 text-xs mt-1">
              Check back later for fresh meals!
            </p>
          </div>
        ) : (
          /* 🍔 FOOD ITEMS MENU LIST */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {foods.map((food) => (
              <div
                key={food._id}
                className="premium-card flex flex-col overflow-hidden group"
              >
                {/* Food Image Wrapper */}
                <div className="w-full h-44 bg-neutral-100 overflow-hidden relative border-b border-neutral-100">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="badge-minimal bg-white/90 backdrop-blur-xs shadow-xs">
                      {food.category}
                    </span>
                  </div>
                </div>

                {/* Food Content Details */}
                <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 tracking-tight line-clamp-1">
                      {food.name}
                    </h3>
                    <p className="text-neutral-500 text-xs mt-1 line-clamp-2 leading-relaxed">
                      {food.description}
                    </p>
                  </div>

                  {/* Price & Action Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                    <span className="text-lg font-mono font-bold text-neutral-900">
                      ${Number(food.price).toFixed(2)}
                    </span>

                    <button
                      onClick={() => handleAddToCart(food)}
                      className="btn-primary text-xs !py-2 !px-3.5 active:scale-95"
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
