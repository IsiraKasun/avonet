import React from "react";
import { Link, replace } from "react-router-dom";
import { useState, useEffect } from "react";
import callAPI from "../../utils/callAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../auth/authSlice";
import { getLast15Years, getMonthsForYear } from "../../utils/utilities";
import useFetchCategories from "../../hooks/useFetchCategories";
import moment from 'moment';
import { useSelector } from 'react-redux';

const ExpenseForm = () => {
    const user = useSelector((state) => state.auth.user);
  const { data, loading, error } = useFetchCategories('/catagories');
  
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    amount: "",
  });

  useEffect(() => {
    if (data && data.length) {
        setFormData({
            ...formData,
            category: data[0]._id,
          });
    }
  }, [data]);

  const [errors, setErrors] = useState({});
  const [succesMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMsg('');
    const formErrors = validate();

    if (formErrors.length === 0) {

      let configs = {
        method: "post",
        url: "/expenses",
        headers: {'authorization': user.token},
        data: {
            desc: formData.description,
            cat: formData.category,
            amount: formData.amount
        },
      };

      let result = '';

      try {
        result = await callAPI(configs);
        if (result.status === 200) {
          setSuccessMsg('Expenses Added');
        }

      } catch (error) {
        if (error.response.status === 400) {
            setErrors([error.response.data.error]);
        } else {
          setErrors(["There was an error submitting values"]);
        }
      }

    } else {
      setErrors(formErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors = [];
    if (!formData.description) formErrors.push("Description is required");

    if (!formData.amount) formErrors.push("Amount is required");

    return formErrors;
  };

  return (
    <div className="flex flex-wrap flex-row items-center justify-between w-full">
      <div className="mb-6 w-full">
        <h2 className="text-xl font-bold mb-4 ml-4 w-full text-center mt-4">Add Expense</h2>

        <form className="ml-4 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-wrap flex-row items-center justify-start w-auto gap-4 ml-3">
            <select className="select select-bordered w-full max-w-52 mb-3" value={formData.category}
              onChange={handleChange}
              name="category">
              <option disabled value="-1">
                Category
              </option>
              {data && data.length && data.map((cat) => (
                 <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}

            </select>

            <input
              type="text"
              placeholder="Description"
              className="input input-bordered max-w-80 mb-3"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Amount"
              className="input input-bordered max-w-80 mb-3"
              value={formData.amount}
              onChange={handleChange}
              name="amount"
            />
          </div>
          <div className="flex flex-wrap flex-row items-center justify-between w-full ml-3">
            <button className="btn btn-primary w-56 md:col-span-2" type="submit">
              Submit
            </button>
          </div>
          <ul>
          {errors.length > 0 && 
          errors.map((err, index) => 
            (<li key={index} className="text-red-500">{err}</li>)
          )}

        </ul>
        {succesMsg && <h1 className="text-xl text-center text-green-600 font-bold">
          {succesMsg}
        </h1>}
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
