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
import { Redirect, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import * as Yup from "yup";

const FormEmail = () => {
  const input = {
    width: "100%",
    padding: "10px 0px 12px 16px",
    background: "#e3f2fd",
    borderTopRightRadius: "12px",
    borderTopLeftRadius: "12px",
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
    background: "#5048e5",
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
    username: Yup.string().min(5, "*Must be 5 characters").required("Required"),
    password: Yup.string().min(5, "*Must be 10 characters").required("Required"),
  });
  return (
    <>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={async (values) => {
          await login(values, {
            onSuccess: (response) => {
              dispatch(authActions.saveInfoUser, { token: response?.data?.data?.data?.access_token });
            },
          });
        }}
      >
        {(propsFormik) => (
          <Form>
            <ErrorFocus />
            <div>username: admin & password: 123456</div>
            <div style={{ paddingBottom: "30px" }}>
              <FastField
                style={input}
                error=""
                component={InputField}
                // name="username"
                {...propsFormik.getFieldProps("username")}
              />
            </div>
            <Text.DescSmall sx={forgotPassword}>Forgot password?</Text.DescSmall>
            <div style={{ paddingBottom: "30px" }}>
              <FastField
                style={input}
                component={InputField}
                type="password"
                {...propsFormik.getFieldProps("password")}
              />
            </div>

            <Button style={btn} type="submit">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormEmail;
