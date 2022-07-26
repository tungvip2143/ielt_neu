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
import TextSubBold from "components/Typography/TextSubBold";
import TextSmall from "components/Typography/TextSmall";
//
import LockIcon from "@mui/icons-material/Lock";

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
    p: { xs: "20px 20px", sm: "20px 30px", md: "20px 30px", lg: "32px 24px 24px 32px" },
    boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px",
    cursor: "pointer",
    position: "relative",
    marginBottom: { xs: "20px", lg: "0" },
    "&:hover": {
      background: "rgb(255,160,176)",
    },
  };
  const contentList = {
    display: { xs: "flex", sm: "flex", md: "flex", lg: "block" },
    justifyContent: { xs: "space-between", lg: "" },
  };
  //! Render
  return (
    <Grid item xs={12} sm={12} md={12} lg={3} sx={{ position: "relative" }}>
      <Card sx={CardList} className={exam.hoverColor}>
        <Box sx={contentList}>
          <Box>
            <Box sx={{ maxWidth: { xs: "100%", lg: "112px" }, pb: "15px" }}>
              <TextTitleCard>{exam.typeExam}</TextTitleCard>
            </Box>
            <Stack direction="row" spacing={1} sx={{ pb: "25px" }}>
              <AccessAlarmIcon />
              <TextSubCard>{exam.timeExam}</TextSubCard>
            </Stack>
            <ButtonOutLineCommon>{exam.nameExam}</ButtonOutLineCommon>
          </Box>
          <Box sx={{ width: { xs: "100px", sm: "120px", md: "150px", lg: "248px" } }}>
            <img style={{ transform: "translateX(-20px)", width: "100%" }} src={exam.image} alt="" />
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "flex", lg: "none" },
            position: "absolute",
            background: { xs: "#fff", lg: "0" },
            opacity: "0.9",
            width: "100%",
            height: "100%",
            zIndex: 999,
            borderRadius: "15px",
            top: 0,
            left: 0,
            padding: "50px 30px",
          }}
        >
          <Stack sx={{ width: "100%" }} direction="row" spacing={2}>
            <Box sx={{ width: { xs: "90%", md: "60%", lg: "" } }}>
              <TextSubBold>Access from PC, please.</TextSubBold>
              <TextSmall>We currently do not support tests for mobile and tablet.</TextSmall>
            </Box>
            <Box>
              <LockIcon sx={{ fontSize: "100px", color: "#ccc", zIndex: 10 }} />
            </Box>
          </Stack>
        </Box>
      </Card>
    </Grid>
  );
};

export default CardIlets;
{
  /* <Box></Box> */
}
