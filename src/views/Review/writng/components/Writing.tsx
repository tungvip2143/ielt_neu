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
  partRenderSelected: any;
};

const Writing = (props: Props) => {
  const classes = useStyles();
  const { groupSelected, partRenderSelected } = props;
  console.log("groupSelected", groupSelected);

  return (
    <>
      {groupSelected?.part === 0 && <div className={classes.container}>{partRenderSelected?.studentAnswer}</div>}
      {groupSelected?.part === 1 && <div className={classes.container}>{partRenderSelected?.studentAnswer}</div>}
    </>
  );
};

export default Writing;
