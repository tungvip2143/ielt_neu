import { makeStyles } from "@mui/styles";
import { FastField, useFormikContext } from "formik";
import React, { Fragment, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { TextField } from "components/Textfield";
import AnserwerBox from "../AnserwerBox";
import { Typography } from "@mui/material";
import Text from "components/Typography";
import ExplanationBox from "../ExplanationBox";
type Props = {
  data: any;
  questionBox: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: 8,
    flexDirection: "column",
  },
  questionBox: {
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  question: {
    display: "flex",
    gap: 8,
    flex: 1,
    cursor: "pointer",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  answerBox: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  answer: {
    maxHeight: "70px",
    display: "flex",
    gap: 16,
  },
  explanation: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: 16,
    gap: 16,
  },
}));

const MachingType = (props: Props) => {
  // !Style
  const classes = useStyles();
  const { data, questionBox } = props;
  console.log("data3456", data);

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        {data?.map((question: any) => {
          const index = Number(question?.question?.displayNumber) - 1;
          return <Answer question={question} />;
        })}
      </div>
      <div className={classes.questionBox}>{ReactHtmlParser(questionBox)}</div>
    </div>
  );
};

const Answer = ({ question }: any) => {
  const [showAnswer, setShowAnswer] = useState();

  console.log("questionMaching", question);
  // !State

  const classes = useStyles();
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // !Function
  const handleShowExplanation = () => setShowExplanation(!showExplanation);
  //
  const handleShowAnswer = () => {
    setShowAnswer(question.question.answer);
  };
  return (
    <>
      <div className={classes.answerBox} onClick={handleShowAnswer}>
        <div className={classes.question} key={question._id}>
          <div className={classes.question} onClick={handleShowExplanation}>
            {`${question?.question?.displayNumber}.`}
            {ReactHtmlParser(question?.question?.questionText)}
          </div>
          <div className={classes.answer}>
            <AnserwerBox>{question?.question?.answer}</AnserwerBox>
            {/* <Typography variant="textTrue">{question.question.answer}</Typography> */}
          </div>
        </div>
      </div>
      {showAnswer === question.question.answer && (
        <ExplanationBox
          correctAnswer={question?.question?.answer}
          studenAnswer={question?.studentAnswer}
          explanation={question?.question?.explanationText}
        />
      )}
    </>
  );
};

export default MachingType;
