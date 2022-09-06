import { useFormikContext } from "formik";
import Handlebars from "handlebars";
import { useEffect, useMemo } from "react";

type Props = {
  questionBox: any;
  displayNumber: number;
  questions: any[];
  onClickPage?: (option: any) => void;
  isView?: boolean;
};

const CODE = "-@X$";

const convertBlankIdToQuestionId = (questionBox = "", blankId: number, questionId: number) => {
  questionBox = questionBox.replace(`{{blank ${blankId}}}`, `{{blank ${questionId}${CODE}}}`);
  return questionBox;
};

const QuestionBox = (props: Props) => {
  const { questionBox, questions, displayNumber, onClickPage, isView = false } = props;
  console.log("questions", questions);

  const { handleChange, values, setFieldValue }: any = useFormikContext();
  const newQuestionBoxParsed = useMemo(() => {
    let tempQuestionBox = questionBox;
    questions.forEach((el) => {
      const { blankNumber, displayNumber } = el.question;
      setFieldValue(`answers[${displayNumber - 1}].questionId`, el.questionId);
      tempQuestionBox = convertBlankIdToQuestionId(tempQuestionBox, Number(blankNumber), Number(displayNumber));
    });

    tempQuestionBox = tempQuestionBox.replaceAll(CODE, "");
    return tempQuestionBox;
  }, [questions, questionBox]);

  useEffect(() => {
    const input = document.querySelector(`[id=input-${displayNumber}]`) as any;
    if (input) {
      input?.focus();
    }
  }, [displayNumber]);
  //

  //
  let inputIndex = 0;
  Handlebars.registerHelper("blank", function (blankId: number) {
    console.log("blankId", blankId);
    inputIndex++;
    const input: any = document.querySelector(`[id=input-${blankId}]`);
    if (input) {
      input.value = isView ? "" : values.answers[blankId - 1].studentAnswer;
    }
    return new Handlebars.SafeString(
      `<input class="${inputIndex}" ${isView ? "disabled" : ""}  name='answers.[${blankId - 1}].studentAnswer' 
       id="input-${blankId}" type="text" maxlength="30">`
    );
  });

  const onClickInput = (data: any) => {
    const inputIdx: any = data.target.getAttribute("class") - 1;
    onClickPage && onClickPage({ question: inputIdx });
  };

  const test: any = Handlebars.compile(newQuestionBoxParsed);

  return (
    <>
      <div onClick={(data) => onClickInput(data)} dangerouslySetInnerHTML={{ __html: test() }} onInput={handleChange} />
    </>
  );
};

export default QuestionBox;
