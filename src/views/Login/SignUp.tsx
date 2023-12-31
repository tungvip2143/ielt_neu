import React from "react";
import { Formik, Form, FastField } from "formik";
import ErrorFocus from "components/ErrorFocus";
import InputField from "components/CustomField/InputField";
import { GetAuthSelector } from "redux/selectors/auth";
import { Redirect, useHistory } from "react-router-dom";
import Button from "components/Button";
import useSagaCreators from "hooks/useSagaCreators";
import { authActions } from "redux/creators/modules/auth";
import { useLogin } from "hooks/auth/useAuth";
//
import ItemSocial from "./components/ItemSocial";
import ImgGoogle from "assets/image/login/google.svg";
import ImgFacebook from "assets/image/login/facebook.svg";
import ImgApple from "assets/image/login/apple.svg";
import ImgEmail from "assets/image/login/email.svg";
//
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
//
import Title from "./components/Title";
import Footer from "./components/Footer";
import CardView from "./components/CardView";
//
const SignUp = (props: any) => {
  const { dispatch } = useSagaCreators();
  const auth = GetAuthSelector();
  const { isLogin } = auth;

  const { mutateAsync: login } = useLogin();
  if (isLogin) {
    return <Redirect to="/" />;
  }
  const history = useHistory();

  const container = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const handleLogin = () => {
    history.push("/login");
  };
  //
  const dataGoogle = {
    title: "Sign up with Google",
    img: ImgGoogle,
    bg: "#4285f4",
    color: "#fff",
  };
  const dataFacebook = {
    title: "Sign up with Facebook",
    img: ImgFacebook,
    bg: "#fff",
    color: "#5b5c61",
  };
  const dataApple = {
    title: "Sign up with Apple",
    img: ImgApple,
    bg: "#fff",
    color: "#5b5c61",
  };
  const dataEmail = {
    title: "Sign up with Email",
    img: ImgEmail,
    bg: "#fff",
    color: "#5b5c61",
  };
  //
  const content = {
    desc: "Already have an account?",
    title: "Login",
  };
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
          <Box sx={container}>
            <CardView>
              <Title>Sign up</Title>
              <Stack direction="column" spacing={2} sx={{ mb: "16px" }}>
                <ItemSocial data={dataGoogle} />
                <ItemSocial data={dataFacebook} />
                <ItemSocial data={dataApple} />
                <ItemSocial data={dataEmail} />
              </Stack>
              <Footer onClick={handleLogin} content={content} />
            </CardView>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
export default SignUp;
