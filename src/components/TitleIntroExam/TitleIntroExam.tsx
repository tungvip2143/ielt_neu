import React from "react";
//
import Container from "components/Container";
import Text from "components/Typography";
import Box from "@mui/material/Box";

// ! type
interface Props {
  dataTitleIntroExam: {
    title: string;
    desc: string;
    background: string;
  };
}
const TitleIntroExam = ({ dataTitleIntroExam }: Props) => {
  return (
    <Box>
      <Text.SubTitle sx={{ mb: "30px" }}>{dataTitleIntroExam.title}</Text.SubTitle>
      <Text.DescSmallCard sx={{ color: "#8A8C91" }}>{dataTitleIntroExam.desc}</Text.DescSmallCard>
    </Box>
  );
};

export default TitleIntroExam;
