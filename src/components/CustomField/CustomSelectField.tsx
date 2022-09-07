import styled from "@emotion/styled";
import { Autocomplete, FormControl, FormHelperText, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FieldInputProps } from "formik";
import { get } from "lodash";
import React from "react";
import { Control, Controller, FieldPath, FieldValues, SetFieldValue } from "react-hook-form";

interface IitemSelect {
  label: string;
  value: string | number | boolean;
}

interface Props<T> {
  setValue: SetFieldValue<T>;
  label?: string;
  labelColor?: string;
  variant?: "standard" | "filled" | "outlined";
  required?: boolean;
  onChangeExtra?: (data: IitemSelect | null) => void;
  options: IitemSelect[];
  style?: any;
  disabled?: boolean;

  field?: FieldInputProps<any>;
}

const ErrorText = styled(FormHelperText)`
  color: red;
  margin-left: 0;
`;

const CustomSelectField = <T extends FieldValues>(props: Props<T>) => {
  const { field, setValue, label, required, variant, labelColor, options, onChangeExtra, style, disabled, ...rest } =
    props;

  return (
    <Autocomplete
      value={options.find((option: any) => option.value) || { label: "", value: "" }}
      disablePortal
      id="combo-box-demo"
      onChange={(e, item) => {
        setValue(field?.name, item?.value);
        onChangeExtra && onChangeExtra(item);
      }}
      renderInput={(params) => {
        return <TextField {...params} label={label} fullWidth variant={variant} />;
      }}
      getOptionLabel={(option) => option.label}
      options={options}
      disableClearable={!field?.value}
      style={style}
      disabled={disabled}
      {...field}
      {...rest}
    />
  );
};

export default CustomSelectField;
