import React from "react";
import charts2 from "../../assets/images/charts2.png";
import {LuTrendingUpDown} from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">FinMan</h2>
        {children}
      </div>
      <div className="hidden md:block w-[40vw] h-screen bg-[#f4f5f7] bg-auth-bg-image bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-[#299D91] absolute -top-5 -left-7" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-[#525256] absolute top-[30%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-[#30D683] absolute -bottom-7 -left-10" />
        <div className="grid grid-cols-1 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income and Expenses"
            value="430,000"
            colors="bg-primary"
          />
        </div>
        <img
          src={charts2}
          className="w-64 lg:w-[90%] absolute bottom-28 shadow-lg rounded-lg shadow-emerald-200/20"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, colors }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-emerald-200/20 border border-gray-200/50 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${colors} rounded-full drop-shadow-xl`}
      >{icon}</div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text=[20px]">${value}</span>
      </div>
    </div>
  );
};
