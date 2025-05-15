import React from "react";
import { formatIndianNumber } from "../../utils/helper";

const InfoCard = ({ icon, label, color, value }) => {
  return (
    <div className="flex gap-6 p-4 bg-white rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
        <span className={`text-[22px] ${value <= 0 ? "text-red-500" : ""}`}>
          ₹{formatIndianNumber(value)}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
