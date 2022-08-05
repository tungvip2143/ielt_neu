import { TextField as TextFieldMui, TextFieldProps } from "@mui/material";
import { FastFieldProps } from "formik";
import { getIn } from "formik";

interface Props extends FastFieldProps {
  label?: string;
  type?: string;
  onKeyDown?: () => void;
  fullWidth?: boolean;
  field: any;
  form: any;
  className?: string;
  size?: "small" | "medium" | undefined;
}
export const TextField = (props: Props) => {
  const { label, type = "text", onKeyDown, fullWidth = false, field, form, className, size } = props;
  const { name, value } = field;
  const { errors, touched, handleChange } = form;

  const isTouched = getIn(touched, name);
  const errorMessage = getIn(errors, name);

  return (
    <TextFieldMui
      name={name}
      label={label}
      type={type}
      onKeyDown={onKeyDown}
      value={value}
      size={size}
      fullWidth={fullWidth}
      className={className}
      onChange={handleChange}
      error={isTouched && Boolean(errorMessage)}
      helperText={isTouched && errorMessage}
    />
  );
};
