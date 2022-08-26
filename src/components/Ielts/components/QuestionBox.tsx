import { useFormikContext } from "formik";
import Handlebars from "handlebars";
import { useEffect, useMemo } from "react";

type Props = {
  questionBox: any;
  displayNumber: number;
  questions: any[];
  onClickPage?: (option: any) => void;
};

const CODE = "-@X$";

const convertBlankIdToQuestionId = (questionBox = "", blankId: number, questionId: number) => {
  console.log({ blankId, questionId, questionBox });
  questionBox = questionBox.replace(`{{blank ${blankId}}}`, `{{blank ${questionId}${CODE}}}`);
  console.log("questionBox", questionBox);
  return questionBox;
};

const QuestionBox = (props: Props) => {
  const { questionBox, questions, displayNumber, onClickPage } = props;
  const { handleChange, values, setFieldValue }: any = useFormikContext();
  console.log("values", values);

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

  Handlebars.registerHelper("blank", function (blankId: number) {
    const input: any = document.querySelector(`[id=input-${blankId}]`);
    if (input) {
      input.value = values.answers[blankId - 1].studentAnswer;
    }
    return new Handlebars.SafeString(
      `<input name='answers.[${blankId - 1}].studentAnswer' 
       id="input-${blankId}" type="text" maxlength="30">`
    );
  });

  const test: any = Handlebars.compile(newQuestionBoxParsed);
  return <div dangerouslySetInnerHTML={{ __html: test() }} onInput={handleChange} />;
};

export default QuestionBox;
