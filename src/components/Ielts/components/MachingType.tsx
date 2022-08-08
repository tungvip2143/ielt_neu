import { makeStyles } from "@mui/styles";
import { FastField, useFormikContext } from "formik";
import React, { Fragment } from "react";
import ReactHtmlParser from "react-html-parser";
import { TextField } from "components/Textfield";

type Props = {
  data: any;
  questionBox: string;
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
  },
  question: {
    display: "flex",
    gap: 8,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
}));

const MachingType = (props: Props) => {
  // !Style
  const classes = useStyles();
  const { data, questionBox } = props;
  const index = Number(data?.question?.displayNumber) - 1;

  console.log("data3456", data);
  const { setFieldValue } = useFormikContext();

  const handleFocus = () => {
    setFieldValue(`answers[${index}].questionId`, data?.questionId || "");
  };

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        {data?.map((question: any) => (
          <div className={classes.question} key={question._id}>
            {`${question?.question?.displayNumber}.`}
            {ReactHtmlParser(question?.question?.questionText)}
            <FastField
              onFocus={handleFocus}
              component={TextField}
              name={`answers[${index}].studentAnswer`}
              size="small"
            />
          </div>
        ))}
      </div>
      <div className={classes.questionBox}>{ReactHtmlParser(questionBox)}</div>
    </div>
  );
};

export default MachingType;
