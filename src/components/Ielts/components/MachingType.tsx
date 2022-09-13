import { makeStyles } from "@mui/styles";
import { TextField } from "components/Textfield";
import { FastField, useFormikContext } from "formik";
import { useEffect, useRef } from "react";
import ReactHtmlParser from "react-html-parser";

type Props = {
  data: any;
  questionBox: string;
  answerList: string;
  onHightLightNumberPage?: (displayNumber: number) => void;
  onClickPage?: (options: number) => void;
  displayNumber: number;
  isView?: boolean;
  disabled?: boolean;
  getTextEachPart?: (text: string) => void;
  passageTextWithHighlightTexted?: string;
  onScannerText?: (data: string) => void;
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
  const {
    data,
    answerList,
    onHightLightNumberPage,
    onClickPage,
    displayNumber,
    isView = false,
    getTextEachPart,
    passageTextWithHighlightTexted,
    onScannerText,
  } = props;
  const inputRef = useRef<any>([]);
  useEffect(() => {
    inputRef?.current[displayNumber]?.focus();
  }, [displayNumber]);

  console.log("passageTextWithHighlightTexted", passageTextWithHighlightTexted);
  useEffect(() => {
    getTextEachPart && getTextEachPart(answerList);
  }, []);

  const { setFieldValue } = useFormikContext();

  const handleFocus = (index: number, questionIndex: number) => {
    console.log("fsdf", questionIndex);
    setFieldValue(`answers[${index}].questionId`, data?.questionId || "");
    let sectionRender: any = {};
    sectionRender.question = questionIndex;
    onClickPage && onClickPage(sectionRender);
  };

  const onClickQuestion = (questionIndex: number) => {
    let sectionRender: any = {};
    sectionRender.question = questionIndex;
    onClickPage && onClickPage(sectionRender);
  };

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        {data?.map((question: any, questionIndex: number) => {
          const index = Number(question?.question?.displayNumber) - 1;
          return (
            <div className={classes.question} key={question._id} onClick={() => onClickQuestion(questionIndex)}>
              <div>
                <strong>{`${question?.question?.displayNumber}.`}</strong>
              </div>
              {ReactHtmlParser(question?.question?.questionText)}
              <FastField
                disabled={isView}
                inputRef={(el: any) => (inputRef.current[index + 1] = el)}
                onFocus={() => handleFocus(index, questionIndex)}
                component={TextField}
                name={`answers[${index}].studentAnswer`}
                size="small"
              />
            </div>
          );
        })}
      </div>
      <div className={classes.questionBox}>
        <div
          onClick={(data: any) => {
            onScannerText && onScannerText(data);
          }}
          dangerouslySetInnerHTML={{ __html: passageTextWithHighlightTexted || answerList }}
        />
        {/* {ReactHtmlParser(passageTextWithHighlightTexted || answerList)}</div> */}
      </div>
    </div>
  );
};

export default MachingType;
