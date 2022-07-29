import React from "react";
//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

//
import Sub20BoldIlets from "components/Typography/Sub20BoldIlets";
import DescSmall from "components/Typography/DescSmall";
//
// ! type
interface Data {
  part: string;
  guide: string;
}
const CardPart = ({ part, guide }: Data) => {
  const card = {
    p: "16px 32px",
    boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
    width: "100%",
    borderRadius: "16px",
    margin: "0 auto",
  };
  return (
    <Card sx={card}>
      <Stack direction="row" spacing={4} sx={{ alignItems: "center" }}>
        <Sub20BoldIlets>{part}</Sub20BoldIlets>
        <DescSmall>{guide}</DescSmall>
      </Stack>
    </Card>
  );
};

export default CardPart;
