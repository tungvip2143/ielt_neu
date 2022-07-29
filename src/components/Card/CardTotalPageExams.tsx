import React from "react";
//
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

//
import CardNumberPage from "./CardNumberPage";
import { dataNumber } from "components/data/dataNumberPageExam";
import { dataNumberSecond } from "components/data/dataNumberPageExam";
import { dataNumberThree } from "components/data/dataNumberPageExam";

//
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
const CardTotalPageExams = () => {
  const box = {
    background: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
    transform: "translateY(-100px)",
    p: "10px 20px",
  };
  const part = "PART 1";
  const part2 = "PART 2";
  const part3 = "PART 3";

  return (
    <Box sx={box}>
      <Box sx={{ width: "100%", margin: "0 auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <Box sx={{ width: { md: "80%", display: "flex", flexWrap: "wrap" } }}>
            <CardNumberPage part={part} listNumber={dataNumber} />
            <CardNumberPage part={part2} listNumber={dataNumberSecond} />
            <CardNumberPage part={part3} listNumber={dataNumberThree} />
          </Box>
          <Box sx={{ width: { md: "20%" } }}>
            <Stack direction="row" spacing={1.5} sx={{ justifyContent: "flex-end" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#333",
                  p: "8px",
                  borderRadius: "5px",
                }}
              >
                <KeyboardArrowLeftIcon sx={{ color: "#fff", fontSize: "24px" }} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#333",
                  p: "8px",
                  borderRadius: "5px",
                }}
              >
                <KeyboardArrowRightIcon sx={{ color: "#fff", fontSize: "24px" }} />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardTotalPageExams;
