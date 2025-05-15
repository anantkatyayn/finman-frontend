import React, { useEffect, useState } from "react";
import CustomPieChart from "./CustomPieChart";
const COLORS = ["#299D91", "#FF9F43", "#FF4C60", "#7367F0", "#00CFE8"];

const RecentIncomeWithCharts = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);
  const prepareChartData = () => {
    const dataArr = data.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">This month's Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithCharts;
