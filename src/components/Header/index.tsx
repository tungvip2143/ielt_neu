import { Button, Container, Divider, Grid, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import ContainerCustom from "components/Container";
import LinkCustom from "components/Link";
import React from "react";
import Box from "@mui/material/Box";

//
import imgLogo from "assets/image/logo/logo.svg";
import Text from "components/Typography/index";
const Header: React.FC = (props) => {
  // TODO : Refactor Header
  const TextExams = {
    color: "#000000 !important",
    fontSize: "18px !important",
    p: "6px 20px",
    "&:hover": {
      background: "#ffe5ea",
      borderRadius: "10px",
    },
  };
  const TextExams1 = {
    color: "#000000 !important",
    fontSize: "18px !important",
    p: "6px 20px",
    "&:hover": {
      background: "#e4edfe",
      borderRadius: "10px",
    },
  };
  const TextSecond = {
    fontWeight: "bold",
    color: "#5b5c61",
    p: "8px 16px",
    "&:hover": {
      background: "#f7f9fb",
      borderRadius: "16px",
    },
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 1,
        borderBottom: "2px solid #e7eaed",
        position: "fixed",
        zIndex: 999,
        background: "#fff",
        width: "100%",
      }}
    >
      <div className="container">
        <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Grid item xs={8} md={8}>
            <Grid container sx={{ justifyContent: "space-between" }}>
              <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <NavLink to={"/"}>
                  <img src={imgLogo} alt="" />
                </NavLink>
                <NavLink to="/TOFFL" activeClassName="toefl" className="nav-link">
                  <Text.Sub20Bold sx={TextExams1}>TOEFL</Text.Sub20Bold>
                </NavLink>
                <NavLink to="/ielts" activeClassName="ilets" className="nav-link">
                  <Text.Sub20Bold className="child-active" sx={TextExams}>
                    IELTS
                  </Text.Sub20Bold>
                </NavLink>
              </Grid>
              <Box sx={{ width: "1px", height: "30px", background: "#e7eaed" }} />
              <Grid item xs={5.5} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <NavLink to="/pricing">
                  <Text.DescSmall sx={TextSecond}>Pricing</Text.DescSmall>
                </NavLink>
                <NavLink to="#">
                  <Text.DescSmall sx={TextSecond}>Community</Text.DescSmall>
                </NavLink>
                <NavLink to="#">
                  <Text.DescSmall sx={TextSecond}>User Reviews</Text.DescSmall>
                </NavLink>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} md={4}>
            <Stack spacing={2} direction="row" sx={{ justifyContent: "flex-end" }}>
              <Button variant="outlined" sx={{ color: "#5b5c61", border: "1px solid rgb(91, 92, 97)" }}>
                Login
              </Button>
              <Button variant="contained">TRY FOR FREE</Button>
            </Stack>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Header;
