import React from "react";
//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
//
import TitleSecond from "components/Typography/TitleSecond";
import Desc16 from "components/Typography/Desc16";
import ButtonStartTest from "components/Button/ButtonStartTest";
import { useHistory } from "react-router-dom";

const card = {
  p: "48px 32px",
  width: { xs: "100%", md: "80%" },
  borderRadius: "16px",
  margin: "0 auto",
  boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
};
const content = {
  width: { xs: "100%", sm: "90%", md: "660px" },
  margin: "0 auto",
  textAlign: "center",
};

const EndTest = () => {
  // !Hook
  const history = useHistory();

  const handleEndTest = () => history.push("/ielts/scores");

  return (
    <Card sx={card}>
      <Box sx={content}>
        <TitleSecond>You have reached the end of the test</TitleSecond>
        <Desc16>All of your answer have been saved.</Desc16>
        <Desc16>Please click the end test button below to finish the test</Desc16>
        <Box sx={{ mt: "50px" }}>
          <ButtonStartTest onClick={handleEndTest}>End Test</ButtonStartTest>
        </Box>
      </Box>
    </Card>
  );
};

export default EndTest;
