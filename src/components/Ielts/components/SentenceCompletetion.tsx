import { useFormikContext } from "formik";
import Handlebars from "handlebars";
import { useEffect } from "react";
type Props = {
  data?: any;
  displayNumber?: number;
  onClickPage?: (option: any) => void;
};

const SentenceCompletetion = (props: Props) => {
  const { data, displayNumber, onClickPage } = props;
  const displayNumberI = data?.question?.displayNumber;
  console.log("``", data);

  const { handleChange, values }: any = useFormikContext();

  useEffect(() => {
    const input = document.getElementsByClassName(`${displayNumber}`) as any;
    if (input) {
      input[0].focus();
    }
  }, [displayNumber]);

  let inputIndex = 0;
  Handlebars.registerHelper("blank", function (blankId: any) {
    inputIndex++;
    const input: any = document.getElementById(`${blankId}`);
    if (input) {
      input.value = values.answers[displayNumberI - 1].studentAnswer;
    }
    return new Handlebars.SafeString(
      `<strong>${data?.question?.displayNumber}</strong> <input class="${displayNumberI}" name='answers.[${
        displayNumberI - 1
      }].studentAnswer' style={{border:"1px solid #ccc"}} id="${blankId}" type="text" value="" maxlength="30">`
    );
  });
  const test: any = Handlebars.compile(data?.question?.questionText || "");

  const onClickInput = (data: any) => {
    const inputIdx: any = data.target.getAttribute("id") - 1;
    onClickPage && onClickPage({ question: inputIdx });
  };

  return (
    <div
      onClick={(data) => onClickInput(data)}
      dangerouslySetInnerHTML={{
        __html: test(),
      }}
      onInput={handleChange}
    />
  );
};

export default SentenceCompletetion;
