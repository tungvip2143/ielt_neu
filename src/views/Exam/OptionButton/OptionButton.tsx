import React from "react";
import { Box } from "@mui/material";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
// !type
interface Props {
  children?: string;
}
const OptionButton = (props: Props) => {
  const contianer = {
    ...themeCssSx.flexBox.flexJusAlign,
    backgroundColor: "#6aade4",
    padding: "4px 14px",
    borderRadius: "6px",
    fontSize: "14px",
  };
  const { children } = props;
  return <Box sx={contianer}>{children}</Box>;
};

export default OptionButton;
