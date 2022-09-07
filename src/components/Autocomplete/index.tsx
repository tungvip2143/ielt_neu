import { Autocomplete, TextFieldProps, TextField, AutocompleteProps } from "@mui/material";
import { FieldProps, getIn } from "formik";

export interface Props {
  variant?: "standard" | "filled" | "outlined";
}
export const AutoCompletedMui: React.FC<FieldProps & TextFieldProps & AutocompleteProps<any, any, any, any, "div">> = (
  props
) => {
  const { form, field, label, variant, ...rest } = props;
  // const { name, value } = field;
  const { setFieldValue, errors, touched } = form;

  const onChange = (event: React.SyntheticEvent, value: any, reason: string) => {
    setFieldValue(field.name, value || {});
  };

  //   console.log("errors", errors);
  //   console.log("touched", touched);

  const isTouched = getIn(touched, field.name);
  const errorMessage = getIn(errors, field.name);
  return (
    <Autocomplete
      {...rest}
      {...field}
      onChange={onChange}
      getOptionLabel={(option) => {
        return option?.name ?? "";
      }}
      filterOptions={(options, state) => {
        return options;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={variant}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
          error={isTouched && Boolean(errorMessage)}
          helperText={isTouched && errorMessage?.name}
        />
      )}
    />
  );
};
