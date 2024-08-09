import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import callAPI from "../../utils/callAPI";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        url: "/users",
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        },
      };

      let result = '';

      try {
        result = await callAPI(configs);
        if (result.status === 200) {
          setSuccessMsg('User successfully Created. Please Sign in');
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
    if (!formData.firstName) formErrors.push("First name is required");

    if (!formData.lastName) formErrors.push("Last name is required");

    if (!formData.email) {
      formErrors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.push("Email address is invalid");
    }

    if (!formData.password) formErrors.push("Password is required");

    if (formData.password.length < 6) formErrors.push("Password must be at least 6 characters");

    if (formData.password !== formData.confirmPassword) {
      formErrors.push("Passwords do not match");
    }

    return formErrors;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full"
              value={formData.firstName}
              onChange={handleChange}
              name="firstName"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full"
              value={formData.lastName}
              onChange={handleChange}
              name="lastName"
            />
          </div>
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Sign Up
          </button>
        </form>
        <h1 className="text-xl text-center">
          Already having an account? {' '}
          <Link to="/signin" className="text-orange-900">
            Sign In
          </Link>
        </h1>
        <ul>
          {errors.length > 0 && 
          errors.map((err, index) => 
            (<li key={index} className="text-red-500">{err}</li>)
          )}

        </ul>
        {succesMsg && <h1 className="text-xl text-center text-green-600 font-bold">
          {succesMsg + ' '}
          <Link to="/signin" className="text-green-950 font-bold">
            here
          </Link>
        </h1>}
      
      </div>
    </div>
  );
};

export default SignUp;
