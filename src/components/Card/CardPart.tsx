import React from "react";
//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
//
import Text from "components/Typography/index";
//
// ! type
interface Data {
  part?: number;
  children?: any;
}
const CardPart = ({ part, children }: Data) => {
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
        <Text.Sub20Bold sx={{ color: "#36373b" }}>{`Part ${part}`}</Text.Sub20Bold>
        <Text.DescSmallCard>{children}</Text.DescSmallCard>
      </Stack>
    </Card>
  );
};

export default CardPart;
