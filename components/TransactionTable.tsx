import { useState } from "react";
import { LuArrowUpDown, LuArrowUp, LuArrowDown } from "react-icons/lu";

import { TransactionType, Headers } from "@/app/types";
import TransactionList from "./TransactionList";

const TransactionTable: React.FC<{ transactions: TransactionType[] }> = ({
  transactions,
}) => {
  const [sortedData, setSortedData] = useState([...transactions]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedColumn, setSortColumn] = useState("");

  const headers: Headers[] = Object.values(Headers);

  const handleSort = (head: Headers) => {
    if (sortedColumn === head) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOrder("asc");
      setSortColumn(head);
    }
    const sortedArray = [...sortedData].sort((a, b) => {
      const aValue = a[head];
      const bValue = b[head];

      if (head === Headers.date) {
        const dateA = new Date(aValue).getTime();
        const dateB = new Date(bValue).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortOrder === "asc"
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    });
    setSortedData(sortedArray);
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover table-dark border-danger align-middle gs-0 gy-4 mb-0">
        <thead>
          <tr className={`align-middle`}>
            {headers.map((head, index) => (
              <th key={index} className="ps-4 pe-3">
                {head === "id" ? (
                  head
                ) : (
                  <div className="d-flex justify-content-between">
                    {head}
                    <span
                      onClick={() => handleSort(head)}
                      className="svg-icon svg-icon-2"
                    >
                      {sortedColumn !== head && <LuArrowUpDown />}
                      {sortOrder === "asc" && sortedColumn === head && (
                        <LuArrowUp />
                      )}
                      {sortOrder === "desc" && sortedColumn === head && (
                        <LuArrowDown />
                      )}
                    </span>
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <TransactionList transactions={sortedData} />
        </tbody>
      </table>
    </div>
  );
};
export default TransactionTable;
