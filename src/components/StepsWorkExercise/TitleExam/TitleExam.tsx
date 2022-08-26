import React from "react";
//
import Text from "components/Typography/index";
import ReactHtmlParser from "react-html-parser";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    gap: 16,
  },
}));

// !type
interface Props {
  dataNumber?: {
    from: any;
    to: any;
  };
  title?: any;
}

const TitleExam = ({ dataNumber, title }: Props) => {
  // !State
  const classes = useStyles();

  const groupStartNumber = title?.questions[0]?.question?.displayNumber;

  const groupEndNumber = title?.questions[title.questions.length - 1]?.question?.displayNumber;
  return (
    <>
      <div className={classes.title}>
        <Text.Desc16
          sx={{ fontSize: "18px !important", fontWeight: "bold", mb: "20px", display: "block" }}
        >{`Question ${groupStartNumber} - ${groupEndNumber}`}</Text.Desc16>
        {/* <Text.Desc16>Click on question to show your answer and explanation</Text.Desc16> */}
      </div>

      <Text.Desc16 sx={{ mb: "20px" }}>{ReactHtmlParser(title?.directionText)}</Text.Desc16>
    </>
  );
};

export default TitleExam;
