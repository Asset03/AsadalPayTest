"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { data } from "@/app/data";
import "@/app/i18n";

import Card from "@/components/Card";
import SearchForm from "@/components/SearchForm";
import TransactionTable from "@/components/TransactionTable";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [filteredDate, setFilteredData] = useState(data);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleSearch = (
    searchText: string,
    startDate: string,
    endDate: string
  ) => {
    const filteredTransactions = data.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const dateCondition =
        (!startDate || transactionDate >= new Date(startDate)) &&
        (!endDate || transactionDate <= new Date(endDate));

      const textCondition =
        !searchText ||
        transaction.name.toLowerCase().includes(searchText.toLowerCase());
      return dateCondition && textCondition;
    });
    setFilteredData(filteredTransactions);
  };

  return (
    <main>
      <div className="row">
        <div className="col-8">
          <Card toolbar={true} title={String(t("title"))}>
            <>
              <Link className="btn btn-dark me-2" href={"/chart"}>
                {t("chart")}
              </Link>
              <a
                onClick={() => changeLanguage("en")}
                className="btn btn-dark me-2"
              >
                En
              </a>
              <a onClick={() => changeLanguage("ru")} className="btn btn-dark">
                Ru
              </a>
            </>

            <TransactionTable transactions={filteredDate} />
          </Card>
        </div>
        <div className="col-4">
          <Card toolbar={false} title={String(t("search"))}>
            <></>
            <SearchForm onSearch={handleSearch} transactions={filteredDate} />
          </Card>
        </div>
      </div>
    </main>
  );
}
