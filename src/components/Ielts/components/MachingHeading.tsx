import React from "react";
import ReactHtmlParser from "react-html-parser";
import { makeStyles } from "@mui/styles";
import { FastField, useFormikContext } from "formik";
import { TextField } from "components/Textfield";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: 16,
  },
}));
type Props = {
  data?: any;
};

const MachingHeading = (props: Props) => {
  // !State
  const classes = useStyles();
  const { data } = props;
  console.log("datamaching", data);
  const index = Number(data.question.displayNumber) - 1;
  const { setFieldValue } = useFormikContext();
  const handleFocus = () => {
    setFieldValue(`answers[${index}].questionId`, data?.questionId || "");
  };
  return (
    <div className={classes.root}>
      {ReactHtmlParser(data?.question?.questionText)}
      <FastField size="small" name={`answers[${index}].studentAnswer`} onFocus={handleFocus} component={TextField} />
    </div>
  );
};

export default MachingHeading;
