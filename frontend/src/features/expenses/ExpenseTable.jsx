import React from "react";
import { Link, replace } from "react-router-dom";
import { useState } from "react";
import callAPI from "../../utils/callAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../auth/authSlice";
import useFetchExpenses from "../../hooks/useFetchExpenses";

const ExpenseTable = ({ startDate, endDate, category, expenseUpdated }) => {
  const { data, loading, error } = useFetchExpenses(
    "/expenses",
    category,
    startDate,
    endDate,
    expenseUpdated
  );

  return (
    <div className="flex flex-wrap flex-row items-center justify-between w-full">
      <div className="overflow-x-auto w-full max-h-72 overflow-y-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {(data && data.length) ? data.map((row, index) => (
                <tr className="hover" key={row._id}><td>{index + 1}</td><td>{row.date}</td><td>{row.cat.name}</td><td>{row.description}</td><td>{row.amount}</td></tr>
              )): null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;
