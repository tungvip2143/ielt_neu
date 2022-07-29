import React from "react";
//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
//
import CardPart from "components/Card/CardPart";
import CardExercise from "components/Card/CardExercise";
import CardTotalPageExams from "components/Card/CardTotalPageExams";
//
// import ButtonNumberPage from "components/Button/ButtonNumberPage";
const ExamText = () => {
  const part = "Part 1";
  const guide = "Read the text below and answer questions 1-13";
  return (
    <Box>
      <Box sx={{ width: "80%", margin: "0 auto" }}>
        <CardPart part={part} guide={guide} />
        <Grid container sx={{ justifyContent: "space-between", p: "20px 0" }}>
          <CardExercise />
          <CardExercise />
        </Grid>
      </Box>

      <CardTotalPageExams />
    </Box>
  );
};

export default ExamText;
