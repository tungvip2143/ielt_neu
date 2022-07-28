import React from "react";
//
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//
import DescNormal from "../../components/Typography/DescNormal";
const ChoosePlan = () => {
  return (
    <Box sx={{ p: "100px 0" }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "48px", fontWeight: "bold", color: "#000000", pb: "5px" }}>
          Choose the best plan for you
        </Typography>
        <DescNormal>Join the 2,500,000+ students currently studying with TestGlider</DescNormal>
      </Box>
    </Box>
  );
};

export default ChoosePlan;
