import React from "react";
//
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
//
// ! type
interface Data {
  header: any;
  desc: any;
  discounted?: any;
}
import ButtonBuyNow from "components/Button/ButtonBuyNow";
const CardChoosePlan = ({ header, desc, discounted }: Data) => {
  const card = {
    p: "25px 20px",
    boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
  };
  return (
    <Grid item xs={12} md={3.6} sx={{ m: "0 25px", height: "100% !important" }}>
      <Card sx={card}>
        <Box>{header}</Box>
        <Box sx={{ m: "16px 0" }}>
          <ButtonBuyNow>Buy now</ButtonBuyNow>
        </Box>
        <Box>{desc}</Box>
        <Box>{discounted}</Box>
      </Card>
    </Grid>
  );
};

export default CardChoosePlan;
