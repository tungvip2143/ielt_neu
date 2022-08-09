import React from "react";
import { Formik, Form, FastField } from "formik";
import ErrorFocus from "components/ErrorFocus";
import InputField from "components/CustomField/InputField";
import { GetAuthSelector } from "redux/selectors/auth";
import { Redirect } from "react-router-dom";
import Button from "components/Button";
import useSagaCreators from "hooks/useSagaCreators";
import { authActions } from "redux/creators/modules/auth";
import { useLogin } from "hooks/auth/useAuth";
import { RouteBase } from "constants/routeUrl";

const LoginPage = (props: any) => {
  const { dispatch } = useSagaCreators();
  const auth = GetAuthSelector();
  const { isLogin } = auth;

  const { mutateAsync: login } = useLogin();

  if (isLogin) {
    return <Redirect to={RouteBase.Admin} />;
  }

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{
        username: "",
        password: "",
      }}
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
          <div>
            <label htmlFor="username">UserName</label>
            <FastField component={InputField} name="username" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <FastField component={InputField} name="password" type="password" />
          </div>

          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};
export default LoginPage;
