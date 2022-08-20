import React, { useEffect } from "react";
//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// ! type

interface Props {
  content?: any;
  width?: any;
  className?: any;
}

const CardExercise = ({ content, width, className }: Props) => {
  const card = {
    p: "24px 32px",
    borderRadius: "20px",
    boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
    overflowY: { xs: "", lg: "scroll" },
    height: { xs: "", lg: "calc(100vh - 143px)" },
    mb: { xs: "40px", lg: "0" },
    pb: "200px !important",
  };
  return (
    <Grid item xs={12} sm={12} md={12} lg={width}>
      <Card sx={card} className={className}>
        {content}
      </Card>
    </Grid>
  );
};

export default CardExercise;
