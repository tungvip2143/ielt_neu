import React from "react";
import ReactHtmlParser from "react-html-parser";

type Props = {
  questionBox: any;
};

const QuestionBox = (props: Props) => {
  const { questionBox } = props;
  console.log("questionBox", questionBox);
  return <div dangerouslySetInnerHTML={{ __html: questionBox }} />;
};

export default QuestionBox;
