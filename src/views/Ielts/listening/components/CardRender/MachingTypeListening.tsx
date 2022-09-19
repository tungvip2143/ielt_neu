import { makeStyles } from "@mui/styles";
import { TextField } from "components/Textfield";
import { FastField, useFormikContext } from "formik";
import { useEffect, useRef } from "react";
import ReactHtmlParser from "react-html-parser";
import { QuestionItemI } from "../../../../../constants/typeData.types";
interface Props {
  questions: any;
  questionBox: string;
  answerList: string;
  onClickPage?: (options: object) => void;
  displayNumber: number;
  isView?: boolean;
  disabled?: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: 8,
    flexDirection: "column",
  },
  questionBox: {
    border: `1px solid ${theme.custom?.border.primary}`,
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

const MachingTypeListening = (props: Props) => {
  // !Style
  const classes = useStyles();
  const { questions, answerList, onClickPage, displayNumber, isView = false } = props;
  // console.log("312", data);
  const inputRef = useRef<any>([]);

  useEffect(() => {
    inputRef?.current[displayNumber]?.focus();
  }, [displayNumber]);

  const { setFieldValue } = useFormikContext();

  const handleFocus = (index: number) => {
    setFieldValue(`answers[${index}].questionId`, questions?.questionId || "");
  };

  const onClickQuestion = (questionIndex: number) => {
    let sectionRender: any = {};
    sectionRender.question = questionIndex;
    console.log("FSdfs", sectionRender);
    onClickPage && onClickPage(sectionRender);
  };

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        {questions?.map((question: QuestionItemI, questionIndex: number) => {
          const index = Number(question?.question?.displayNumber) - 1;
          return (
            <div
              className={classes.question}
              key={question.question._id}
              onClick={() => onClickQuestion(questionIndex)}
            >
              <div>
                <strong>{`${question?.question?.displayNumber}.`}</strong>
              </div>
              {ReactHtmlParser(question.question.questionText)}
              <FastField
                disabled={isView}
                inputRef={(el: Event | any) => (inputRef.current[index + 1] = el)}
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

export default MachingTypeListening;
