import React, { useEffect } from "react";
import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { getRandomColor } from "../../utils/utilities";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({expenseUpdated}) => {
  const expenses = useSelector((state) => state.expense.expenses);
  const categories = useSelector((state) => state.cat.categories);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState({});
  const [dataMap, setDataMap] = useState({});

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let data = {};

  let values = {};

  useEffect(() => {
    if (expenses && expenses.length && categories && categories.length) {
      let labels = [];
      let map = {};

      expenses.forEach((element) => {
        let cat = categories.find((cat) => cat._id === element.catagory);

        if (cat && labels && labels.indexOf(cat.name) === -1) {
          labels.push(cat.name);
          map[cat.name] = element.amount;
        } else {
          let currentTotal = values[cat.name] === undefined ? 0 : values[cat.name];
          currentTotal += parseFloat(element.amount);
          map[cat.name] = currentTotal;
        }
      });

      setChartLabels(labels);
      setDataMap(map);
    }
  }, [expenses, categories, expenseUpdated]);

  useEffect(() => {
    let chartValues = [];
    let bgColors = [];
    let borderColors = [];

    chartLabels.forEach((cl, index) => {
       chartValues.push(dataMap[cl]);
       let red = getRandomColor();
       let green = getRandomColor();
       let blue = getRandomColor();
       bgColors.push("rgba(" + red + "," + green + "," + blue + ", 0.2)" );
       borderColors.push("rgba(" + red + "," + green + "," + blue + ", 1)" );
    });

    setChartData(chartValues);
    
    data = {
      labels: chartLabels,
      datasets: [
        {
          label: "Expense Categories",
          data: chartValues,
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };

    setChartData(data);
  }, [chartLabels, dataMap]);

  return (
    <div className="flex flex-wrap flex-row items-center justify-stretch w-full h-full">
      <h2 className="text-xl font-bold mb-4 w-full text-center">
        Expenses Summary
      </h2>
      <div className="mx-auto">
        {chartLabels && chartLabels.length ? <Pie data={chartData} /> : null}
      </div>
    </div>
  );
};

export default PieChart;
