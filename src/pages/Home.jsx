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
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Delicious Food Menu
        </h1>
        <p className="text-gray-600 mt-2">
          Choose your favorite meals and order instantly
        </p>
      </header>

      {foods.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No foods available right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded-full uppercase">
                    {food.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mt-2">
                    {food.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {food.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ${food.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(food)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
