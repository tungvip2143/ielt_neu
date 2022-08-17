import React from "react";
import Text from "../../../../../components/Typography/index";
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
import { themeCssSx } from "../../../../../ThemeCssSx/ThemeCssSx";
import { Field, useFormikContext } from "formik";
import Radio from "components/Radio";
import ReactAudioPlayer from "react-audio-player";
import { ROOT_ORIGINAL_URL } from "constants/api";
// ! type
interface Props {
  dataQuestions?: any;
  audio?: any;
}
const formAnswer = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
};
const itemAnswer = {
  width: "49%",
  mb: "30px",
};
const questionNumber = {
  mr: "5px",
  fontWeight: 700,
  color: themeCssSx.color.title,
};
const title = {
  background: "#f7f9fb",
  padding: "10px 20px",
  mb: "10px",
  borderRadius: "5px",
};
const question = {
  color: themeCssSx.color.title,
};

const MultiChoice = ({ dataQuestions, audio }: Props) => {
  const { values }: any = useFormikContext();
  return (
    <>
      <Box sx={{ mb: "20px" }}>
        <ReactAudioPlayer src={`${ROOT_ORIGINAL_URL}/${audio}`} autoPlay controls />
      </Box>
      <Box sx={formAnswer}>
        {dataQuestions.map((item: any) => {
          console.log("item", item);
          return (
            <Box sx={itemAnswer}>
              <Stack direction="row" sx={title}>
                <Text.DescSmall sx={questionNumber}>{item.question.displayNumber}</Text.DescSmall>
                <Text.DescSmall sx={question}>{ReactHtmlParser(item.question.questionText)}</Text.DescSmall>
              </Stack>

              <FormControl sx={{ padding: "0 20px" }}>
                {item.question.options.map((answerChoice: any) => {
                  console.log("answerChoice", answerChoice);
                  const displayNumber = Number(item.question.displayNumber) - 1;
                  return (
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="radio-buttons-group"
                      value={values?.answers[displayNumber]?.studentAnswer}
                    >
                      <FormControlLabel
                        key={answerChoice._id}
                        value={answerChoice.key}
                        label={`${answerChoice.key}.${answerChoice.text}`}
                        control={
                          <Field
                            questionId={item.question._id}
                            index={displayNumber}
                            component={Radio}
                            name={`answers[${displayNumber}].studentAnswer`}
                            //   value={answer.key || values?.answers[displayNumber]?.studentAnswer}
                          />
                        }
                      />
                    </RadioGroup>
                  );
                })}
              </FormControl>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default MultiChoice;