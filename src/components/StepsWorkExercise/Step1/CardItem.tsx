import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";

//
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Text from "components/Typography/index";

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
  // console.log("id123", remainProps.expanded);

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
            <Stack direction="row" spacing={1}>
              <Text.Desc16 sx={{ fontWeight: "bold" }}>A.</Text.Desc16>
              <Text.Desc16>{question?.answers?.a}</Text.Desc16>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Text.Desc16 sx={{ fontWeight: "bold" }}>B.</Text.Desc16>
              <Text.Desc16>{question?.answers?.b}</Text.Desc16>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Text.Desc16 sx={{ fontWeight: "bold" }}>C.</Text.Desc16>
              <Text.Desc16>{question?.answers?.c}</Text.Desc16>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Text.Desc16 sx={{ fontWeight: "bold" }}>D.</Text.Desc16>
              <Text.Desc16>{question?.answers?.d}</Text.Desc16>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default ItemQuestion;
//
