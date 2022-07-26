import React from "react";
//
import TitleSecond from "components/Typography/TitleSecond";
import DescSmall from "components/Typography/DescSmall";
import CardIlets from "components/Card/CardIlets";
// import { dataIlets } from "components/data/dataIelts";
//
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import FlutterDashIcon from "@mui/icons-material/FlutterDash";
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
  const contentList = {
    display: { xs: "block", md: "flex", lg: "block" },
  };
  const contentListTitle = {
    p: "50px 0 100px 0",
    zIndex: "-1",
    position: "relative",
    width: { xs: "100%", md: "35%", lg: "100%" },
  };
  const contentListExams = {
    minHeight: "600px",
    width: { xs: "100%", md: "65%", lg: "100%" },
  };
  const content = {
    position: "absolute",
    top: "50px",
    zIndex: "999",
    left: "0",
    right: "0",
    margin: "auto",
  };
  const contentListExamsContainer = {
    transform: { xs: "translateY(-40px)", md: "translateY(20px)", lg: "translateY(-40px)" },
    display: { xs: "block", md: "block", lg: "flex" },
  };
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
          {data.title}
        </Button>
      </Box>
      <Box
        sx={{
          background: data.background,
          height: "300px",
        }}
      ></Box>
      <Box
        sx={{
          background: data.background2,
          height: { xs: "800px", lg: "700px" },
        }}
      ></Box>
      <Box sx={content}>
        <div className="container">
          <Box sx={contentList}>
            <Box sx={contentListTitle}>
              <TitleSecond>{data.sub}</TitleSecond>
              <Box sx={{ maxWidth: { xs: "250px", md: "100%", lg: "280px" } }}>
                <DescSmall>{data.desc}</DescSmall>
              </Box>
            </Box>
            <Box sx={contentListExams}>
              <Grid container className="" sx={contentListExamsContainer}>
                {exams.map(
                  (item: {
                    typeExam: string;
                    timeExam: string;
                    nameExam: string;
                    image: string;
                    hoverColor: string;
                  }) => (
                    <CardIlets exam={item} />
                  )
                )}
              </Grid>
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default LayoutCommon;
