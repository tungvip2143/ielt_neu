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
import Text from "components/Typography/index";
import ReactHtmlParser from "react-html-parser";
import { Field, useFormikContext } from "formik";
import Radio from "components/Radio";
import { TRUE } from "sass";
import { ACTION } from "interfaces/testType";

type Props = {
  question: any;
  questionType: any;
  expanded?: any;
  onCollapse?: any;
  QUESTION_TYPE?: any;
  idShowQuestion?: any;
  onHightLightNumberPage?: any;
  action?: string;
};

const IdentifyInformationType = (props: Props) => {
  const {
    question,
    questionType,
    expanded,
    onCollapse,
    QUESTION_TYPE,
    idShowQuestion,
    onHightLightNumberPage,
    action,
  } = props;
  console.log("idshowQuestion", idShowQuestion);

  const displayNumber = Number(question.question.displayNumber) - 1;
  const { values }: any = useFormikContext();

  const handleClickHightLightPage = () => {
    onHightLightNumberPage(question.question.displayNumber);
  };
  return (
    <>
      <Accordion
        sx={{ boxShadow: "none" }}
        className="accordion-title"
        expanded={expanded == question.question.displayNumber}
        onChange={onCollapse(question.question.displayNumber)}
        onClick={handleClickHightLightPage}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", background: "#f7f9fb", p: "0 20px", borderRadius: "10px !important" }}
        >
          {/* <Text.DescSmall sx={{ fontWeight: "bold" }}>{question?.id}</Text.DescSmall> */}

          <AccordionSummary
            className="accordion-title"
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ p: "0 !important", display: "flex" }}
          >
            <Text.DescSmall sx={{ mr: "5px" }}>{question.question.displayNumber}.</Text.DescSmall>
            <Text.DescSmall>{ReactHtmlParser(question.question.questionText)}</Text.DescSmall>
          </AccordionSummary>
        </Stack>

        <AccordionDetails>
          <>{console.log("anwser", question.question)}</>
          <Stack direction="column" spacing={2}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={
                  action === ACTION.REVIEW ? question?.studentAnswer : values?.answers[displayNumber]?.studentAnswer
                }
                // onChange={handleChange}
              >
                {question.question.options.map((answer: any) => {
                  return (
                    <FormControlLabel
                      key={answer._id}
                      value={answer.key}
                      control={
                        <Field
                          questionId={question.question._id}
                          index={displayNumber}
                          component={Radio}
                          name={`answers[${displayNumber}].studentAnswer`}
                          // value={
                          //   action === ACTION.REVIEW
                          //     ? question?.studentAnswer
                          //     : values?.answers[displayNumber]?.studentAnswer
                          // }
                        />
                      }
                      label={`${answer.key}. ${answer?.text}`}
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
                  value={
                    action === ACTION.REVIEW ? question?.studentAnswer : values?.answers[displayNumber]?.studentAnswer
                  }
                  // onChange={handleChange}
                >
                  <FormControlLabel
                    value={true}
                    control={
                      <Field
                        questionId={question.question._id}
                        index={displayNumber}
                        component={Radio}
                        name={`answers[${displayNumber}].studentAnswer`}
                        // value={true}
                      />
                    }
                    label={"TRUE"}
                  />
                  <FormControlLabel
                    value={false}
                    control={
                      <Field
                        questionId={question.question._id}
                        index={displayNumber}
                        component={Radio}
                        name={`answers[${displayNumber}].studentAnswer`}
                        // value={false}
                      />
                    }
                    label={"FALSE"}
                  />
                  <FormControlLabel
                    value={"not_given"}
                    control={
                      <Field
                        questionId={question.question._id}
                        index={displayNumber}
                        component={Radio}
                        name={`answers[${displayNumber}].studentAnswer`}
                        // value={"NOT_GIVEN"}
                      />
                    }
                    label={"NOT_GIVEN"}
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
