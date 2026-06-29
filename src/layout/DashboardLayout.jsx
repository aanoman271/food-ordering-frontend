import { Link, Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#f4f4f3] text-[#1a1a1a] antialiased font-sans px-4 sm:px-6 py-6">
      {/* Premium Capsule Floating Navigation */}
      <nav className="max-w-7xl mx-auto bg-white border border-[#e5e5e0] rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] px-6 py-4 mb-8 sticky top-6 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <span className="font-bold tracking-tight text-xl text-[#1a1a1a]">
              Ledger<span className="text-[#a3a39e] font-normal">Food</span>
            </span>

            <div className="flex gap-2 text-sm font-medium">
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive("/dashboard")
                    ? "bg-[#1a1a1a] text-white shadow-sm"
                    : "text-[#73736d] hover:text-[#1a1a1a] hover:bg-[#f4f4f3]"
                }`}
              >
                Overview
              </Link>
              <Link
                to="/dashboard/add-food"
                className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive("/dashboard/add-food")
                    ? "bg-[#1a1a1a] text-white shadow-sm"
                    : "text-[#73736d] hover:text-[#1a1a1a] hover:bg-[#f4f4f3]"
                }`}
              >
                Add Item
              </Link>
            </div>
          </div>

          <div className="hidden sm:block text-xs font-mono text-[#a3a39e] uppercase tracking-widest border border-[#e5e5e0] px-3 py-1 rounded-lg bg-[#fafafa]">
            Admin Console
          </div>
        </div>
      </nav>

      {/* Layout Content */}
      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
