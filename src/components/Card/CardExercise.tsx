import React, { useEffect } from "react";
//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// ! type

interface Props {
  content: any;
}

const CardExercise = ({ content }: Props) => {
  const card = {
    p: "24px 32px",
    borderRadius: "20px",
    boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
    overflowY: { xs: "", lg: "scroll" },
    height: { xs: "", lg: "calc(100vh - 143px)" },
    pb: { xs: "100px", lg: "200px" },
    mb: { xs: "40px", lg: "0" },
  };
  return (
    <Grid item xs={12} sm={12} md={12} lg={5.9}>
      <Card sx={card}>{content}</Card>
    </Grid>
  );
};

export default CardExercise;
