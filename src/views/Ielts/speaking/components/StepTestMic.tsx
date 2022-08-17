import React from "react";
import { Box, Stack, Button } from "@mui/material";
import Text from "../../../../components/Typography/index";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
//
const container = {
  width: { xs: "90%", md: "90%", lg: "85%" },
  borderRadius: "16px",
  margin: "0 auto",
  boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
  padding: { xs: "24px 20px", md: "48px 50px 44px 50px" },
  // padding: "48px 50px 44px 50px",
  mt: "30px",
};
const contentContainer = {
  alignItems: "center",
};
const title = {
  mb: "10px !important",
};
const titleSecond = {
  p: "28px 68px",
  background: "#e3f2fd",
  fontSize: themeCssSx.fontSize.descMedium,
  fontWeight: 700,
  borderRadius: "12px",
  mb: "20px",
};
const startBtn = {
  background: "#f6475a",
  p: "12px 70px",
  borderRadius: "16px",
  mb: "20px",
  "&:hover": {
    background: "#f6475a",
  },
};
const desc = {
  fontSize: themeCssSx.fontSize.descMedium,
  color: themeCssSx.color.title,
  fontWeight: 500,
  mb: "5px",
};
const nextStep = {
  background: "#B8BCC0",
  width: "30%",
  margin: "0 auto",
  padding: "12px 0",
  "&:hover": {
    background: "#B8BCC0",
  },
};
const StepTestMic = () => {
  return (
    <Box sx={container}>
      <Stack direction="column" sx={contentContainer}>
        <Text.Title32bold sx={title}>Microphone Test</Text.Title32bold>
        <Text.Desc16 sx={titleSecond}>Briefly introduce yourseft</Text.Desc16>
        <Button sx={startBtn} variant="contained" startIcon={<KeyboardVoiceIcon />}>
          START RECORDING
        </Button>
        <Box sx={{ maxWidth: "520px", pl: "40px", mb: "30px" }}>
          <Text.Desc16 sx={desc}>1.Record yourself answering the statement above.</Text.Desc16>
          <Text.Desc16 sx={desc}>2.Check your recording and make sure you can’t hear any background noise.</Text.Desc16>
          <Text.Desc16 sx={desc}>3.Check your recording and make sure you can’t hear any background noise.</Text.Desc16>
        </Box>
        <Button sx={nextStep} variant="contained">
          NEXT
        </Button>
      </Stack>
    </Box>
  );
};

export default StepTestMic;
