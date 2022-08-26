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
  idExam?: any;
}
const TitleIntroExam = ({ dataTitleIntroExam, idExam }: Props) => {
  const examinationName = localStorage.getItem("examinationName") || "";
  console.log("examinationName", examinationName);
  return (
    <Box>
      <Text.SubTitle sx={{ mb: "30px" }}>{`Exam ${examinationName}`}</Text.SubTitle>
      <Text.DescSmallCard sx={{ color: "#8A8C91" }}>{dataTitleIntroExam.desc}</Text.DescSmallCard>
    </Box>
  );
};

export default TitleIntroExam;
