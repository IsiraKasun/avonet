import React from "react";
import { Link, replace } from "react-router-dom";
import { useState } from "react";
import callAPI from "../../utils/callAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../auth/authSlice";
import { getLast15Years, getMonthsForYear } from "../../utils/utilities";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="flex flex-wrap flex-row items-center justify-stretch w-full h-full">
      <h2 className="text-xl font-bold mb-4 w-full text-center">Expenses Summary</h2>
          <div className="mx-auto">
            <Pie data={data} />
          </div>
    </div>
  );
};

export default PieChart;
