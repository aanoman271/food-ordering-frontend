import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-gray-100">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold mb-4">
          ✓
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully
          and is being processed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition duration-200 shadow-md"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
