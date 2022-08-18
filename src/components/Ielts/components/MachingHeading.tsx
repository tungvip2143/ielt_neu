import React from "react";
import ReactHtmlParser from "react-html-parser";
import { makeStyles } from "@mui/styles";
import { FastField, useFormikContext } from "formik";
import { TextField } from "components/Textfield";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: 16,
    flexDirection: "column",
  },
  question: {
    display: "flex",
    gap: 16,
  },
  questionBox: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  answerList: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: 16,
  },
}));
type Props = {
  data?: any;
  answerList: string;
  question: any;
};

const MachingHeading = (props: Props) => {
  // !State
  const classes = useStyles();
  const { data, answerList, question } = props;
  const { setFieldValue } = useFormikContext();
  const handleFocus = (displayNumber: number) => {
    setFieldValue(`answers[${displayNumber}].questionId`, data?.questionId || "");
  };
  return (
    <div className={classes.root}>
      <div className={classes.questionBox}>
        {question.map((question: any): any => {
          const displayNumber = question?.question?.displayNumber;
          return (
            <div className={classes.question}>
              {ReactHtmlParser(question?.question?.questionText)}
              <FastField
                size="small"
                name={`answers[${displayNumber - 1}].studentAnswer`}
                onFocus={() => handleFocus(displayNumber)}
                component={TextField}
              />
            </div>
          );
        })}
      </div>

      <div className={classes.answerList}>{ReactHtmlParser(answerList)}</div>
    </div>
  );
};

export default MachingHeading;
