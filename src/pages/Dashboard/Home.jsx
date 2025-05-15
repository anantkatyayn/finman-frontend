import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstace";
import { API_PATHS } from "../../utils/apiPath";
import InfoCard from "../../components/cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { formatIndianNumber } from "../../utils/helper";
import RecentTransaction from "../../components/dashboard/RecentTransaction";
import FinanceOverview from "../../components/dashboard/FinanceOverview";
import ExpenseTransaction from "../../components/dashboard/ExpenseTransaction";
import ThisMonthExpenses from "../../components/dashboard/ThisMonthExpenses";
import RecentIncomeWithCharts from "../../components/charts/RecentIncomeWithCharts";
import IncomeTransaction from "../../components/dashboard/IncomeTransactions";
import Loader from "../../components/loaders/Loader";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error in fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {loading || !dashboardData ? (
        <Loader />
      ) : (<>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Balance Left"
            value={dashboardData?.thisMonthBalance || 0}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Income This Month"
            value={dashboardData?.thisMonthIncome?.total || 0}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Expenditure This Month"
            value={dashboardData?.thisMonthExpenses?.total || 0}
            color="bg-red-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransaction
          transaction={dashboardData?.recentTransactions}
          onSeeMore={()=>navigate("/transaction")}
          />
          <FinanceOverview
          totalBalance={dashboardData?.totalBalance||0}
          totalExpenses={dashboardData?.totalExpenses||0}
          totalIncome={dashboardData?.totalIncome||0}/>

          <ExpenseTransaction
          transactions={dashboardData?.thisMonthExpenses?.transactions||[]}
          onSeeMore={()=>navigate("/expense")}/>
          <ThisMonthExpenses
          transactions={dashboardData?.thisMonthExpenses?.transactions||[]}
          />
          <RecentIncomeWithCharts
          data={dashboardData?.thisMonthIncome?.transactions?.slice(0,4)||[]}
          totalIncome={dashboardData?.totalIncome||0}
          />
          <IncomeTransaction
          transactions={dashboardData?.thisMonthIncome?.transactions||[]}
          onSeeMore={()=>navigate("/income")}/>
        </div>
         </>
      )}
    </div>
   
  </DashboardLayout>
);
}
export default Home;
