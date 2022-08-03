import React from "react";
//
import Text from "components/Typography/index";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
// !type
interface Props {
  dataChangePart: any;
}
const CardLeft = ({ dataChangePart }: Props) => {
  console.log("content-p2", dataChangePart);
  return <Box sx={{ pb: "100px" }}>{dataChangePart.data}</Box>;
};

export default CardLeft;
