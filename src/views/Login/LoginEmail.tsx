import React from "react";
//
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

//
import Title from "./components/Title";
import Footer from "./components/Footer";
import CardView from "./components/CardView";
import FormEmail from "./components/FormEmail";
const LoginEmail = () => {
  const container = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Box sx={container}>
      <CardView>
        <Title>Continue with Email</Title>
        <Stack direction="column" spacing={2} sx={{ mb: "16px" }}>
          <FormEmail />
        </Stack>
      </CardView>
    </Box>
  );
};

export default LoginEmail;
