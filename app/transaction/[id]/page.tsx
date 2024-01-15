"use client";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

import Card from "@/components/Card";
import { data } from "@/app/data";

export default function SingleTransaction() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();

  const details = data.find((el) => el.id === Number(id)) || {};
  const keys = Object.keys(details) ;

  return (
    <>
      <Card toolbar={false} title={t("Transaction Details")}>
        <></>
        <>
          <ul className="list-group mt-4">
            {keys.map((key) => (
              <li key={key} className="list-group-item list-group-item-action d-flex">
                <span className="col-3">{key}:</span>
                <div>{details[key]}</div>
              </li>
            ))}
          </ul>
        </>
      </Card>
    </>
  );
}
