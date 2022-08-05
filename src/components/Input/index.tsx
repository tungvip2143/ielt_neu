import styled from "@emotion/styled";
import { FormControl, FormHelperText } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

interface Props<T> extends Omit<TextFieldProps, "name"> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  labelColor?: string;
  variant?: "standard" | "filled" | "outlined";
  width?: number;
  InputProps?: any;
  id?: string;
}

const ErrorText = styled(FormHelperText)`
  color: red !important;
`;

const InputCommon = <T extends FieldValues>(props: Props<T>) => {
  const { id, control, name, label, variant, required, labelColor, width, InputProps, ...rest } = props;
  return (
    <div style={{ width: width || "100%" }}>
      <Controller
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth>
            <TextField
              variant={variant}
              id={id}
              fullWidth
              error={Boolean(error)}
              helperText={error?.message && <ErrorText>{error?.message && error.message}</ErrorText>}
              hiddenLabel
              label={label}
              InputProps={InputProps}
              {...field}
              {...rest}
            />
          </FormControl>
        )}
        name={name}
        control={control}
      />
    </div>
  );
};

export default InputCommon;
