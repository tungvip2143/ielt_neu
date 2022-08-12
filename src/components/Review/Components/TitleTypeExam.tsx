import React from "react";
//
import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import Text from "components/Typography/index";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ButtonCommon from "components/Button/ButtonCommon";
import { FieldProps } from "formik";
import Typography from "@mui/material/Typography";
//
const btnScore = {
  background: "#E8EAED",
  color: "#000000",
  width: "100%",
  mb: "20px",
  p: "6px !important",
  "&:hover": { background: "#E8EAED" },
};
// ! type
interface Props {
  title?: any;
  typeExam?: any;
}
const container = {
  mb: "30px",
};
const TitleTypeExam = (props: Props) => {
  const { title, typeExam } = props;
  console.log("propsTitle", props);
  return (
    <Box sx={container}>
      <ButtonCommon.ButtonFullBg sx={btnScore}>{title}</ButtonCommon.ButtonFullBg>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Typography variant="body1" color="initial">
          {typeExam}
        </Typography>
        <KeyboardArrowUpIcon />
      </Stack>
    </Box>
  );
};

export default TitleTypeExam;
