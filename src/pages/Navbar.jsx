import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../provider/authContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();

    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-white border-b border-neutral-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo System Implementation */}
        <Link
          to="/"
          className="text-lg font-black text-neutral-900 tracking-tight"
        >
          Ledger<span className="text-neutral-400 font-normal">Food</span>
        </Link>

        {/* Global Navigation Target Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-neutral-500 hover:text-neutral-900 text-xs font-semibold transition-colors"
          >
            Home
          </Link>

          <Link
            to="/card"
            className="relative text-neutral-500 hover:text-neutral-900 text-xs font-semibold transition-colors"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-3.5 bg-neutral-900 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Conditional Control Pipeline for Authentication Status */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="badge-minimal bg-neutral-50">
                {user.name} {user.role === "admin" && "(Admin)"}
              </span>

              {user.role === "admin" && (
                <Link
                  to="/dashboard"
                  className="text-xs text-neutral-900 hover:underline font-semibold"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="btn-destructive text-xs"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary text-xs !py-2 !px-4">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
