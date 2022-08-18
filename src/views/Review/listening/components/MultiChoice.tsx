import React from "react";
import {
  Stack,
  FormControl,
  RadioGroup,
  FormControlLabel,
  AccordionDetails,
  Accordion,
  AccordionSummary,
} from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import { Box } from "@mui/material";
import { Field, useFormikContext } from "formik";
import Text from "../../../../components/Typography/index";
import { themeCssSx } from "../../../../ThemeCssSx/ThemeCssSx";
import Radio from "../../../../components/Radio/index";
// ! type
interface Props {
  dataQuestions?: any;
}
const formAnswer = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
};
const itemAnswer = {};
const questionNumber = {
  mr: "5px",
  fontWeight: 700,
};
const container = {
  mb: "20px",
};
const question = {
  display: "flex",
  background: "#f7f9fb",
  padding: "10px 20px",
  mb: "10px",
  borderRadius: "5px",
};
const displayNumber = {
  mr: "5px",
  color: themeCssSx.color.title,
};
const itemNawer = {
  padding: "10px 20px",
  display: "flex",
  alignItems: "center",
};
const textAnswer = {
  ml: "5px",
};
const hightLightAnswerCss = {
  background: themeCssSx.colorAnswer.correctAnswer,
  color: "#fff",
  borderRadius: "5px",
};
const MultiChoice = ({ dataQuestions }: Props) => {
  console.log("dataQuestions", dataQuestions);
  return (
    <>
      <Box className="" sx={container}>
        <Box sx={question}>
          <Text.DescSmall sx={displayNumber}>{dataQuestions.question.displayNumber}.</Text.DescSmall>
          <Text.DescSmall>{ReactHtmlParser(dataQuestions.question.questionText)}</Text.DescSmall>
        </Box>
        {dataQuestions.question.options.map((answer: any) => {
          const hightLightAnswer = () => {
            return dataQuestions?.question?.answer === answer?.key ? { ...hightLightAnswerCss } : {};
          };
          return (
            <>
              <Box sx={itemNawer}>
                <Box sx={hightLightAnswer()} style={{ padding: "5px 10px" }}>
                  {answer.key}.
                </Box>
                <Text.DescSmall sx={textAnswer}>{answer.text}</Text.DescSmall>
              </Box>
            </>
          );
        })}
      </Box>
    </>
  );
};

export default MultiChoice;
