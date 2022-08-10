import React from "react";
//
import Box from "@mui/material/Box";

const NavLeft = () => {
  const nav = {
    height: "100vh",
    width: "300px",
    background: "red",
    display: { xs: "block", lg: "none" },
    position: "fixed",
    top: 0,
    zIndex: 999,
  };
  return <Box sx={nav}>NavLeft</Box>;
};

export default NavLeft;
