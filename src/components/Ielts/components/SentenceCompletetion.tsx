import CommonStyles from "components/CommonStyles";
import { useFormikContext } from "formik";
import Handlebars from "handlebars";
import { useHightLightText } from "hooks/ielts/useHightLightTextScannerHook";
import { useEffect } from "react";
type Props = {
  data?: any;
  displayNumber?: number;
  onClickPage?: (option: any) => void;
  isView?: boolean;
};

const SentenceCompletetion = (props: Props) => {
  const { data, displayNumber, onClickPage, isView = false } = props;
  const displayNumberI = Number(data?.question?.displayNumber);
  const text = data?.question?.questionText;

  console.log("text", text);

  const { handleChange, values, setFieldValue }: any = useFormikContext();

  const {
    onScannerText,
    onHightlight,
    passageTextWithHighlightTexted,
    position,
    isOpenOptionClear,
    onCloseNote,
    onClearHightLightAll,
    onClickNote,
    onClearHightLight,
    isNoted,
    isHightLight,
    onInputChange,
  } = useHightLightText({ text, values, onChangeInput: setFieldValue, tagName: "DIV" });

  console.log("isHightLight123", isHightLight);

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
  const test: any = Handlebars.compile(passageTextWithHighlightTexted || "");

  const onClickInput = (data: any) => {
    const inputIdx: any = data.target.getAttribute("id") - 1;
    onClickPage && onClickPage({ question: inputIdx });
    onScannerText(data);
  };
  const onFocusInput = (event: any) => {
    const inputIdx: any = event.target.getAttribute("id") - 1;
    onClickPage && onClickPage({ question: inputIdx });
  };

  return (
    <>
      <div
        onClick={(data) => onClickInput(data)}
        onFocus={(event) => onFocusInput(event)}
        dangerouslySetInnerHTML={{
          __html: test(data.questionId),
        }}
        onInput={handleChange}
      />
      {isHightLight && (
        <CommonStyles.HightLightDialog onClickHighlight={onHightlight} onClickNote={onClickNote} position={position} />
      )}
      <CommonStyles.Note
        position={position}
        isOpenNote={isNoted}
        onCloseNote={onCloseNote}
        onChangeTextNote={onInputChange}
      />
      {isOpenOptionClear && (
        <CommonStyles.ClearDialog
          position={position}
          onClearHightlight={onClearHightLight}
          onClearHightlightAll={onClearHightLightAll}
        />
      )}
    </>
  );
};

export default SentenceCompletetion;
