import React from "react";
import { Route, Redirect } from "react-router-dom";
import { GetAuthSelector } from "redux/selectors/auth";

const PrivateRoute = (props: any) => {
  const auth = GetAuthSelector();
  const { isLogin } = auth;

  // Render
  if (isLogin) {
    return <Route {...props} />;
  }

  return <Redirect to="/login" />;
  // return <Redirect to="/admin/login" />;
};

export default PrivateRoute;
