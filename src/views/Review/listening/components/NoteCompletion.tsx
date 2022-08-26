import React from "react";
import ReactHtmlParser from "react-html-parser";
import Handlebars from "handlebars";
import { FastField, useFormikContext } from "formik";
import { Box } from "@mui/material";
import StudentAnswer from "./StudentAnswer";
import Text from "components/Typography/index";

type Props = {
  questionBox?: any;
  data?: any;
};

const NoteCompletion = (props: Props) => {
  const { questionBox, data } = props;
  const { values, handleChange }: any = useFormikContext();
  console.log("data", data);

  Handlebars.registerHelper("blank", function (blankId: any) {
    return new Handlebars.SafeString(
      `
        <input
            
            id="input-${blankId}"
            type="text"
            onChange="handleTest()"
          />
        `
    );
  });

  const test: any = Handlebars.compile(questionBox);
  const yourAnswer = {
    mt: "30px",
    color: "#000000",
  };
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: test() }} onInput={handleChange} />
      <Text.Sub20Bold sx={yourAnswer}>Your answer</Text.Sub20Bold>
      <Box sx={{ mt: "20px", display: "flex", flexWrap: "wrap" }}>
        {data.map((answer: any, index: any) => {
          return (
            <StudentAnswer key={index} answer={answer.studentAnswer} numberOrder={answer.question.displayNumber} />
          );
        })}
      </Box>
    </>
  );
};

export default NoteCompletion;
