import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// !type
interface Props {
  onSelectExam: any;
}

export default function SelectExam({ onSelectExam }: Props) {
  const [age, setAge] = React.useState("");

  const handleChange = (event: any) => {
    setAge(event.target.value);
    onSelectExam(true);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 320 }}>
        <Select value={age} onChange={handleChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
          <MenuItem value="">
            <em>Select Exam</em>
          </MenuItem>
          <MenuItem value={10}>Level 4.0</MenuItem>
          <MenuItem value={10}>Level 5.0</MenuItem>
          <MenuItem value={10}>Level 6.0</MenuItem>
          <MenuItem value={10}>Level 7.0</MenuItem>
          <MenuItem value={10}>Level 8.0</MenuItem>
          <MenuItem value={10}>Level 9.0</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
