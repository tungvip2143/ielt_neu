import React, { useEffect, useRef } from "react";
import { TextField } from "components/Textfield";
import { FastField, useFormikContext } from "formik";
import { makeStyles } from "@mui/styles";
import { ROOT_ORIGINAL_URL } from "constants/api";
import { QuestionItemI } from "../../../../../constants/typeData.types";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    gap: 30,
  },
  answer: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  answerBox: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  img: {
    width: "100%",
  },
  imgBox: {
    width: "60%",
  },
  inputAnswer: {
    "& .css-reo2el": {
      border: `1px solid ${theme.custom?.border.second}`,
    },
  },
}));
type FlowChartI = {
  image: string;
  questions: QuestionItemI[];
  onClickPage: (options: object) => void;
  displayNumber: number;
};

const FlowChart = (props: FlowChartI) => {
  const classes = useStyles();
  const { image, questions, onClickPage, displayNumber } = props;
  // console.log("dsd", questions);
  const { setFieldValue } = useFormikContext();
  const inputRef: React.MutableRefObject<Element | any> = useRef<Element | any>([]);
  // console.log("sfsdf", inputRef);
  const handleFocus = (id: string, index: number, questionIndx: number) => {
    setFieldValue(`answers[${index}].questionId`, id);
    onClickPage && onClickPage({ question: questionIndx }); //!
  };
  const onClickQuestion = (questionIndx: number) => {
    let sectionRender: any = {};
    sectionRender.question = questionIndx;
    onClickPage && onClickPage(sectionRender);
  };

  useEffect(() => {
    inputRef?.current[displayNumber]?.focus();
  }, [displayNumber]);

  return (
    <div className={classes.container}>
      <div className={classes.imgBox}>
        <img className={classes.img} src={`${ROOT_ORIGINAL_URL}/${image}`} alt="flow chart" />
      </div>
      <div className={classes.answerBox}>
        {questions?.map((answer: QuestionItemI, questionIndx: number) => {
          const displayNumberT = answer?.question?.displayNumber;
          return (
            <div key={answer.questionId} className={classes.answer} onClick={() => onClickQuestion(questionIndx)}>
              <strong style={{ minWidth: "20px" }}>{`${answer?.question?.displayNumber}.`}</strong>
              <FastField
                inputRef={(el: Event | any) => (inputRef.current[displayNumberT] = el)}
                onFocus={() =>
                  handleFocus(answer?.questionId, Number(answer?.question?.displayNumber) - 1, questionIndx)
                }
                component={TextField}
                name={`answers[${Number(answer?.question?.displayNumber) - 1}].studentAnswer`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlowChart;
