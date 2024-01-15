"use client";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
);
import { data } from "@/app/data";
import Card from "@/components/Card";

export default function Charts() {
  const typeAmountData = data.reduce(
    (acc: Record<string, number>, transaction) => {
      const type = transaction.type;

      if (!acc[type]) {
        acc[type] = 0;
      }

      acc[type] += transaction.amount;
      return acc;
    },
    {}
  );

  const typeAmountLabels = Object.keys(typeAmountData);
  const typeAmountChart = {
    labels: typeAmountLabels,
    datasets: [
      {
        label: "Type-Amount Chart",
        data: typeAmountLabels.map((el) => typeAmountData[el]),
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const monthAmountData = data.reduce(
    (acc: Record<number, number>, transaction) => {
      const month = new Date(transaction.date).getMonth();

      if (!acc[month]) {
        acc[month] = 0;
      }

      acc[month] += transaction.amount;
      return acc;
    },
    {}
  );

  const monthAmountLabels = Object.keys(monthAmountData);
  const monthAmountChart = {
    labels: monthAmountLabels.map((month) =>
      new Date(2020, Number(month)).toLocaleString("default", { month: "long" })
    ),
    datasets: [
      {
        label: "Date's Month-Amount",
        data: monthAmountLabels.map((month) => monthAmountData[Number(month)]),
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Customize color
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Card myClass="mb-4" toolbar={false} title="Month-Amount Chart">
        <></>
        <div className="chart" style={{ width: "680px", height: "400px" }}>
          <Line data={monthAmountChart} />
        </div>
      </Card>
      <Card toolbar={false} title="Type-Amount Chart">
        <></>
        <div className="chart" style={{ width: "100%", height: "400px" }}>
          <Doughnut data={typeAmountChart} />
        </div>
      </Card>
    </>
  );
}
