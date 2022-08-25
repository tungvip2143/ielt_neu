import React, { useCallback, useEffect, useRef } from "react";
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
  const containerHTMLRef = useRef<any>(null);
  const { values, handleChange }: any = useFormikContext();

  useEffect(() => {
    const input = document.getElementById(`input-${displayNumber}`)?.focus() as any;
    console.log("input", input);
    if (input) {
      input?.focus();
    }
  }, [displayNumber]);

  Handlebars.registerHelper("blank", function (blankId: string, option) {
    console.log("option", option.data.root);
    const questionNumber = option.data.root;
    return new Handlebars.SafeString(
      `<input  name='answers.[${questionNumber}].studentAnswer'   id="input-${questionNumber}" type="text" maxlength="30">`
    );
  });

  const test: any = Handlebars.compile(questionBox);

  return (
    <div dangerouslySetInnerHTML={{ __html: test(displayNumber) }} onInput={handleChange} ref={containerHTMLRef} />
  );
};

export default QuestionBox;
