import { makeStyles } from "@mui/styles";
import { FastField, useFormikContext } from "formik";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import { TextField } from "components/Textfield";

type Props = {
  data: any;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: 8,
  },
}));

const MachingType = (props: Props) => {
  // !Style
  const classes = useStyles();
  const { data } = props;
  const index = Number(data?.question?.displayNumber) - 1;

  console.log("data3456", data);
  const { setFieldValue } = useFormikContext();

  const handleFocus = () => {
    setFieldValue(`answers[${index}].questionId`, data?.questionId || "");
  };

  return (
    <div>
      <div className={classes.root}>
        {`${data?.question?.displayNumber}.`}
        {ReactHtmlParser(data?.question?.questionText)}
        <FastField onFocus={handleFocus} component={TextField} name={`answers[${index}].studentAnswer`} size="small" />
      </div>
      <div></div>
    </div>
  );
};

export default MachingType;
