import { makeStyles } from "@mui/styles";
import { TextField } from "components/Textfield";
import { FastField, useFormikContext } from "formik";
import ReactHtmlParser from "react-html-parser";

type Props = {
  data: any;
  questionBox: string;
  answerList: string;
  onHightLightNumberPage: (displayNumber: number) => void;
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
    padding: 8,
  },
  question: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
}));

const MachingType = (props: Props) => {
  // !Style
  const classes = useStyles();
  const { data, answerList, onHightLightNumberPage } = props;

  const { setFieldValue } = useFormikContext();
  console.log("onHightLightNumberPage", onHightLightNumberPage);

  const handleFocus = (index: number) => {
    setFieldValue(`answers[${index}].questionId`, data?.questionId || "");
  };

  const onClickQuestion = (displayNumber: number) => {
    onHightLightNumberPage(displayNumber);
  };

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        {data?.map((question: any) => {
          const index = Number(question?.question?.displayNumber) - 1;
          console.log("question", data);
          return (
            <div className={classes.question} key={question._id} onClick={() => onClickQuestion(index + 1)}>
              {`${question?.question?.displayNumber}.`}
              {ReactHtmlParser(question?.question?.questionText)}
              <FastField
                onFocus={() => handleFocus(index)}
                component={TextField}
                name={`answers[${index}].studentAnswer`}
                size="small"
              />
            </div>
          );
        })}
      </div>
      <div className={classes.questionBox}>{ReactHtmlParser(answerList)}</div>
    </div>
  );
};

export default MachingType;
