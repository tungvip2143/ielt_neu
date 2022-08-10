import React from "react";
import Box from "@mui/material/Box";
//
import MenuIcon from "@mui/icons-material/Menu";
const HeaderResponsive = () => {
  const container = {
    display: { xs: "flex", lg: "none" },
    padding: "0 24px",
    height: "76px",
    borderBottom: "1px solid #ccc",
    justifyContent: "space-beetween",
    alignItems: "center",
  };
  const iconMenu = {
    fontSize: "40px",
  };
  return (
    <Box>
      <Box sx={container}>
        <MenuIcon sx={iconMenu} />
        <Box></Box>
      </Box>
    </Box>
  );
};

export default HeaderResponsive;
