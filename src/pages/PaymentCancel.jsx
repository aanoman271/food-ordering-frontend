import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-gray-100">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold mb-4">
          ✕
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h2>
        <p className="text-gray-600 mb-6">
          It looks like you cancelled the payment process. Don't worry, your
          items are still safe in the cart.
        </p>
        <button
          onClick={() => navigate("/cart")}
          className="w-full bg-gray-800 text-white py-3 rounded-xl font-bold hover:bg-gray-900 transition duration-200 shadow-md"
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
