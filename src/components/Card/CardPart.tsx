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
  content?: string;
}
const CardPart = ({ content }: Data) => {
  const card = {
    p: "12px 10px",
    boxShadow: "0 0.0714em 0.214em rgb(0 0 0 / 25%)",
    background: "#fff",
  };

  return (
    <Box sx={card}>
      <Stack direction="row" spacing={4} sx={{ alignItems: "center" }}>
        <Text.DescMedium sx={{ color: "#36373b", fontWeight: 700 }}>{content}</Text.DescMedium>
      </Stack>
    </Box>
  );
};

export default CardPart;
