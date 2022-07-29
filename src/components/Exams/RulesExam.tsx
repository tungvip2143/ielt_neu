import React from "react";
//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
//
import TitleSecond from "components/Typography/TitleSecond";
import Sub20BoldIlets from "components/Typography/Sub20BoldIlets";
import Desc16 from "components/Typography/Desc16";
import ButtonStartTest from "components/Button/ButtonStartTest";

// ! type
interface Data {
  typeExam: string;
  timeExam: string;
  instructionsToTest: any;
  informationForTest: any;
}

const RulesExam = ({ typeExam, timeExam, instructionsToTest, informationForTest }: Data) => {
  const card = {
    width: { xs: "100%", md: "90%", lg: "80%" },
    borderRadius: "16px",
    margin: "0 auto",
    boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
    padding: "50px 50px",
  };
  return (
    <Card sx={card}>
      <Box sx={{ width: { xs: "100%", sm: "90%", md: "660px" }, margin: "0 auto" }}>
        <Box sx={{ textAlign: "center", p: "20px 0 50px 0" }}>
          <TitleSecond>{typeExam}</TitleSecond>
          <Desc16>{timeExam}</Desc16>
        </Box>
        <Box sx={{ pb: "30px" }}>
          <Box sx={{ mb: "20px" }}>
            <Sub20BoldIlets>Instructions To Test Takes</Sub20BoldIlets>
          </Box>
          {instructionsToTest}
        </Box>
        <Box>
          <Box sx={{ mb: "20px" }}>
            <Sub20BoldIlets>Information For Test Takes</Sub20BoldIlets>
          </Box>

          {informationForTest}
        </Box>
      </Box>
    </Card>
  );
};

export default RulesExam;
