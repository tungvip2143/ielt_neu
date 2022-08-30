import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const container = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
import Title from "./components/Title";
import CardView from "./components/CardView";
import FormEmail from "./components/FormEmail";
const LoginPage = () => {
  // ! State

  //! Render

  return (
    <Box sx={container}>
      <CardView>
        <Title>Login to exam</Title>
        <Stack direction="column" spacing={2} sx={{ mb: "16px" }}>
          <FormEmail />
        </Stack>
      </CardView>
    </Box>
  );
};

export default LoginPage;
