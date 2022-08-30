import React, { useState } from "react";
//
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// import { dataIlets } from "components/data/dataIelts";
//
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import IeltsSections from "components/Ielts";
import ReviewAndScore from "components/Review";
import LinkCustom from "components/Link";
import FactCheckIcon from "@mui/icons-material/FactCheck";

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
const btnLink = {
  fontSize: "16px",
  color: "#5b5c61",
  height: "35px",
  p: "0 20px",
  "&:hover": {
    background: "#ffe5ea",
    borderRadius: "16px",
  },
};
const LayoutCommon = ({ data, exams }: dataLayout) => {
  const [isHightLightPractive, isSetIsHightLight] = useState<boolean>(true);
  const [isHightLightReview, isSetIsHightRiview] = useState<boolean>(false);

  const handleHightLightReview = () => {
    isSetIsHightLight(false);
    isSetIsHightRiview(true);
  };
  const handleHightPractive = () => {
    isSetIsHightLight(true);
    isSetIsHightRiview(false);
  };
  const heaer = {
    background: data.background,
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
    justifyContent: "center",
    zIndex: "10",
    position: "relative",
    display: { xs: "none", lg: "flex" },
    p: "5px 0",
  };
  return (
    <Box sx={{ position: "relative", pt: "68px" }}>
      <Box sx={heaer}>
        <Link to="/ielts">
          <Button
            onClick={handleHightPractive}
            className={isHightLightPractive ? "hight-light-practive" : ""}
            variant="text"
            sx={btnLink}
            color="error"
            startIcon={<FlutterDashIcon sx={{ fontSize: "24px !important" }} />}
          >
            {data.title}
          </Button>
        </Link>
        <Link to="/ielts/scores">
          <Button
            onClick={handleHightLightReview}
            className={isHightLightReview ? "hight-light-review" : ""}
            sx={btnLink}
            startIcon={<FactCheckIcon sx={{ fontSize: "24px !important", color: "#5b5c61" }} />}
          >
            Scores & Review
          </Button>
        </Link>
      </Box>

      <Switch>
        <Route path="/ielts" exact>
          <IeltsSections bg="rgb(255,229,234)" />
        </Route>
        <Route path="/ielts/scores" exact>
          <ReviewAndScore bg={bgReview} />
        </Route>
      </Switch>
    </Box>
  );
};

export default LayoutCommon;
