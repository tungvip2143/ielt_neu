import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

interface IAppInputCommon {
    id: string
    label: string
    variant: 'standard' | 'outlined' | 'filled'
    style?: any
}

export const InputCommon = (props: IAppInputCommon) => {
    const { id, label, variant, style } = props
    return (
        <TextField id={id} label={label} variant={variant} />

    )
}

// export default InputCommon