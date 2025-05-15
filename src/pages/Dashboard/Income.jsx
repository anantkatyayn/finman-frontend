import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import IncomeOverview from "../../components/income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstace";
import { API_PATHS } from "../../utils/apiPath";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import Loader from "../../components/loaders/Loader";

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  //handler functions

  //function to fetch all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if (response.data?.income) {
        setIncomeData(response.data.income);
      }
    } catch (error) {
      console.error("Error in fetching income details", error);
    } finally {
      setLoading(false);
    }
  };

  //function to add income
  const handleAddIncome = async (income) => {
    const { source, amount, icon, date } = income;

    if (!source.trim()) {
      toast.error("source is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModal(false);
      fetchIncomeDetails();
      toast.success("Income added successfully");
    } catch (error) {
      console.error(
        "Error in adding income",
        error.response?.data?.message || error.message
      );
    }
  };

  //function to delete income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income detail deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error in deleting income",
        error.response?.data?.message || error.message
      );
    }
  };

const handleDownloadIncomeDetails = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.INCOME.DOWNLOAD_INCOME,
      {
        responseType: "blob",
      }
    );

    // Create a URL for the blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "income_details.xlsx");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading income details:", error);
    toast.error("Failed to download income details. Please try again.");
  }
};

  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        {loading || !incomeData ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6">
              <div className="">
                <IncomeOverview
                  transactions={incomeData}
                  onAddIncome={() => setOpenAddIncomeModal(true)}
                />
              </div>
              <IncomeList
                transactions={incomeData}
                onDelete={(id) => {
                  setOpenDeleteAlert({ show: true, data: id });
                }}
                onDownload={handleDownloadIncomeDetails}
              />
            </div>

            <Modal
              isOpen={openAddIncomeModal}
              onClose={() => setOpenAddIncomeModal(false)}
              title="Add Income"
            >
              <AddIncomeForm onAddIncome={handleAddIncome} />
            </Modal>

            <Modal
              isOpen={openDeleteAlert.show}
              onClose={() => setOpenDeleteAlert({ show: false, data: null })}
              title="Delete Income"
            >
              <DeleteAlert
                content="Are you sure you want to delete this income detail?"
                onDelete={() => deleteIncome(openDeleteAlert.data)}
              />
            </Modal>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Income;
