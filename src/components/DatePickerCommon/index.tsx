import styled from "@emotion/styled";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import React, { Dispatch, SetStateAction } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface Props<T> extends Omit<TextFieldProps | any, "name"> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  labelColor?: string;
  variant?: "standard" | "filled" | "outlined";
  width?: number;
  value?: Date | null;
}

// import { makeStyles } from "@material-ui/core/styles";

const DatePickerCommon = <T extends FieldValues>(props: Props<T>) => {
  const { control, name, label, variant, required, labelColor, width, ...rest } = props;
  const [value, setValue] = React.useState<Date | null>(new Date());
  return (
    <div className="mt-5">
      <Controller
        render={({ field, fieldState: { error } }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              renderInput={(params) => {
                return <TextField {...params} label={label} fullWidth variant={variant} />;
              }}
              openTo="year"
              views={["year", "month", "day"]}
              value={value}
              onChange={(newValue: any) => {
                setValue(newValue);
              }}
            />
          </LocalizationProvider>
        )}
        name={name}
        control={control}
      />
    </div>
  );
};

export default DatePickerCommon;
