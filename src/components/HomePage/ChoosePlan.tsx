import React from "react";
//
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

//
import DescNormal from "components/Typography/DescNormal";
import CardChoosePlan from "components/Card/CardChoosePlan";

const ChoosePlan = () => {
  const Header = () => {
    return (
      <>
        <Typography sx={{ fontSize: "24px", color: "#114AC6", fontWeight: "bold" }}>Subscription Pass</Typography>
        <Stack direction="row" spacing={1} sx={{ p: "10px 0" }}>
          <Typography sx={{ fontSize: "20px", color: "#114AC6", fontWeight: "bold" }}>$39,99</Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#DEF876",
              fontWeight: "bold",
              p: "3px 10px",
              background: "#114AC6",
              borderRadius: "5px",
            }}
          >
            25% OFF
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography sx={{ fontSize: "48px", color: "#114AC6", fontWeight: "bold" }}>$29,99</Typography>
          <Typography sx={{ fontSize: "14px", color: "#114AC6", fontWeight: "bold", marginTop: "35px !important" }}>
            USD
          </Typography>
        </Stack>
      </>
    );
  };
  const Desc = () => {
    return (
      <>
        <Stack direction="column" spacing={2} sx={{ maxWidth: "250px", mt: "30px !important" }}>
          <Stack direction="row" spacing={1}>
            <CheckCircleIcon sx={{ fontSize: "24px", color: "#114AC6" }} />
            <Typography sx={{ fontSize: "14px", color: "#114AC6" }}>
              For users who plan to study for more than month
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <CheckCircleIcon sx={{ fontSize: "24px", color: "#114AC6" }} />
            <Typography sx={{ fontSize: "14px", color: "#114AC6" }}>Access to 12 full mock test</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <CheckCircleIcon sx={{ fontSize: "24px", color: "#114AC6" }} />
            <Typography sx={{ fontSize: "14px", color: "#114AC6" }}>Recurring billing every month</Typography>
          </Stack>
        </Stack>
      </>
    );
  };
  return (
    <Box sx={{ p: "100px 0" }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "48px", fontWeight: "bold", color: "#000000", pb: "5px" }}>
          Choose the best plan for you
        </Typography>
        <DescNormal>Join the 2,500,000+ students currently studying with TestGlider</DescNormal>
      </Box>
      <Grid container sx={{ justifyContent: "center", mt: "80px" }}>
        <CardChoosePlan header={<Header />} desc={<Desc />} />
        <CardChoosePlan header={<Header />} desc={<Desc />} />
      </Grid>
    </Box>
  );
};

export default ChoosePlan;
