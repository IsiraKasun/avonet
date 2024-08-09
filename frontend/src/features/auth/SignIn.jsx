import React from 'react';
import { Link, replace } from "react-router-dom";
import { useState } from "react";
import callAPI from "../../utils/callAPI";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../auth/authSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [succesMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const formErrors = validate();

    if (formErrors.length === 0) {
      let configs = {
        method: "post",
        url: "/users/signin",
        data: {
          email: formData.email,
          password: formData.password
        },
      };

      let result = '';
      

      try {
        result = await callAPI(configs);
        if (result.status === 200) {
          setSuccessMsg('Sign In Successful');
          dispatch(login(result.data.user))
          setTimeout(() => {
            navigate('/app');
          }, 1000);
        }

      } catch (error) {
        if (error.response && (error.response.status === 400 || error.response.status === 401)) {
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

    if (!formData.email) formErrors.push("Email is required");
    
    if (!formData.password) formErrors.push("Password is required");

    return formErrors;
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit}> 
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
              name="password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
        <h1 className="text-xl text-center">
          Don't have an account? {' '}<Link to="/signup" className="text-orange-900">Sign up</Link>
        </h1>
        <ul>
          {errors.length > 0 && 
          errors.map((err, index) => 
            (<li key={index} className="text-red-500">{err}</li>)
          )}

        </ul>
        {succesMsg && <h1 className="text-xl text-center text-green-600 font-bold">
          {succesMsg}
        </h1>}
      </div>
    </div>
  );
};

export default SignIn;