import React from "react";
import {
  Stack,
  FormControl,
  RadioGroup,
  FormControlLabel,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Text from "components/Typography/index";
import ReactHtmlParser from "react-html-parser";
import { Field, useFormikContext } from "formik";
import Radio from "components/Radio";

type Props = {
  question: any;
  questionType: any;
  QUESTION_TYPE?: any;
  displayNumber: number;
  questionIdx?: number;
  onClickPage?: (options: any) => void;
};

const IdentifyInformationType = (props: Props) => {
  const { question, questionType, QUESTION_TYPE, displayNumber, questionIdx, onClickPage } = props;

  const displayNumberT = Number(question?.question?.displayNumber || 0) - 1;
  const { values }: any = useFormikContext();

  const onClickQuestion = () => {
    let sectionRender: any = {};
    sectionRender.question = questionIdx;
    onClickPage && onClickPage(sectionRender);
  };

  console.log("abcdefghik");
  return (
    <>
      <Accordion
        sx={{ boxShadow: "none" }}
        className="accordion-title"
        expanded={displayNumber === question?.question?.displayNumber}
        disableGutters
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", background: "#f7f9fb", p: "0 20px", borderRadius: "10px !important" }}
        >
          <AccordionSummary
            className="accordion-title"
            aria-controls="panel1a-content"
            onClick={onClickQuestion}
            sx={{ p: "0 !important", display: "flex" }}
          >
            <Text.DescSmall sx={{ mr: "5px" }}>{question?.question?.displayNumber}.</Text.DescSmall>
            <Text.DescSmall>{ReactHtmlParser(question?.question?.questionText)}</Text.DescSmall>
          </AccordionSummary>
        </Stack>

        <AccordionDetails>
          <Stack direction="column" spacing={2}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={values?.answers[displayNumberT]?.studentAnswer}
              >
                {question?.question?.options.map((answer: any, index: number) => {
                  const checkSortIndex = () => {
                    if (index === 0) {
                      return "A";
                    }
                    if (index === 1) {
                      return "B";
                    }
                    if (index === 2) {
                      return "C";
                    }
                    if (index === 3) {
                      return "D";
                    }
                    return;
                  };
                  return (
                    <FormControlLabel
                      key={answer._id}
                      value={answer.key}
                      control={
                        <Field
                          questionId={question?.question?._id}
                          index={displayNumber}
                          component={Radio}
                          name={`answers[${displayNumberT}].studentAnswer`}
                        />
                      }
                      label={`${checkSortIndex()}. ${answer?.text}`}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Stack>
        </AccordionDetails>

        {(QUESTION_TYPE.IDENTIFYING_INFORMATION === questionType ||
          questionType === QUESTION_TYPE.IDENTIFYING_VIEWS_CLAIMS) && (
          <AccordionDetails>
            <Stack spacing={2}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={values?.answers[displayNumberT]?.studentAnswer}
                >
                  <FormControlLabel
                    value={true}
                    control={
                      <Field
                        questionId={question?.question?._id}
                        index={displayNumberT}
                        component={Radio}
                        name={`answers[${displayNumberT}].studentAnswer`}
                      />
                    }
                    label={<Typography style={{ fontSize: 14 }}>TRUE</Typography>}
                  />
                  <FormControlLabel
                    value={false}
                    control={
                      <Field
                        questionId={question?.question?._id}
                        index={displayNumberT}
                        component={Radio}
                        name={`answers[${displayNumberT}].studentAnswer`}
                      />
                    }
                    label={<Typography style={{ fontSize: 14 }}>FALSE</Typography>}
                  />
                  <FormControlLabel
                    value={"not_given"}
                    control={
                      <Field
                        questionId={question?.question?._id}
                        index={displayNumberT}
                        component={Radio}
                        name={`answers[${displayNumberT}].studentAnswer`}
                      />
                    }
                    label={<Typography style={{ fontSize: 14 }}>NOT GIVEN</Typography>}
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          </AccordionDetails>
        )}
      </Accordion>
    </>
  );
};

export default IdentifyInformationType;
