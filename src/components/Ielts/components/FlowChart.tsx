import React from "react";
import { TextField } from "components/Textfield";
import { FastField, useFormikContext } from "formik";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
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
}));
type Props = {
  image?: string;
  question?: any;
};

const FlowChart = (props: Props) => {
  const classes = useStyles();
  const { image, question } = props;
  console.log("question 345", question);

  const { setFieldValue } = useFormikContext();

  const handleFocus = (id: string, index: any) => {
    setFieldValue(`answers[${index}].questionId`, id);
  };
  return (
    <div>
      <img src={image} alt="flow chart" />
      <div className={classes.answerBox}>
        {question?.map((answer: any) => {
          console.log("partAnswerItem", answer.question.answer);
          return (
            <div className={classes.answer}>
              <span>
                <strong>{answer?.question?.displayNumber}</strong>
              </span>
              <FastField
                onFocus={() => handleFocus(answer?.questionId, Number(answer?.question?.displayNumber) - 1)}
                component={TextField}
                name={`answers[${Number(answer?.question?.displayNumber) - 1}].studentAnswer`}
                value={answer.question.answer}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlowChart;
