import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../provider/authContext";
import axiosInstance from "../utils/axiosInstance";

const Card = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.food.price * item.quantity,
    0,
  );

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      return toast.error("Minimum quantity is 1");
    } else {
      const updated = cartItems.map((item) =>
        item.food._id === id ? { ...item, quantity: newQty } : item,
      );
      setCartItems(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.food._id !== id);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success("Item removed from cart");
  };
  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to place an order");
      return navigate("/login");
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          food: item.food._id,
          quantity: item.quantity,
        })),
        totalAmount,
      };

      const res = await axiosInstance.post("/orders", orderData);
      const { payhereOrderId } = res.data.order;

      toast.success("Order initiated! Redirecting to PayHere...");

      // React Compiler-এর জন্য সেফ অবজেক্ট ম্যাপিং
      const params = {
        merchant_id: "1234567",
        return_url: "http://localhost:5173/payment-success",
        cancel_url: "http://localhost:5173/payment-cancel",
        notify_url: "https://your-localtunnel-url.loca.lt/api/payment/notify", // আপনার Webhook URL
        order_id: payhereOrderId,
        items: "Food Order",
        amount: totalAmount.toString(), // টাইপ সেফটি নিশ্চিত করতে স্ট্রিং করা হলো
        currency: "LKR",
        first_name: user.name,
        last_name: "Customer",
        email: user.email,
        phone: user.phone || "01700000000",
        address: "Dhaka, Bangladesh",
        city: "Dhaka",
        country: "Bangladesh",
      };

      const payhereForm = document.createElement("form");
      payhereForm.method = "POST";
      payhereForm.action = "https://hip-paths-brake.loca.lt/api/payment/notify";

      Object.entries(params).forEach(([key, value]) => {
        const hiddenField = document.createElement("input");
        hiddenField.type = "hidden";
        hiddenField.name = key;
        hiddenField.value = value;
        payhereForm.appendChild(hiddenField);
      });

      document.body.appendChild(payhereForm);
      payhereForm.submit();

      // ক্লিনআপ এবং স্টেট আপডেট
      localStorage.removeItem("cart");
      setCartItems([]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout failed");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-white shadow-lg rounded-xl mt-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-lg">
          Your cart is empty. Go add some food!
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.food._id}
                className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.food.image}
                    alt={item.food.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.food.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      ${item.food.price} each
                    </p>

                    <p className="mt-2 font-semibold text-blue-600">
                      amount: totalAmount.toFixed(2).toString()
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col items-end gap-4">
                  <button
                    onClick={() => removeFromCart(item.food._id)}
                    className="text-red-500 hover:text-red-600 text-sm font-medium"
                  >
                    Delete
                  </button>

                  <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.food._id, item.quantity - 1)
                      }
                      className="px-3 py-2 hover:bg-gray-200 transition"
                    >
                      −
                    </button>

                    <span className="px-4 font-semibold">{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.food._id, item.quantity + 1)
                      }
                      className="px-3 py-2 hover:bg-gray-200 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-end border-t pt-6">
            <div className="text-2xl font-bold text-gray-900 mb-4">
              Total Amount: ${totalAmount}
            </div>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-green-700 transition duration-200 shadow-md"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
