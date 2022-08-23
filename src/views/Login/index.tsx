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
import { RouteBase } from "constants/routeUrl";
import { useState } from "react";
import socialServices from "services/socialServices";
import { refreshTokenSetup } from "utils/refreshToken";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
//

const container = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

//
const dataGoogle = {
  title: "Continue with Google",
  img: ImgGoogle,
  bg: "#4285f4",
  color: "#fff",
};
const dataFacebook = {
  title: "Continue with Facebook",
  img: ImgFacebook,
  bg: "#fff",
  color: "#5b5c61",
};
const dataApple = {
  title: "Continue with Apple",
  img: ImgApple,
  bg: "#fff",
  color: "#5b5c61",
};
const dataEmail = {
  title: "Continue with Email",
  img: ImgEmail,
  bg: "#fff",
  color: "#5b5c61",
};
//
const content = {
  desc: "No account?",
  title: "Sign Up",
};

const LoginPage = (props: any) => {
  const { dispatch } = useSagaCreators();
  const auth = GetAuthSelector();
  const { isLogin } = auth;
  const handleLoginEmail = () => {
    history.push("/login/email");
  };

  const { mutateAsync: login } = useLogin();
  if (isLogin) {
    return <Redirect to={RouteBase.Admin} />;
  }
  const history = useHistory();

  const signIn = useGoogleLogin({
    onSuccess: (tokenResponse: any) =>
      dispatch(authActions.saveInfoUser, { token: tokenResponse?.data?.data?.data?.access_token }),
  });

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
          <Box sx={container}>
            <CardView>
              <Title>Login</Title>
              <Stack direction="column" spacing={2} sx={{ mb: "16px" }}>
                <ItemSocial data={dataGoogle} onClick={signIn} />
                <ItemSocial data={dataFacebook} />
                {/* <ItemSocial data={dataApple} /> */}
                <ItemSocial onClick={handleLoginEmail} data={dataEmail} />
              </Stack>
              <Footer content={content} pathName={RouteBase.SignUp} />
            </CardView>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
export default LoginPage;
