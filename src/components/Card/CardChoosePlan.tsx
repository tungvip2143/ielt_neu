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
  header: React.ReactNode;
  headerNoSale?: React.ReactNode;
  isShowSale?: boolean;
  desc: React.ReactNode;
  discounted?: React.ReactNode;
  className?: string;
}
import ButtonBuyNow from "components/Button/ButtonBuyNow";
const CardChoosePlan = ({ header, headerNoSale, desc, discounted, isShowSale, className }: Data) => {
  // ! State
  console.log(isShowSale);
  // ! Function
  const card = {
    p: "25px 20px",
    boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
    position: "relative",
  };
  const cardChoosePlanItem = {
    m: { xs: "0", md: "0 25px" },
    mt: { xs: "30px", lg: "0" },
    maxWidth: "400px !important",
  };
  // ! Render

  return (
    <Grid item xs={12} md={5} lg={3.6} sx={cardChoosePlanItem}>
      <Card className={className} sx={card}>
        <Box sx={{ minHeight: "150px" }}>{isShowSale ? header : headerNoSale}</Box>
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
