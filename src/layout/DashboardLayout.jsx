import { Link, Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6">
      <nav className="max-w-7xl mx-auto capsule-nav px-6 py-3.5 mb-8 sticky top-6 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Logo System */}
            <span className="font-black tracking-tight text-lg text-neutral-900">
              Ledger<span className="text-neutral-400 font-normal">Food</span>
            </span>

            {/* Navigation Tabs */}
            <div className="flex gap-1.5 text-xs font-semibold">
              <Link
                to="/dashboard"
                className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive("/dashboard")
                    ? "bg-neutral-900 text-white shadow-xs"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                Overview
              </Link>
              <Link
                to="/dashboard/add-food"
                className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive("/dashboard/add-food")
                    ? "bg-neutral-900 text-white shadow-xs"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                Add Item
              </Link>
            </div>
          </div>

          {/* Minimalist Badge */}
          <div className="hidden sm:block badge-minimal bg-white/90">
            Admin Console
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
