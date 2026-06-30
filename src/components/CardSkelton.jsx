const CardSkelton = () => {
  return (
    <div className="premium-card flex flex-col overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-44 bg-gray-200"></div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow space-y-4">
        <div>
          {/* Category */}
          <div className="h-5 w-20 bg-gray-200 rounded-full mb-3"></div>

          {/* Title */}
          <div className="h-5 w-3/4 bg-gray-200 rounded"></div>

          {/* Description */}
          <div className="mt-3 space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="h-6 w-16 bg-gray-200 rounded"></div>

          <div className="h-9 w-28 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkelton;
