import React from "react";
import {Outlet, Navigate} from "react-router-dom";
import useAuthStore from "../authStore";

const PrivateRoute = () => {
  const loggedIn = useAuthStore((state) => state.loggedIn);

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
