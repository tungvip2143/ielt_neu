import { Autocomplete, TextField } from "@mui/material";
import React from "react";

interface IAppInputSelect {
    option: Array<any>;
    label: string
}

const InputFieldSelect = (props: IAppInputSelect) => {
    const { option, label } = props
    return (
        <div>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={option}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label={label} />}
            />
        </div>
    )
}

export default InputFieldSelect