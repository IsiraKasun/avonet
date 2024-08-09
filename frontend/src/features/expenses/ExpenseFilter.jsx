import React from "react";
import { Link, replace } from "react-router-dom";
import { useState } from "react";
import callAPI from "../../utils/callAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../auth/authSlice";
import { getLast15Years, getMonthsForYear } from "../../utils/utilities";
import { useEffect } from "react";
import useFetchCategories from "../../hooks/useFetchCategories";

const years = getLast15Years();

const ExpenseFilter = ({setFilterCategory, setFilterMonth, setFilterYear}) => {

  const [year, setYear] = useState(new Date().getFullYear());
  const [monthsList, setMonthsList] = useState(getMonthsForYear(year));
  const [month, setMonth] = useState(monthsList.length - 1);
  const [catagory, setCategory] = useState('all');
  const { data, loading, error } = useFetchCategories('/catagories');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setMonthsList(getMonthsForYear(year));
    setMonth(monthsList.length -1);
  }, [year]);

  useEffect(() => {
    setFilterCategory(catagory);
    setFilterMonth(month);
    setFilterYear(year);
  }, [catagory, month, year]);

  useEffect(() => {
    if (data && data.length) {
        setCategories([{_id: 'all', name: 'All'}, ...data]);
    }
  }, [data])

;
  return (
    <div className="flex flex-wrap flex-row items-center justify-between w-full">
      <select className="select select-bordered w-full max-w-52 mb-3" value={year} onChange={(e) => setYear(e.target.value)}>
        <option disabled value="-1">
          Year
        </option>
        {years && years.map((yr) => (
            <option value={yr} key={yr}>{yr}</option>
        ))}
        
      </select>
      <select className="select select-bordered w-full max-w-52 mb-3" value={month} onChange={(e) => setMonth(e.target.value)}>
        <option disabled value="-1">
          Month
        </option>
        {monthsList && monthsList.map((mon, index) => (
            <option value={index} key={index}>{mon}</option>
        ))}
      </select>
      <select className="select select-bordered w-full max-w-52 mb-3" value={catagory} onChange={(e) => setCategory(e.target.value)}>
        <option disabled value="-1">
          Category
        </option>
        {categories && categories.length && categories.map((cat) => (
                 <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
      </select>
    </div>
  );
};

export default ExpenseFilter;
