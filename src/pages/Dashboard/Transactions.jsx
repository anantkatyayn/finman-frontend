import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstace";
import { API_PATHS } from "../../utils/apiPath";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import IncomeList from "../../components/income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import TransactionList from "../../components/transactions/TransactionList";
import Loader from "../../components/loaders/Loader";

const Transactions = () => {
  useUserAuth();
  const [transactionData, setTransactionData] = useState([]);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  //handler functions

  //function to fetch all income details
  const fetchTransactionDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      console.log(response.data);
      if (response.data?.allTransactions) {
        setTransactionData(response.data.allTransactions);
      }
    } catch (error) {
      console.error("Error in fetching transaction details", error);
    } finally {
      setLoading(false);
    }
  };

  //handle download income details in an excel
  const handleDownloadTransactionDetails = async () => {};

  useEffect(() => {
    fetchTransactionDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Transactions">
      <div className="my-5 mx-auto">
        {loading || !transactionData ? (
          <Loader />
        ) : (
          <TransactionList
            transactions={transactionData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadTransactionDetails}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
