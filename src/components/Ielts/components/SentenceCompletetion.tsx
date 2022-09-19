import CommonStyles from "components/CommonStyles";
import { useFormikContext } from "formik";
import Handlebars from "handlebars";
import { useHightLightText } from "hooks/ielts/useHightLightTextScannerHook";
import { useEffect } from "react";
import { QuestionItemI } from "../../../constants/typeData.types";
interface SentenceCompletionI {
  data?: QuestionItemI;
  displayNumber?: number;
  onClickPage?: (option: object) => void;
  isView?: boolean;
}

const SentenceCompletetion = (props: SentenceCompletionI) => {
  const { data, displayNumber, onClickPage, isView = false } = props;
  const displayNumberI = Number(data?.question?.displayNumber);
  const text = data?.question?.questionText;

  // console.log("text", text);

  const { handleChange, values }: any = useFormikContext();

  useEffect(() => {
    let input: HTMLCollectionOf<Element | any> = document.getElementsByClassName(`${displayNumber}`);
    if (input) {
      input[0]?.focus();
    }
  }, [displayNumber]);

  let inputIndex = 0;
  Handlebars.registerHelper("blank", function (blankId: number, option) {
    // console.log("Fsdfsd", blankId);
    const questionId = option.data.root;
    inputIndex++;
    const input: any = document.getElementById(`${blankId}`);
    if (input) {
      input.value = isView ? "" : values.answers[displayNumberI - 1]?.studentAnswer;
      values.answers[displayNumberI - 1].questionId = questionId;
    }
    return new Handlebars.SafeString(
      `<strong>${data?.question?.displayNumber}</strong> <input ${
        isView ? "disabled" : ""
      } class="${displayNumberI}" name='answers.[${
        displayNumberI - 1
      }].studentAnswer' style={{border:"1px solid #ccc"}} id="${blankId}" type="text" value="" maxlength="30">`
    );
  });
  const test: HandlebarsTemplateDelegate<any> = Handlebars.compile(text || "");

  const onClickInput = (data: Event | any) => {
    const inputIdx: number = data.target.getAttribute("id") - 1;
    onClickPage && onClickPage({ question: inputIdx });
  };
  const onFocusInput = (event: Event | any) => {
    const inputIdx: number = event.target.getAttribute("id") - 1;
    onClickPage && onClickPage({ question: inputIdx });
  };

  return (
    <>
      <div
        onClick={(data) => onClickInput(data)}
        onFocus={(event) => onFocusInput(event)}
        dangerouslySetInnerHTML={{
          __html: test(data?.questionId),
        }}
        onInput={handleChange}
      />
    </>
  );
};

export default SentenceCompletetion;
