import React from "react";
import ReactHtmlParser from "react-html-parser";
import Handlebars from "handlebars";
import { FastField } from "formik";

type Props = {
  questionBox: any;
};

const QuestionBox = (props: Props) => {
  const { questionBox } = props;
  console.log("questionBox", questionBox);
  Handlebars.registerHelper("blank", function (blankId: any) {
    return new Handlebars.SafeString(
      `<input name='answers[6].studentAnswer'  id="input-${blankId}" type="text" value="" maxlength="30">`
    );
  });

  const test: any = Handlebars.compile(questionBox);
  return <div dangerouslySetInnerHTML={{ __html: test() }} />;
};

export default QuestionBox;
