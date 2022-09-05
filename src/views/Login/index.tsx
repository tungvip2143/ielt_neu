import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { makeStyles } from "@mui/styles";

import Title from "./components/Title";
import CardView from "./components/CardView";
import FormLogin from "./components/FormLogin";
//
import bgLogin from "assets/image/login/bg-login.jpg";
import HeaderOdin from "../../components/Header/HeaderOdin";
const useStyles = makeStyles((theme) => {
  return {
    container: {
      width: "100vw",
      height: "100vh",
      ...theme.custom?.flexBox.flexCenterCenter,
      background: `url(${bgLogin})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
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
      <HeaderOdin />
      <CardView>
        <Title>Login to exam</Title>
        <Stack direction="column" spacing={2} sx={{ mb: "16px" }}>
          <FormLogin />
        </Stack>
      </CardView>
    </Box>
  );
};

export default LoginPage;
