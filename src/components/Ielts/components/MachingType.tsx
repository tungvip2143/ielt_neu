import { makeStyles } from "@mui/styles";
import { FastField, useFormikContext } from "formik";
import React, { Fragment } from "react";
import ReactHtmlParser from "react-html-parser";
import { TextField } from "components/Textfield";

type Props = {
  data: any;
  questionBox: string;
  answerList: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: 8,
    flexDirection: "column",
  },
  questionBox: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: 8,
  },
  question: {
    display: "flex",
    gap: 8,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
}));

const MachingType = (props: Props) => {
  // !Style
  const classes = useStyles();
  const { data, questionBox, answerList } = props;

  console.log("data3456", data);
  const { setFieldValue } = useFormikContext();

  const handleFocus = (index: number) => {
    setFieldValue(`answers[${index}].questionId`, data?.questionId || "");
  };

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        {data?.map((question: any) => {
          const index = Number(question?.question?.displayNumber) - 1;
          console.log("question", data);
          return (
            <div className={classes.question} key={question._id}>
              {`${question?.question?.displayNumber}.`}
              {ReactHtmlParser(question?.question?.questionText)}
              <FastField
                onFocus={() => handleFocus(index)}
                component={TextField}
                name={`answers[${index}].studentAnswer`}
                size="small"
              />
            </div>
          );
        })}
      </div>
      <div className={classes.questionBox}>{ReactHtmlParser(answerList)}</div>
    </div>
  );
};

export default MachingType;
