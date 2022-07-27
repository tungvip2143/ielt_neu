import React from "react";
//
import Box from "@mui/material/Box";
//
import CardNumberPage from "./CardNumberPage";
import { dataNumber } from "components/data/dataNumberPageExam";
const CardTotalPageExams = () => {
  const box = {
    background: "#fff",
    height: "100px",
    boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
    transform: "translateY(-100px)",
    p: "10px 0",
  };
  const part = "PART 1";
  return (
    <Box sx={box}>
      <Box sx={{ width: "80%", margin: "0 auto" }}>
        <CardNumberPage part={part} listNumber={dataNumber} />
      </Box>
    </Box>
  );
};

export default CardTotalPageExams;
