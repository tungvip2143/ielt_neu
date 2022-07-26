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
          {data.title}
        </Button>
      </Box>
      <Box sx={{ p: "50px 0 100px 0", background: data.background, zIndex: "-1", position: "relative" }}>
        <div className="container">
          <TitleSecond>{data.sub}</TitleSecond>
          <DescSmall>{data.desc}</DescSmall>
        </div>
      </Box>
      <Box sx={{ minHeight: "600px", background: data.background2 }}>
        <Grid container className="container" sx={{ transform: "translateY(-40px)" }}>
          {exams.map(
            (item: { typeExam: string; timeExam: string; nameExam: string; image: string; hoverColor: string,path:string }) => (
              <CardIlets key={item.nameExam}  exam={item} />
            )
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default LayoutCommon;
