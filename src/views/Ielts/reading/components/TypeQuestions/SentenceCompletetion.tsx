import { useFormikContext } from "formik";
import Handlebars from "handlebars";
import { useCallback, useEffect, useMemo } from "react";
import { QuestionItemI } from "../../../../../constants/typeData.types";
interface SentenceCompletionI {
  questionItem: QuestionItemI;
  displayNumber?: number;
  onClickPage?: (option: object) => void;
  isView?: boolean;
}

const SentenceCompletetion = (props: SentenceCompletionI) => {
  //! State
  const { questionItem, displayNumber, onClickPage, isView = false } = props;

  const displayNumberI = Number(questionItem.question.displayNumber);

  const text = questionItem.question.questionText;

  const { handleChange, values, setFieldValue }: any = useFormikContext() ?? {};

  useEffect(() => {
    let input = document.getElementsByClassName(`${displayNumber}`) as Element | any;
    if (input) {
      input[0]?.focus();
    }
  }, [displayNumber]);

  let inputIndex = 0;

  Handlebars.registerHelper("blank", function (blankId: number, option) {
    const questionId = option.data.root;
    inputIndex++;
    const input: any = document.getElementById(`${blankId}`);
    if (input) {
      input.value = isView ? "" : values.answers?.[displayNumberI - 1]?.studentAnswer;
      values?.answers?.[displayNumberI - 1]?.questionId === questionId;
    }

    return new Handlebars.SafeString(
      `<strong>${questionItem?.question?.displayNumber}</strong> <input ${
        isView ? "disabled" : ""
      } class="${displayNumberI} noselect" name='answers.[${
        displayNumberI - 1
      }].studentAnswer' style={{border:"1px solid #ccc"}} id="${blankId}" type="text" value="" maxlength="30">`
    );
  });
  const test: any = Handlebars.compile(text || "");

  // <<<<<<< HEAD
  //   const onClickInput = (event: any) => {
  //     const inputIdx: any = event.target.classList[0] - 1;
  //     setFieldValue(`answers[${inputIdx}].questionId`, data?.questionId);
  //     onClickPage && onClickPage({ question: inputIdx });
  //   };
  //   const onFocusInput = useCallback((event: any) => {
  //     const inputIdx: any = event.target.classList[0] - 1;
  //     setFieldValue(`answers[${inputIdx}].questionId`, data?.questionId);
  // =======
  const onClickInput = (data: any) => {
    const inputIdx: number = data.target.getAttribute("id") - 1;
    onClickPage && onClickPage({ question: inputIdx });
  };

  const onFocusInput = useCallback((event: any, displayNumber: any) => {
    const inputIdx: number = event.target.getAttribute("id") - 1;

    onClickPage && onClickPage({ question: inputIdx });
    setFieldValue(`answers[${displayNumber - 1}].questionId`, questionItem.questionId);
  }, []);

  //! Render
  return (
    <>
      <div
        onClick={(data) => onClickInput(data)}
        onFocus={(event) => onFocusInput(event, displayNumber)}
        dangerouslySetInnerHTML={{
          __html: test(questionItem.questionId),
        }}
        onInput={handleChange}
      />
    </>
  );
};

export default SentenceCompletetion;
