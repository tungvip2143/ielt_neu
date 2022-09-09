import React, { useEffect, useRef } from "react";
import ReactHtmlParser from "react-html-parser";
import Handlebars from "handlebars";
import { useFormikContext } from "formik";
type Props = {
  data?: any;
};

const SentenceCompletetion = (props: Props) => {
  const { data } = props;
  console.log("sentence data", data);
  const inputRef = useRef<any>([]);
  // const { data, displayNumber, onClickPage, isView = false } = props;
  const displayNumberI = data?.question?.displayNumber;
  console.log("displayNumberI", displayNumberI);

  const { handleChange }: any = useFormikContext();

  Handlebars.registerHelper("blank", function (blankId: any) {
    inputRef?.current[blankId]?.focus();
    return new Handlebars.SafeString(
      `<input ref='${(el: any) =>
        (inputRef.current[blankId] =
          el)}' name='answers.[${blankId}].studentAnswer' style={{border:"1px solid #ccc"}} id="input-${blankId}" type="text" value="" maxlength="30">`
    );
  });
  const test: any = Handlebars.compile(data?.question?.questionText || "");

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: test(),
      }}
      onInput={handleChange}
    />
  );
};

export default SentenceCompletetion;
