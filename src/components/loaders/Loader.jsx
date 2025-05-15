import React from "react";
import { HashLoader } from "react-spinners";

const Loader = ({ size = 60, color = "#299d91" }) => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <HashLoader size={size} color={color} />
    </div>
  );
};

export default Loader;
