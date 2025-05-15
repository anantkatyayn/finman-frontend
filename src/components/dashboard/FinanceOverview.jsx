import React, { useEffect, useMemo, useState } from 'react'
import CustomPieChart from '../charts/CustomPieChart';
import ChartSkeleton from "../loaders/ChartSkeleton ";

const COLORS = ["#04DAC5","#FA2C37","#FF6900"]
const FinanceOverview = ({ totalBalance, totalExpenses }) => {
  const [showChart, setShowChart] = useState(false);

  // memoize data
  const balanceData = useMemo(() => [
    { name: "Balance Left", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpenses },
  ], [totalBalance, totalExpenses]);

  // small delay to simulate layout stabilization
  useEffect(() => {
    const timer = setTimeout(() => setShowChart(true), 300);
    return () => clearTimeout(timer);
  }, [totalBalance, totalExpenses]);

  return (
  <div className="card">
    <div className="flex items-center justify-between">
      <h5 className="text-lg">Financial Overview</h5>
    </div>
     {showChart ? (
        <CustomPieChart
          data={balanceData}
          label="Total Balance"
          totalAmount={`₹${totalBalance}`}
          colors={COLORS}
          showTextAnchor
        />
      ) : (
        <ChartSkeleton />
      )}
    </div>
  );
};

export default FinanceOverview;