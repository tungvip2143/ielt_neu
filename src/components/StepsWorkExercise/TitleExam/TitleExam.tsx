import React from "react";
//
import Text from "components/Typography/index";
import ReactHtmlParser from "react-html-parser";

// !type
interface Props {
  dataNumber?: {
    from: any;
    to: any;
  };
  title?: any;
}

const TitleExam = ({ dataNumber, title }: Props) => {
  console.log("title", title);
  const groupStartNumber = title?.questions[0]?.question?.displayNumber;

  const groupEndNumber = title?.questions[title.questions.length - 1]?.question?.displayNumber;
  return (
    <>
      <Text.Desc16
        sx={{ fontSize: "18px !important", fontWeight: "bold", mb: "20px" }}
      >{`Question ${groupStartNumber} - ${groupEndNumber}`}</Text.Desc16>
      <Text.Desc16 sx={{ mb: "20px" }}>{ReactHtmlParser(title?.directionText)}</Text.Desc16>
    </>
  );
};

export default TitleExam;
