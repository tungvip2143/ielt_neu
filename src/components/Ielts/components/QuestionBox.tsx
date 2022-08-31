import { useFormikContext } from "formik";
import Handlebars from "handlebars";
import { useEffect, useMemo, useState } from "react";

type Props = {
  questionBox: any;
  displayNumber: number;
  questions: any[];
  onClickPage?: (option: any) => void;
};

const CODE = "-@X$";

const convertBlankIdToQuestionId = (questionBox = "", blankId: number, questionId: number) => {
  questionBox = questionBox.replace(`{{blank ${blankId}}}`, `{{blank ${questionId}${CODE}}}`);
  return questionBox;
};

const QuestionBox = (props: Props) => {
  const [questionitem, setQuestionItem] = useState<any>();
  const { questionBox, questions, displayNumber, onClickPage } = props;
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
    inputIndex++;
    const input: any = document.querySelector(`[id=input-${blankId}]`);
    if (input) {
      input.value = values.answers[blankId - 1].studentAnswer;
    }
    return new Handlebars.SafeString(
      `<strong>${blankId}</strong><input class="${inputIndex}"  name='answers.[${blankId - 1}].studentAnswer' 
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
