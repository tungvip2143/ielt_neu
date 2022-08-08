import React from "react";
//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
//
import ButtonCommon from "components/Button/ButtonCommon";
import Text from "components/Typography/index";
//
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { dataTotalNumber } from "components/data/dataNumberPageExam";
const ReviewExams = () => {
  const navLeft = {
    width: "180px",
    p: "40px 20px",
    background: "#f0f9ff",
    height: "100vh",
  };
  const BoxExam = () => {
    const boxExam = {
      p: "24px 32px",
      borderRadius: "20px",
      height: "630px",
      overflowY: "scroll",
      width: { xs: "100%", md: "50%" },
      border: "1px solid #ccc",
    };

    return <Box sx={boxExam}></Box>;
  };
  return (
    <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
      <Box sx={navLeft}>
        <ButtonCommon.ButtonFullBg
          sx={{
            background: "#E8EAED",
            color: "#000000",
            width: "100%",
            p: "6px !important",
            "&:hover": { background: "#E8EAED" },
          }}
        >
          Score : 0/9
        </ButtonCommon.ButtonFullBg>
        <Stack direction="row" sx={{ justifyContent: "space-between", m: "32px 0 24px 0" }}>
          <Text.DescSmall sx={{ color: "#111114", fontSize: "12px", fontWeight: "bold" }}>Listening</Text.DescSmall>
          <KeyboardArrowUpIcon />
        </Stack>
        <Stack direction="row" sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
          {dataTotalNumber.map((item) => {
            return (
              <ButtonCommon.ButtonNumber
                sx={{
                  background: "#E8EAED",
                  width: "24px !important",
                  height: "24px",
                  minWidth: "0 !important",
                  p: "0 !important",
                  mt: "5px",
                  borderRadius: "0 !important",
                  fontSize: "12px !important",
                  color: "#D7000D !important",
                  fontWeight: "300 !important",
                  "&:hover": {
                    background: "#E8EAED",
                  },
                }}
              >
                {item.number}
              </ButtonCommon.ButtonNumber>
            );
          })}
        </Stack>
      </Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{ width: { xs: "100%", md: "87%" }, mr: "24px !important", mt: "40px !important" }}
      >
        <BoxExam />
        <BoxExam />
      </Stack>
    </Stack>
  );
};

export default ReviewExams;
