import React, { useEffect, useRef } from "react";
import ReactHtmlParser from "react-html-parser";
import Handlebars from "handlebars";
import { FastField, useFormikContext } from "formik";

type Props = {
  questionBox: any;
  displayNumber: number;
};

const QuestionBox = (props: Props) => {
  const { questionBox, displayNumber } = props;
  console.log("questionBox", questionBox);
  const inputRef = useRef<any>([]);

  const { values, handleChange }: any = useFormikContext();

  Handlebars.registerHelper("blank", function (blankId: any) {
    return new Handlebars.SafeString(
      `<input ref='${(el: any) =>
        (inputRef.current[blankId] =
          el)}' name='answers.[${blankId}].studentAnswer'   id="input-${blankId}" type="text" maxlength="30">`
    );
  });

  useEffect(() => {
    inputRef?.current[displayNumber]?.focus();
  }, []);

  const test: any = Handlebars.compile(questionBox);
  return <div dangerouslySetInnerHTML={{ __html: test() }} onInput={handleChange} />;
};

export default QuestionBox;
