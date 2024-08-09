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

const CategoryForm = ({setCategoryUpdated, categoryUpdated}) => {
    const user = useSelector((state) => state.auth.user);
  
  const [categoryName, setCategoryName] = useState('');
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
        url: "/catagories",
        headers: {'authorization': user.token},
        data: {
            name: categoryName,
        },
      };

      let result = '';

      try {
        result = await callAPI(configs);
        if (result.status === 200) {
          setSuccessMsg('Category Added');
          setCategoryUpdated((prev) => !prev);
          setCategoryName('');

          setTimeout(() => {
            setSuccessMsg('');
          }, 5000);
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
     setCategoryName(e.target.value);
  };

  const validate = () => {
    let formErrors = [];
    if (!categoryName) formErrors.push("Catagory Name is required");

    return formErrors;
  };

  return (
    <div className="flex flex-wrap flex-row items-center justify-between w-full">
      <div className="mb-6 w-full">
        <h2 className="text-xl font-bold mb-4 ml-4 w-full text-center mt-4">Add Catagory</h2>

        <form className="ml-4 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-wrap flex-row items-center justify-start w-auto gap-4 ml-3">
            <input
              type="text"
              placeholder="Category Name"
              className="input input-bordered max-w-80 mb-3"
              name="categoryname"
              value={categoryName}
              onChange={handleChange}
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

export default CategoryForm;
