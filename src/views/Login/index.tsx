//
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useGoogleLogin } from "@react-oauth/google";
import ImgEmail from "assets/image/login/email.svg";
import ImgFacebook from "assets/image/login/facebook.svg";
import ImgGoogle from "assets/image/login/google.svg";
import { SocialProvider } from "constants/constants";
import { RouteBase } from "constants/routeUrl";
import { Form, Formik } from "formik";
import { useLogin } from "hooks/auth/useAuth";
import useSagaCreators from "hooks/useSagaCreators";
import { useGetLocation } from "provider/LocationProvider";
import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { authActions } from "redux/creators/modules/auth";
import { GetAuthSelector } from "redux/selectors/auth";
import socialServices from "services/socialServices";
import CardView from "./components/CardView";
import Footer from "./components/Footer";
//
import ItemSocial from "./components/ItemSocial";
//
import Title from "./components/Title";
//

import LogoDuca from "assets/image/logo/duca.png";
import { makeStyles } from "@mui/styles";

import Title from "./components/Title";
import CardView from "./components/CardView";
import FormLogin from "./components/FormLogin";
import HeaderExam from "../Ielts/Header/HeaderExam";
//
const useStyles = makeStyles((theme) => {
  return {
    container: {
      width: "100vw",
      height: "100vh",
      ...theme.custom?.flexBox.flexCenterCenter,
    },
    footer: {
      ...theme.custom?.flexBox.flexCenterCenter,
      position: "fixed",
      bottom: 0,
      right: 0,
      left: 0,
      height: "140px",
      p: "20px 20px",
    },
  };
});
const LoginPage = () => {
  // ! State
  const classes = useStyles();

  //! Render
  return (
    <Box className={classes.container}>
      <HeaderExam />
      <CardView>
        <Title>Login to exam</Title>
        <Stack direction="column" spacing={2} sx={{ mb: "16px" }}>
          <FormLogin />
        </Stack>
      </CardView>
      <Box className={classes.footer}>
        <img style={{ width: "300px" }} src={LogoDuca} alt="" />
      </Box>
    </Box>
  );
};
export default LoginPage;
