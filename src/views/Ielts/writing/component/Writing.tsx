import { makeStyles } from "@mui/styles";
import { TextField, Textarea } from "components/Textfield";
import { FastField, useFormikContext } from "formik";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    border: "1px solid #ccc",
    borderRadius: 5,
    width: "100%",
    height: "100%",
    padding: 8,
  },
}));
type Props = {
  groupSelected?: any;
  questionId: string;
};

const Writing = (props: Props) => {
  const classes = useStyles();
  const { groupSelected, questionId } = props;
  console.log("groupSelected", questionId);

  const { values, setFieldValue } = useFormikContext();

  console.log("writing values", values);
  const handleFocus = () => {
    setFieldValue(`answers[${groupSelected?.part}].questionId`, questionId);
  };

  return (
    <>
      {groupSelected?.part === 0 && (
        <div className={classes.container}>
          <FastField
            onFocus={handleFocus}
            label="mot"
            name={`answers[${groupSelected?.part}].studentAnswer`}
            component={Textarea}
          />
        </div>
      )}
      {groupSelected?.part === 1 && (
        <div className={classes.container}>
          <FastField
            onFocus={handleFocus}
            label="hai"
            name={`answers[${groupSelected?.part}].studentAnswer`}
            component={Textarea}
          />
        </div>
      )}
    </>
  );
};

export default Writing;
