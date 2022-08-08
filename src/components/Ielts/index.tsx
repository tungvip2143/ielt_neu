import * as React from "react";
import { dataIlets } from "components/data/dataIelts";
import CardIlets from "components/Card/CardIlets";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TitleIntroExam from "components/TitleIntroExam/TitleIntroExam";

export interface IeltsSectionsProps {}
interface PropsBg3 {
  bg: string;
}
export default function IeltsSections({ bg }: PropsBg3) {
  const dataTitleIntroExam = {
    title: "Practice",
    desc: `Practice with accurate IELTS tests
    to improve your score.`,
    background: "rgb(255,245,247)",
  };
  return (
    <Box>
      <Box sx={{ background: "rgb(255,245,247)", p: "50px 0 100px 0" }}>
        <div className="container">
          <Box sx={{ width: "252px", ml: "10px" }}>
            <TitleIntroExam dataTitleIntroExam={dataTitleIntroExam} />
          </Box>
        </div>
      </Box>
      <Box sx={{ background: bg, pb: "100px" }}>
        <div className="container">
          <Grid container sx={{ transform: "translateY(-40px)" }}>
            {dataIlets.map(
              (item: {
                typeExam: string;
                timeExam: string;
                nameExam: string;
                image: string;
                hoverColor: string;
                path: string;
                skill: string;
              }) => (
                <CardIlets key={item.nameExam} exam={item} />
              )
            )}
          </Grid>
        </div>
      </Box>
    </Box>
  );
}
