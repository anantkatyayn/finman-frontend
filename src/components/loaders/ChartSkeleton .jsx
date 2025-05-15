import React from "react";

const ChartSkeleton = ({ height = 300 }) => {
  return (
    <div
      className="w-full rounded-xl bg-[#fdfdfd] animate-pulse relative overflow-hidden"
      style={{ height }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[120px] h-[120px] rounded-full bg-gray-200 opacity-60" />
      </div>
    </div>
  );
};

export default ChartSkeleton;
