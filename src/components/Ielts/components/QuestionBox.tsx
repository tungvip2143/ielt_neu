import React from "react";
import ReactHtmlParser from "react-html-parser";
import Handlebars from "handlebars";
import { FastField, useFormikContext } from "formik";

type Props = {
  questionBox: any;
};

const QuestionBox = (props: Props) => {
  const { questionBox } = props;
  console.log("questionBox", questionBox);
  const { values, handleChange }: any = useFormikContext();

  Handlebars.registerHelper("blank", function (blankId: any) {
    return new Handlebars.SafeString(
      `<input name='answers.[${blankId}].studentAnswer'   id="input-${blankId}" type="text" value="${values.answers[blankId].studentAnswer}" maxlength="30">`
    );
  });

  const test: any = Handlebars.compile(questionBox);
  return <div dangerouslySetInnerHTML={{ __html: test() }} onInput={handleChange} />;
};

export default QuestionBox;
