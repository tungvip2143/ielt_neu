import React from "react";
import { Route, Redirect } from "react-router-dom";
import { GetAuthSelector } from "redux/selectors/auth";
import authServices from "services/authServices";

const PrivateRoute = (props: any) => {
  const auth = GetAuthSelector();
  const { isLogin } = auth;
  const userType = authServices.getUserTypeFromLocalStorage();

  // Render
  if (isLogin) {
    return <Route {...props} />;
  }

  if (userType === "admin") {
    return <Redirect to="/admin/login" />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
