import React from "react";
//
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { themeCssSx } from "../../../ThemeCssSx/ThemeCssSx";
import { useHistory } from "react-router-dom";
//
// ! type

// ! Css
const header = {
  background: "#36373b",
  padding: "0 28px",
  height: "64px",
  display: "flex",
  alignItems: "center",
};
const btnExit = {
  color: "#fff",
  border: "1px solid #fff",
  fontWeight: 700,
  padding: "5px 32px",
  letterSpacing: "2px",
  "&:hover": {
    border: "1px solid #fff",
  },
};

const HeaderReview = () => {
  const history = useHistory();
  const goBackReview = () => {
    history.push("/ielts/scores");
  };
  return (
    <Box sx={header}>
      <Button onClick={goBackReview} variant="outlined" sx={btnExit}>
        Exit
      </Button>
    </Box>
  );
};

export default HeaderReview;
