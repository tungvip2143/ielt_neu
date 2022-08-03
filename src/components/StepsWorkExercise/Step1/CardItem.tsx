import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";

//
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Text from "components/Typography/index";
//
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
//
interface PropsItemQuestion {
  expanded: any;
  question?: {
    id: number;
    question: string;
    typeAnswer?: string;
    answers?: {
      a: string;
      b: string;
      c: string;
      d: string;
    };
  };
}
const ItemQuestion = ({ question, ...remainProps }: PropsItemQuestion) => {
  const [value, setValue] = useState("a");
  //

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Accordion sx={{ boxShadow: "none" }} className="accordion-title" expanded={remainProps.expanded}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", background: "#f7f9fb", p: "0 20px", borderRadius: "10px !important" }}
        >
          <Text.DescSmall sx={{ fontWeight: "bold" }}>{question?.id}</Text.DescSmall>

          <AccordionSummary
            className="accordion-title"
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ p: "0 !important" }}
          >
            <Text.DescSmall>{question?.question}</Text.DescSmall>
          </AccordionSummary>
        </Stack>
        <AccordionDetails>
          <Stack direction="column" spacing={2}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="a" control={<Radio />} label={`A. ${question?.answers?.a}`} />
                <FormControlLabel value="b" control={<Radio />} label={`B. ${question?.answers?.b}`} />
                <FormControlLabel value="c" control={<Radio />} label={`C. ${question?.answers?.c}`} />
                <FormControlLabel value="d" control={<Radio />} label={`D. ${question?.answers?.d}`} />
              </RadioGroup>
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default ItemQuestion;
//
