// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignUp from "../features/auth/SignUp.jsx";
import SignIn from "../features/auth/SignIn.jsx";
import Home from "../common/Home.jsx";
import NotFound from "../common/NotFound.jsx";
import { useSelector } from 'react-redux';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? '/app' : '/signin'} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/app" element={isAuthenticated ? <Home /> : <Navigate to="/signin" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
};

export default App;
