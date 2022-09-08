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
}));
type Props = {
  image?: string;
  question?: any;
  onClickPage?: (options: any) => void;
  displayNumber: number;
  isView?: boolean;
};

const FlowChart = (props: Props) => {
  const classes = useStyles();
  const { image, question, onClickPage, displayNumber, isView = false } = props;
  const { setFieldValue } = useFormikContext();
  const inputRef = useRef<any>([]);

  const handleFocus = (id: string, index: any) => {
    console.log("id789", id, index);
    setFieldValue(`answers[${index}].questionId`, id);
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
      <img className={classes.img} src={`${ROOT_ORIGINAL_URL}/${image}`} alt="flow chart" />
      <div className={classes.answerBox}>
        {question?.map((answer: any, questionIndx: number) => {
          const displayNumberT = answer?.question?.displayNumber;
          return (
            <div className={classes.answer} onClick={() => onClickQuestion(questionIndx)}>
              <span>
                <strong>{`${answer?.question?.displayNumber}.`}</strong>
              </span>
              <FastField
                disabled={isView}
                inputRef={(el: any) => (inputRef.current[displayNumberT] = el)}
                onFocus={() => handleFocus(answer?.questionId, Number(answer?.question?.displayNumber) - 1)}
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
