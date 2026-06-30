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

      const params = {
        merchant_id: import.meta.env.VITE_PAYHERE_MERCHANT_ID,
        return_url: "http://localhost:5173/payment-success",
        cancel_url: "http://localhost:5173/payment-cancel",
        notify_url: "https://two-peaches-dance.loca.lt/api/payment/notify",
        order_id: payhereOrderId,
        items: "Food Order",
        amount: totalAmount.toFixed(2).toString(),
        currency: "LKR",
        first_name: user.name,
        last_name: "Customer",
        email: user.email,
        phone: user.phone || "",
        address: "Dhaka, Bangladesh",
        city: "Dhaka",
        country: "Bangladesh",
      };
      console.log(params.notify_url);

      const payhereForm = document.createElement("form");
      payhereForm.method = "POST";
      // Official Sandbox Endpoint
      payhereForm.action = "https://sandbox.payhere.lk/pay/checkout";

      Object.entries(params).forEach(([key, value]) => {
        const hiddenField = document.createElement("input");
        hiddenField.type = "hidden";
        hiddenField.name = key;
        hiddenField.value = value;
        payhereForm.appendChild(hiddenField);
      });

      document.body.appendChild(payhereForm);

      payhereForm.submit();
      localStorage.removeItem("cart");
      setCartItems([]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout failed");
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold tracking-tight text-neutral-900 mb-6">
          Shopping Cart ({cartItems.length})
        </h2>

        {cartItems.length === 0 ? (
          /* Empty State Dashboard Window */
          <div className="text-center py-16 premium-card max-w-sm mx-auto p-6">
            <h3 className="text-sm font-semibold text-neutral-800">
              Your cart is empty
            </h3>
            <p className="text-neutral-500 text-xs mt-1">
              Go add some delicious food from menu!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Items List Wrapper */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.food._id}
                  className="premium-card p-4 flex items-center justify-between gap-4"
                >
                  {/* Left Side: Image & Food Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.food.image}
                      alt={item.food.name}
                      className="w-16 h-16 rounded-xl object-cover border border-neutral-100"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900">
                        {item.food.name}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        ${Number(item.food.price).toFixed(2)} each
                      </p>
                      {/* Subtotal Display Metrics */}
                      <p className="text-xs font-mono font-bold text-neutral-800 mt-2">
                        Subtotal: $
                        {(item.food.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Action Controller Elements */}
                  <div className="flex flex-col items-end gap-3">
                    {/* Clean Minimal Destructive Action Button */}
                    <button
                      onClick={() => removeFromCart(item.food._id)}
                      className="btn-destructive text-[11px]"
                    >
                      Remove
                    </button>

                    {/* Quantity Selector Interface Grid */}
                    <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50/50 overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.food._id, item.quantity - 1)
                        }
                        className="px-2.5 py-1 text-sm text-neutral-500 hover:bg-neutral-100 transition active:bg-neutral-200 cursor-pointer"
                      >
                        −
                      </button>
                      <span className="px-3 text-xs font-bold text-neutral-800 select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.food._id, item.quantity + 1)
                        }
                        className="px-2.5 py-1 text-sm text-neutral-500 hover:bg-neutral-100 transition active:bg-neutral-200 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Block & Core Form Submission */}
            <div className=" p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                  Total Payable Amount
                </span>
                <span className="text-2xl font-mono font-black text-neutral-900 mt-0.5 block">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="btn-primary py-3 px-6 text-sm active:scale-[0.99]"
              >
                Proceed to PayHere
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
