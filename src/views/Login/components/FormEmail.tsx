import React from "react";
//
import Text from "components/Typography/index";
import ButtonCommon from "../../../components/Button/ButtonCommon";
//
import { Formik, Form, FastField } from "formik";
import ErrorFocus from "components/ErrorFocus";
import InputField from "components/CustomField/InputField";
import { GetAuthSelector } from "redux/selectors/auth";
import useSagaCreators from "hooks/useSagaCreators";
import { authActions } from "redux/creators/modules/auth";
import { useLogin } from "hooks/auth/useAuth";
import { Link, Redirect, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import { RouteBase } from "constants/routeUrl";
import Footer from "./Footer";

const FormEmail = () => {
  const input = {
    width: "100%",
    borderRadius: "12px 12px 0px 0px",
    backgroundColor: "rgb(247, 249, 251)",
    padding: "8px 0px 12px 16px",
    border: "1px solid #e3f2fd",
    borderBottom: "1px solid rgb(138, 140, 145)",
    height: "3rem",
  };
  const forgotPassword = {
    fontSize: "12px",
    float: "right",
    color: "#8a8c91",
    marginBottom: "5px",
  };
  const btn = {
    width: "100%",
    borderRadius: "16px",
    padding: "16px 0 ",
    mt: "16px",
    background: "#104AC6",
    color: "#fff",
  };
  //
  const { dispatch } = useSagaCreators();
  const auth = GetAuthSelector();
  const { isLogin } = auth;

  const { mutateAsync: login } = useLogin();
  if (isLogin) {
    return <Redirect to="/" />;
  }
  //

  const validate = Yup.object({
    email: Yup.string().min(5, "*Must be 5 characters").required("Required"),
    password: Yup.string().min(5, "*Must be 10 characters").required("Required"),
  });

  const content = {
    desc: "No account?",
    title: "Sign Up",
  };
  return (
    <>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={async (values) => {
          await login(values, {
            onSuccess: (response) => {
              dispatch(authActions.saveInfoUser, { token: response?.data?.data?.data?.access_token, userType: "user" });
            },
          });
        }}
      >
        {(propsFormik) => (
          <Form>
            <ErrorFocus />
            <div style={{ paddingBottom: "30px" }}>
              <FastField
                style={input}
                error=""
                component={InputField}
                placeholder="Email"
                // name="username"
                {...propsFormik.getFieldProps("email")}
              />
            </div>
            <Link to={RouteBase.ForgotPassword}>
              <Text.DescSmall sx={forgotPassword} className="cursor-grab">
                Forgot password?
              </Text.DescSmall>
            </Link>
            <div style={{ paddingBottom: "30px" }}>
              <FastField
                style={input}
                component={InputField}
                type="password"
                placeholder="Password"
                {...propsFormik.getFieldProps("password")}
              />
            </div>

            <Button style={btn} type="submit">
              LOGIN
            </Button>
            <Footer content={content} pathName={RouteBase.SignUp} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormEmail;
