import React from "react";
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
  onHightLightNumberPage: (display: number) => void;
};

const FlowChart = (props: Props) => {
  const classes = useStyles();
  const { image, question, onHightLightNumberPage } = props;
  console.log("hfskdhfks", question);

  const { setFieldValue } = useFormikContext();

  const handleFocus = (id: string, index: any) => {
    setFieldValue(`answers[${index}].questionId`, id);
  };
  const onClickQuestion = (displayNumber: number) => {
    onHightLightNumberPage(displayNumber);
  };

  return (
    <div className={classes.container}>
      <img className={classes.img} src={`${ROOT_ORIGINAL_URL}/${image}`} alt="flow chart" />
      <div className={classes.answerBox}>
        {question?.map((answer: any) => {
          return (
            <div className={classes.answer} onClick={() => onClickQuestion(Number(answer?.question?.displayNumber))}>
              <span>
                <strong>{answer?.question?.displayNumber}</strong>
              </span>
              <FastField
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
