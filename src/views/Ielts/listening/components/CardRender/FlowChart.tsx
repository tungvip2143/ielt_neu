import React, { useEffect, useRef } from "react";
import { TextField } from "components/Textfield";
import { FastField, useFormikContext } from "formik";
import { makeStyles } from "@mui/styles";
import { ROOT_ORIGINAL_URL } from "constants/api";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
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
type Props = {
  image?: any;
  question?: any;
  onClickPage?: (options: any) => void;
  displayNumber: number;
};

const FlowChart = (props: Props) => {
  const classes = useStyles();
  const { image, question, onClickPage, displayNumber } = props;

  const { setFieldValue } = useFormikContext();
  const inputRef = useRef<any>([]);

  const handleFocus = (id: string, index: any, questionIndx: number) => {
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
        <img className={classes.img} src={`${ROOT_ORIGINAL_URL}/${image?.image}`} alt="flow chart" />
      </div>
      <div className={classes.answerBox}>
        {question?.map((answer: any, questionIndx: number) => {
          const displayNumberT = answer?.question?.displayNumber;
          return (
            <div className={classes.answer} onClick={() => onClickQuestion(questionIndx)}>
              <strong style={{ minWidth: "20px" }}>{`${answer?.question?.displayNumber}.`}</strong>
              <FastField
                inputRef={(el: any) => (inputRef.current[displayNumberT] = el)}
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
