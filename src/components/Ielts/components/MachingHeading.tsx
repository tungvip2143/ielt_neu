import React, { useEffect, useRef } from "react";
import ReactHtmlParser from "react-html-parser";
import { makeStyles } from "@mui/styles";
import { FastField, useFormikContext } from "formik";
import { TextField } from "components/Textfield";
import Text from "components/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: 16,
    flexDirection: "column",
  },
  question: {
    display: "flex",
    gap: 16,
    alignItems: "center",
  },
  questionBox: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  answerList: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: 16,
  },
}));
type Props = {
  data?: any;
  answerList: string;
  question: any;
  onHightLightNumberPage?: (displayNumber: number) => void;
  onClickPage?: (option: any) => void;
  displayNumber: number;
  isView?: boolean;
};

const MachingHeading = (props: Props) => {
  // !State
  const classes = useStyles();
  const { data, answerList, question, onClickPage, displayNumber, isView = false } = props;
  const inputRef = useRef<any>([]);
  const { setFieldValue } = useFormikContext();
  console.log("maching heading", data);

  const handleFocus = (displayNumber: number) => {
    console.log("test3456");
    data.map((question: any) => {
      console.log("abcdef", displayNumber === question.question.displayNumber);
      if (displayNumber === question.question.displayNumber) {
        setFieldValue(`answers[${displayNumber - 1}].questionId`, question.questionId || "");
      }
    });
  };
  const onClickQuestion = (questionIndex: number) => {
    let sectionRender: any = {};
    sectionRender.question = questionIndex;
    onClickPage && onClickPage(sectionRender);
  };

  useEffect(() => {
    inputRef.current[displayNumber]?.focus();
  }, [displayNumber]);

  return (
    <div className={classes.root}>
      <div className={classes.questionBox}>
        {question.map((question: any, questionIndex: number): any => {
          console.log("fsdf", question);
          const displayNumberT = question?.question?.displayNumber;
          return (
            <div key={question.id} className={classes.question} onClick={() => onClickQuestion(questionIndex)}>
              <strong style={{ minWidth: "24px" }}>{ReactHtmlParser(question?.question?.questionText)}</strong>
              <FastField
                disabled={isView}
                size="small"
                name={`answers[${displayNumberT - 1}].studentAnswer`}
                onFocus={() => handleFocus(displayNumberT)}
                component={TextField}
                inputRef={(el: any) => (inputRef.current[displayNumberT] = el)}
              />
            </div>
          );
        })}
      </div>

      <div className={classes.answerList}>{ReactHtmlParser(answerList)}</div>
    </div>
  );
};

export default MachingHeading;
