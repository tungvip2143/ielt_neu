import React from "react";
//
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
//
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CountDownItem from "./CountDownItem";
import Countdown from "react-countdown";
const CountDown = () => {
  const Countdown = {
    color: "#FEE49B",
    fontWeight: 700,
  };
  return (
    <Stack direction="row" spacing={1} sx={Countdown}>
      <AccessAlarmIcon />
      <CountDownItem />
      <Typography
        sx={{
          color: "#FEE49B",
          fontWeight: 700,
        }}
      >
        left
      </Typography>
    </Stack>
  );
};

export default CountDown;
