import React from "react";
import ExpenseFilter from "../features/expenses/ExpenseFilter";
import ExpenseTable from "../features/expenses/ExpenseTable";
import ExpenseForm from "../features/expenses/ExpenseForm";
import PieChart from "../features/expenses/PieChart";
import { useState, useEffect } from "react";
import { getStartAndEndDate } from "../utils/utilities";

const Home = () => {
  const [filterCategory, setFilterCategory] = useState();
  const [filterMonth, setFilterMonth] = useState();
  const [filterYear, setFilterYear] = useState();
  const [dateRange, setDateRange] = useState({startDate: '', endDate: ''})

  useEffect(() => {
    if (filterYear && filterMonth) {
      setDateRange(getStartAndEndDate(filterYear, filterMonth));
    }
  }, [filterYear, filterMonth]);


  
  return (
    <>
      <div className="flex flex-row w-full p-3 items-center">
        <div className="text-center w-full">
          <h1 className="text-5xl text-amber-500 text-center">
            Dashboard
          </h1>
        </div>
      </div>
      <div className="flex flex-row w-full p-3 items-center">
        <div className="w-3/5  border rounded-md mr-2">
        <h2 className="text-xl font-bold mb-4 ml-4 w-full text-center mt-4">Expenses List</h2>
          <div className="flex flex-row text-center w-full items-center justify-between p-3">
            <div className="flex justify-between items-center mb-6 w-full">
              <ExpenseFilter setFilterCategory={setFilterCategory} setFilterMonth={setFilterMonth} setFilterYear={setFilterYear}/>
            </div>
          </div>
          <div className="flex flex-row text-center w-full items-center justify-between p-3">
            <div className="flex justify-between items-center mb-6 w-full">
            <ExpenseTable startDate={dateRange.startDate} endDate={dateRange.endDate} category={filterCategory}/>
            </div>
          </div>
        </div>
        <div className="w-2/5 ">
            <PieChart />
        </div>
      </div>
      <div className="flex flex-row w-full p-3 items-center">
          <div className="w-3/5 border rounded-md">
            <ExpenseForm/>
          </div>
      </div>
    </>
  );
};

export default Home;
