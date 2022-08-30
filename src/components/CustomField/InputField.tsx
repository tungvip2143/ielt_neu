import styled from "@emotion/styled";
import { FormControl, FormHelperText } from "@mui/material";
import { TextField, TextFieldProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FieldInputProps, FormikProps } from "formik";
import { get } from "lodash";

interface Props {
  label?: string;
  labelColor?: string;
  variant?: "standard" | "filled" | "outlined";
  width?: number;
  InputProps?: any;
  id?: string;
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  errorMsg?: string;
}

const ErrorText = styled(FormHelperText)`
  color: red !important;
`;
const useStyles = makeStyles((theme) => ({
  root: {
    "&.MuiFormHelperText-root.Mui-error": {
      color: "blue !important",
    },
  },
}));

const helperTextStyles = makeStyles((theme) => ({
  root: {
    color: "black",
  },
  error: {
    "&.MuiFormHelperText-root.Mui-error": {
      color: "white",
    },
  },
}));

const inputStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: "white",
    borderRadius: 4,
  },
}));

const InputField = (props: Props & TextFieldProps) => {
  //! State
  const { id, label, variant, labelColor, width, InputProps, field, form, ...rest } = props;
  const { name = rest?.name || "" } = field || {};
  const { errors = {}, touched = {} } = form || {};

  const isError = !!get(errors, name) && !!get(touched, name);
  const errorMsg = (get(errors, name) as string) || "";

  const classes = useStyles();
  const helperTestClasses = helperTextStyles();

  //! Render
  return (
    <div style={{ width: width || "100%" }} className={classes.root}>
      <FormControl fullWidth>
        <TextField
          variant={variant}
          id={id}
          fullWidth
          error={isError}
          helperText={isError && <ErrorText>{errorMsg}</ErrorText>}
          FormHelperTextProps={{ classes: helperTestClasses }}
          hiddenLabel
          label={label}
          InputProps={InputProps}
          InputLabelProps={{ shrink: true }}
          {...field}
          {...rest}
        />
      </FormControl>
    </div>
  );
};

export default InputField;
