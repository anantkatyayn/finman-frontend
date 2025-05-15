import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstace";
import ExpenseOverview from "../../components/expense/ExpenseOverview";
import ExpenseList from "../../components/expense/ExpenseList";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/expense/AddExpenseForm";
import DeleteAlert from "../../components/DeleteAlert";
import Loader from "../../components/loaders/Loader";


const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  //handler functions

  //function to fetch all expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if (response.data?.expense) {
        setExpenseData(response.data.expense);
      }
    } catch (error) {
      console.error("Error in fetching expense details", error);
    } finally {
      setLoading(false);
    }
  };

  //function to add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, icon, date } = expense;

    if (!category.trim()) {
      toast.error("category is required");
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModal(false);
      fetchExpenseDetails();
      toast.success("Expense added successfully");
    } catch (error) {
      console.error(
        "Error in adding expense",
        error.response?.data?.message || error.message
      );
    }
  };

  //function to delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense detail deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error in deleting expense",
        error.response?.data?.message || error.message
      );
    }
  };

    //handle download Expense details in an excel
  const handleDownloadExpenseDetails = async () => {};

   useEffect(() => {
      fetchExpenseDetails();
      return () => {};
    }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        {loading || !expenseData ? (
        <Loader />
      ) : (<>
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense detail?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
        </>
      )}
      </div>
    </DashboardLayout>
  );
};

export default Expense;
