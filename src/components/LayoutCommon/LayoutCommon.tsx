import React from "react";
//
import CardIlets from "components/Card/CardIlets";
import "App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import { dataIlets } from "components/data/dataIelts";
//
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import IeltsSections from "components/Ielts";
import ReviewAndScore from "components/Review";
import LinkCustom from "components/Link";
import Container from "components/Container";

//
// ! type
interface dataLayout {
  data: {
    title: string;
    sub: string;
    desc: string;
    background: string;
    background2: string;
  };
  exams: any;
}
const bgReview = {
  background2: "rgb(255,229,234)",
};

const LayoutCommon = ({ data, exams }: dataLayout) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          background: data.background,
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
          justifyContent: "center",
          zIndex: "10",
          position: "relative",
          display: { xs: "none", lg: "flex" },
        }}
      >
        <Button
          variant="text"
          sx={{ fontSize: "16px" }}
          color="error"
          startIcon={<FlutterDashIcon sx={{ fontSize: "20px" }} />}
        >
          <LinkCustom to="/ielts">{data.title}</LinkCustom>
        </Button>
        <Button>
          <LinkCustom to="/ielts/scores">Review</LinkCustom>
        </Button>
      </Box>

      <Switch>
        <Route path="/ielts" exact>
          <IeltsSections bg="rgb(255,229,234)" />
        </Route>
        <Route path="/ielts/scores" exact>
          <ReviewAndScore bg={bgReview} />
        </Route>
      </Switch>
      {/*  
        <Container lg={9} className="container" sx={{ transform: "translateY(-40px)" }}>
        */}
    </Box>
  );
};

export default LayoutCommon;
