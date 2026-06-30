const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start animate-pulse">
      {/* Left Sidebar Skeleton (Only Total Foods) */}
      <div className="hidden lg:block">
        <div className="bg-white border border-neutral-200/70 rounded-2xl p-6 space-y-5">
          <div className="h-4 bg-neutral-200 rounded-md w-1/2"></div>
          {/* Stats Box Skeleton */}
          <div className="bg-neutral-50/50 border border-neutral-200/40 rounded-xl p-5 space-y-3">
            <div className="h-3 bg-neutral-200 rounded-md w-1/3"></div>
            <div className="h-10 bg-neutral-200 rounded-lg w-1/2"></div>
            <div className="h-3 bg-neutral-100 rounded-md w-2/3 mt-2"></div>
          </div>
        </div>
      </div>

      {/* Right Main Content (Table) Skeleton */}
      <div className="lg:col-span-3 bg-white border border-neutral-200/70 rounded-2xl p-6">
        <div className="h-5 bg-neutral-200 rounded-md w-1/4 mb-8"></div>

        <div className="space-y-4">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3.5 border-b border-neutral-100 last:border-0"
            >
              {/* Image & Name */}
              <div className="flex items-center gap-4 w-2/5">
                <div className="w-12 h-12 bg-neutral-200 rounded-xl shrink-0"></div>
                <div className="h-4 bg-neutral-200 rounded-md w-full"></div>
              </div>
              {/* Category */}
              <div className="h-5 bg-neutral-100 border border-neutral-200/30 rounded-md w-16"></div>
              {/* Price */}
              <div className="h-4 bg-neutral-200 rounded-md w-12"></div>
              {/* Action Button */}
              <div className="h-7 bg-neutral-100 border border-neutral-200/50 rounded-xl w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
