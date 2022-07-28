import React from "react";
//
import TitleSecond from "components/Typography/TitleSecond";
import DescSmall from "components/Typography/DescSmall";
import CardIlets from "components/Card/CardIlets";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import { dataIlets } from "components/data/dataIelts";
//
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import IeltsSections from "components/Ielts";
import ReviewAndScore from "components/Review";
import LinkCustom from "components/Link";
import Container from "components/Container";
import Text from "components/Typography";
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

const LayoutCommon = ({ data, exams }: dataLayout) => {
  return (
    <Box>
      <Box
        sx={{
          background: data.background,
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
          display: "flex",
          justifyContent: "center",
          zIndex: "10",
          position: "relative",
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
      <Box
        sx={{
          p: "50px 10px 100px 10px",
          background: data.background,
          zIndex: "-1",
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container sx={{ display: "flex", flexDirection: "column" }} lg={9}>
          <TitleSecond>{data.sub}</TitleSecond>
          <DescSmall>{data.desc}</DescSmall>
        </Container>
      </Box>
      <Box sx={{ minHeight: "600px", background: data.background2 }}>
        <Container lg={9} className="container" sx={{ transform: "translateY(-40px)" }}>
          <Switch>
            <Route path="/ielts" exact component={IeltsSections} />
            <Route path="/ielts/scores" exact component={ReviewAndScore} />
          </Switch>
        </Container>
      </Box>
    </Box>
  );
};

export default LayoutCommon;
