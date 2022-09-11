import { TextField as TextFieldMui, TextFieldProps, TextareaAutosize, TextareaAutosizeProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FastFieldProps } from "formik";
import { getIn } from "formik";
const useStyles = makeStyles((theme) => ({
  textarea: {
    border: "none",
    width: "100%",
    row: 3,
    height: "100%",
    "&:focus": {
      outline: "none",
    },
  },
}));

interface Props extends FastFieldProps {
  label?: string;
  type?: string;
  onKeyDown?: () => void;
  fullWidth?: boolean;
  field: any;
  form: any;
  className?: string;
  size?: "small" | "medium" | undefined;
  onFocus?: () => void;
  autoFocus: any;
}
export const TextField = (props: Props) => {
  const {
    label,
    type = "text",
    onKeyDown,
    fullWidth = false,
    field,
    form,
    className,
    size = "small",
    onFocus,
    ...rest
  } = props;
  const { name, value } = field;
  const { errors, touched, handleChange } = form;

  const isTouched = getIn(touched, name);
  const errorMessage = getIn(errors, name);

  return (
    <TextFieldMui
      variant="outlined"
      name={name}
      label={label}
      type={type}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      value={value}
      size={size}
      fullWidth={fullWidth}
      className={className}
      onChange={handleChange}
      {...rest}
      // error={isTouched && Boolean(errorMessage)}
      // helperText={isTouched && errorMessage}
    />
  );
};
export const Textarea = (props: Props) => {
  const {
    label,
    type = "text",
    onKeyDown,
    fullWidth = false,
    field,
    form,
    className,
    size,
    onFocus,
    autoFocus,
    ...rest
  } = props;
  const { name, value } = field;
  const { handleChange } = form;

  const classes = useStyles();

  return (
    <textarea
      autoFocus
      name={name}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      value={value}
      className={classes.textarea}
      onChange={handleChange}
      {...rest}
    />
  );
};
