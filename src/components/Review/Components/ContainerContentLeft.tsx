import React from "react";
import Box from "@mui/material/Box";
import { themeCssSx } from "../../../ThemeCssSx/ThemeCssSx";
//
interface Props {
  children: React.ReactNode;
}
const container = {
  padding: "16px 32px",
  border: "1px solid #ccc",
  borderRadius: "16px",
  color: themeCssSx.color.title,
  fontSize: themeCssSx.fontSize.desc,
  fontWeight: "bold",
};
const ContainerContentLeft = (props: Props) => {
  return <Box sx={container}>{props.children}</Box>;
};

export default ContainerContentLeft;
