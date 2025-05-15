import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../charts/CustomBarChart";
const ThisMonthExpenses = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">This month's Expenses</h5>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  );
};

export default ThisMonthExpenses;
