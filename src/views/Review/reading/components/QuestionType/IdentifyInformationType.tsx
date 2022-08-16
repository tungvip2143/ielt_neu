import React from "react";
import {
  Box,
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
import { ClassNames } from "@emotion/react";
import { makeStyles } from "@mui/styles";
//
import ExplanationBox from "../ExplanationBox";
import { AnswerBoolean } from "../../../../../constants/enum";

const useStyles = makeStyles((theme) => ({
  answer: {
    display: "flex",
    gap: 16,
    alignItems: "center",
  },
  key: {
    padding: 8,
    display: "flex",
    justifyContent: "center",
  },
}));

type Props = {
  question: any;
  questionType: any;
  expanded?: any;
  onCollapse?: any;
  QUESTION_TYPE?: any;
  idShowQuestion?: any;
  onHightLightNumberPage?: any;
};
const roundedCheck = {
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  border: "1px solid #ccc",
};
const IdentifyInformationType = (props: Props) => {
  const [showExplainBoolean, setShowExplainBoolean] = React.useState();
  console.log("showExplainBoolean", showExplainBoolean);

  const classes = useStyles();

  const { question, questionType, expanded, onCollapse, QUESTION_TYPE, idShowQuestion, onHightLightNumberPage } = props;
  console.log("questionType", questionType);

  const displayNumber = Number(question.question.displayNumber) - 1;
  const { values }: any = useFormikContext();

  const handleClickHightLightPage = () => {
    onHightLightNumberPage(question.question.displayNumber);
  };
  const ShowTypeBooleanAnswer = () => {
    setShowExplainBoolean(question.question.answer);
  };
  const hightLightTrueAnswer = () => {
    if (question.question.answer === AnswerBoolean.TRUE) {
      return { background: "#64b5f6 " };
    }
  };
  const hightLightFalseAnswer = () => {
    if (question.question.answer === AnswerBoolean.FALSE) {
      return { background: "#64b5f6" };
    }
  };
  const hightLightNotGIVENAnswer = () => {
    if (question.question.answer === AnswerBoolean.NOTGIVEN) {
      return { background: "#64b5f6" };
    }
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
          <Stack direction="column" spacing={2}>
            {question.question.options.map((answer: any) => {
              console.log("answer", question);

              return (
                <>
                  <div key={answer._id} className={classes.answer}>
                    <div
                      className={classes.key}
                      style={{
                        background: question.question.answer === answer.key ? "#4bc82c" : "",
                        color: question.question.answer === answer.key ? "#fff" : "",
                        borderRadius: "3px",
                        width: "40px",
                      }}
                    >{`${answer.key}.`}</div>
                    <div>{answer.text}</div>
                  </div>
                </>
              );
            })}
            {questionType === QUESTION_TYPE.MULTIPLE_CHOICE_1_ANSWER && (
              <ExplanationBox
                correctAnswer={question?.question?.answer}
                studenAnswer={question?.studentAnswer}
                explanation={question?.question?.explanationText}
              />
            )}
          </Stack>
        </AccordionDetails>

        {(QUESTION_TYPE.IDENTIFYING_INFORMATION === questionType ||
          questionType === QUESTION_TYPE.IDENTIFYING_VIEWS_CLAIMS) && (
          <AccordionDetails>
            <Stack spacing={2}>
              <>
                <Stack direction="row" spacing={2} onClick={ShowTypeBooleanAnswer}>
                  <Box style={hightLightTrueAnswer()} sx={roundedCheck}></Box>
                  <Box>TRUE</Box>
                </Stack>
              </>
              <>
                <Stack direction="row" spacing={2} onClick={ShowTypeBooleanAnswer}>
                  <Box style={hightLightFalseAnswer()} sx={roundedCheck}></Box>
                  <Box>FALSE</Box>
                </Stack>
              </>
              <>
                <Stack direction="row" spacing={2} onClick={ShowTypeBooleanAnswer}>
                  <Box style={hightLightNotGIVENAnswer()} sx={roundedCheck}></Box>
                  <Box>NOT GIVEN</Box>
                </Stack>
              </>
            </Stack>

            <ExplanationBox
              correctAnswer={question?.question?.answer}
              studenAnswer={question?.studentAnswer}
              explanation={question?.question?.explanationText}
            />
          </AccordionDetails>
        )}
      </Accordion>
    </>
  );
};

export default IdentifyInformationType;
