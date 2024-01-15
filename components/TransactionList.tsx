'use client'
import React from "react";
import { TransactionType } from "@/app/types";

const TransactionList: React.FC<{transactions: TransactionType[]}> = ({transactions}) => {
  const onTransactionClick = (id: number) => {
    window.location.href=`/transaction/${id}`
  };
  return (
    <>
      {transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <tr key={index} onClick={() => onTransactionClick(transaction.id)}>
            <th className="ps-4 pe-4">{index + 1}</th>
            <th className="ps-4 pe-4">{transaction.name}</th>
            <th className="ps-4 pe-4">{transaction.date}</th>
            <th className="ps-4 pe-4">{transaction.amount}</th>
            <th className="ps-4 pe-4">{transaction.type}</th>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={4}
            className="me-2 text-center fs-5"
            style={{ paddingTop: "50px", paddingBottom: "50px" }}
          >
            No Data Exists
          </td>
        </tr>
      )}
    </>
  );
}
export default TransactionList;