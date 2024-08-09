import React from "react";
import { Link, replace } from "react-router-dom";
import { useState } from "react";
import callAPI from "../../utils/callAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../auth/authSlice";
import useFetchExpenses from "../../hooks/useFetchExpenses";

const ExpenseTable = ({ startDate, endDate, category }) => {
  const { data, loading, error } = useFetchExpenses(
    "/expenses",
    category,
    startDate,
    endDate
  );

  return (
    <div className="flex flex-wrap flex-row items-center justify-between w-full">
      <div className="overflow-x-auto w-full">
        <table className="table">
          {/* head */}
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
            {data &&
              data.length &&
              data.map((row, index) => (
                <tr className="hover" key={row._id}>
                  <th>{index + 1}</th>
                  <td>{row.date}</td>
                  <td>{row.cat.name}</td>
                  <td>{row.description}</td>
                  <td>{row.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;
