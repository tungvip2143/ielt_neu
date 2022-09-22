import { useFormikContext } from "formik";
import Handlebars from "handlebars";
import { useCallback, useEffect, useMemo } from "react";
import { QuestionItemI } from "../../../constants/typeData.types";
interface SentenceCompletionI {
  data: QuestionItemI;
  displayNumber?: number;
  onClickPage?: (option: object) => void;
  isView?: boolean;
}

const SentenceCompletetion = (props: SentenceCompletionI) => {
  //! State
  const { data, displayNumber, onClickPage, isView = false } = props;
  const displayNumberI = Number(data?.question?.displayNumber);
  const text = data?.question?.questionText;

  console.log("SentenceCompletetion", data);

  const { handleChange, values, setFieldValue }: any = useFormikContext() ?? {};

  useEffect(() => {
    let input = document.getElementsByClassName(`${displayNumber}`) as any;
    if (input) {
      input[0]?.focus();
    }
  }, [displayNumber]);

  let inputIndex = 0;

  Handlebars.registerHelper("blank", function (blankId: any, option) {
    const questionId = option.data.root;
    inputIndex++;
    const input: any = document.getElementById(`${blankId}`);
    if (input) {
      input.value = isView ? "" : values.answers?.[displayNumberI - 1]?.studentAnswer;
      values?.answers?.[displayNumberI - 1]?.questionId === questionId;
    }
    return new Handlebars.SafeString(
      `<strong>${data?.question?.displayNumber}</strong> <input ${
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
    // >>>>>>> 1cff5f16cd0b8eb56eb6730a9abc4681375619b8
    onClickPage && onClickPage({ question: inputIdx });
    setFieldValue(`answers[${displayNumber - 1}].questionId`, data.questionId);
  }, []);

  //! Render
  return (
    <>
      <div
        onClick={(data) => onClickInput(data)}
        onFocus={(event) => onFocusInput(event, displayNumber)}
        dangerouslySetInnerHTML={{
          __html: test(data.questionId),
        }}
        onInput={handleChange}
      />
    </>
  );
};

export default SentenceCompletetion;
