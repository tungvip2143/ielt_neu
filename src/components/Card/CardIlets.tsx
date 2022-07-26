import React from "react";
//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
//
import TextTitleCard from "components/Typography/TextTitleCard";
import TextSubCard from "components/Typography/TextSubCard";
import ButtonOutLineCommon from "components/Button/ButtonOutLineCommon";
//! type
interface Exam {
  exam: {
    typeExam: string;
    timeExam: string;
    nameExam: string;
    image: string;
    hoverColor: string;
  };
}
const CardIlets = ({ exam }: Exam) => {
  //! State
  const CardList = {
    borderRadius: "15px",
    m: "0 10px",
    p: "32px 24px 24px 32px",
    boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#fff",
      background: "rgb(255,160,176)",
      //rgb(239,252,187)
      //rgb(198,247,252)
      //rgb(255,203,116)
    },
  };
  //! Render
  return (
    <Grid item xs={12} sm={6} md={6} lg={3}>
      <Card sx={CardList} className={exam.hoverColor}>
        <Box sx={{ maxWidth: "112px", pb: "15px" }}>
          <TextTitleCard>{exam.typeExam}</TextTitleCard>
        </Box>
        <Stack direction="row" spacing={1} sx={{ pb: "25px" }}>
          <AccessAlarmIcon />
          <TextSubCard>{exam.timeExam}</TextSubCard>
        </Stack>
        <ButtonOutLineCommon>{exam.nameExam}</ButtonOutLineCommon>
        <Box>
          <img style={{ transform: "translateX(-30px)" }} src={exam.image} alt="" />
        </Box>
      </Card>
    </Grid>
  );
};

export default CardIlets;
{
  /* <Box></Box> */
}
