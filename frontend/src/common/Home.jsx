import React from "react";
import ExpenseFilter from "../features/expenses/ExpenseFilter";
import ExpenseTable from "../features/expenses/ExpenseTable";
import ExpenseForm from "../features/expenses/ExpenseForm";
import PieChart from "../features/expenses/PieChart";
import CategoryForm from "../features/categories/CategoryForm";
import { useState, useEffect } from "react";
import { getStartAndEndDate } from "../utils/utilities";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Home = () => {
  const [filterCategory, setFilterCategory] = useState();
  const [filterMonth, setFilterMonth] = useState();
  const [filterYear, setFilterYear] = useState();
  const [dateRange, setDateRange] = useState({startDate: '', endDate: ''})
  const [expenseUpdated, setExpenseUpdated] = useState(false);
  const [categoryUpdated, setCategoryUpdated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  useEffect(() => {
    if (filterYear && filterMonth) {
      setDateRange(getStartAndEndDate(filterYear, filterMonth));
    }
  }, [filterYear, filterMonth]);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };
 
  return (
    <>
      <div className="flex flex-row w-full p-1 items-end">
        <div className="text-right w-full pr-1">
          <h1 className="text-xl text-amber-500" onClick={handleLogout} style={{cursor: 'pointer'}}>
            Logout
          </h1>
        </div>
      </div>
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
              <ExpenseFilter setFilterCategory={setFilterCategory} setFilterMonth={setFilterMonth} setFilterYear={setFilterYear} categoryUpdated={categoryUpdated}/>
            </div>
          </div>
          <div className="flex flex-row text-center w-full items-center justify-between p-3">
            <div className="flex justify-between items-center mb-6 w-full">
            <ExpenseTable startDate={dateRange.startDate} endDate={dateRange.endDate} category={filterCategory} expenseUpdated={expenseUpdated}/>
            </div>
          </div>
        </div>
        <div className="w-2/5 ">
            <PieChart startDate={dateRange.startDate} endDate={dateRange.endDate} category={filterCategory} expenseUpdated={expenseUpdated}/>
        </div>
      </div>
      <div className="flex flex-row w-full p-3 items-center">
          <div className="w-3/5 border rounded-md mr-2">
            <ExpenseForm setExpenseUpdated={setExpenseUpdated} categoryUpdated={categoryUpdated}/>
          </div>
          <div className="w-2/5 border rounded-md">
          <CategoryForm setCategoryUpdated={setCategoryUpdated} categoryUpdated={categoryUpdated}/>
        </div>
      </div>
    </>
  );
};

export default Home;
