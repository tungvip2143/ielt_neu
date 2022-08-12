import React from "react";
//
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
//
import ButtonCommon from "components/Button/ButtonCommon";
import Text from "components/Typography/index";
//
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { dataTotalNumber } from "components/data/dataNumberPageExam";
import Header from "views/Ielts/Header/Header";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TitleTypeExam from "./TitleTypeExam";
import Writing from "../../../views/Ielts/writing/component/Writing";
//
// ! type

const useStyles = makeStyles((theme) => ({
  container: {
    // padding: "0 16px",
  },
  header: {
    padding: "13px 16px",
    background: "#36373b",
    width: "100%",
    display: "flex",
    gap: 16,
    alignItems: "center",
  },
  navLeft: {
    width: "180px",
    padding: "40px 16px",
    background: "#f0f9ff",
    height: `calc(100vh - 63px)`,
  },
  content: {
    padding: "0 16px",
  },
}));
interface Props {
  children: React.ReactNode;
  typeExam?: any;
  title?: any;
}
const btn = {
  background: "#E8EAED",
  width: "24px !important",
  height: "24px",
  minWidth: "0 !important",
  p: "0 !important",
  mt: "5px",
  borderRadius: "0 !important",
  fontSize: "12px !important",
  color: "#D7000D !important",
  fontWeight: "300 !important",
  "&:hover": {
    background: "#E8EAED",
  },
};

const ReviewContainer = (props: Props) => {
  // !State
  const classes = useStyles();
  const { children, typeExam, title } = props;
  console.log("props", props);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Button size="small" variant="outlined">
          Exit
        </Button>
        <Text.Sub20Bold>ABC</Text.Sub20Bold>s
      </div>
      <Stack className={classes.content} direction={{ xs: "column", lg: "row" }} spacing={3}>
        <Box className={classes.navLeft}>
          <TitleTypeExam typeExam={typeExam} title={title} />
          <Stack direction="row" sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
            {dataTotalNumber.map((item) => {
              return <ButtonCommon.ButtonNumber sx={btn}>{item.number}</ButtonCommon.ButtonNumber>;
            })}
          </Stack>
        </Box>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{ width: { xs: "100%", md: "87%" }, mr: "24px !important", mt: "40px !important" }}
        >
          {children}
        </Stack>
      </Stack>
    </div>
  );
};

export default ReviewContainer;
