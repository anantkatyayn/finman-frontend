import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";

const TransactionList = ({ transactions, onDelete, onDownload }) => {
  const mid = Math.ceil(transactions.length / 2);
  const col1 = transactions.slice(0, mid);
  const col2 = transactions.slice(mid);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Transaction</h5>

        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          {col1.map((transaction) => (
            <TransactionInfoCard
              key={transaction._id}
              title={transaction.source || transaction.category}
              icon={transaction.icon}
              date={moment(transaction.date).format("Do MMM YYYY")}
              amount={transaction.amount}
              type={(transaction.type || "").toLowerCase()}
              onDelete={() => onDelete(transaction._id)}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4 md:border-l md:border-gray-200 md:pl-4">
          {col2.map((transaction) => (
            <TransactionInfoCard
              key={transaction._id}
              title={transaction.source || transaction.category}
              icon={transaction.icon}
              date={moment(transaction.date).format("Do MMM YYYY")}
              amount={transaction.amount}
              type={(transaction.type || "").toLowerCase()}
              onDelete={() => onDelete(transaction._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
