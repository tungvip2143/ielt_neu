import React from "react";
import ReactHtmlParser from "react-html-parser";
import Handlebars from "handlebars";
import { FastField, useFormikContext } from "formik";
import { Box } from "@mui/material";
import { decode } from "html-entities";

type Props = {
  questionBox?: any;
};

const NoteCompletion = (props: Props) => {
  const { questionBox } = props;
  console.log("questionBox", questionBox);
  const { values, handleChange }: any = useFormikContext();

  console.log("formik value", values);
  const a = { b: 1 };

  const handleTest = () => {
    console.log("hihi");
  };

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

  const text = ReactHtmlParser(questionBox);

  const test: any = Handlebars.compile(questionBox);
  return (
    <>
      {/* <div dangerouslySetInnerHTML={{ __html: decode(questionBox) }} onInput={handleChange} /> */}
      <div dangerouslySetInnerHTML={{ __html: test() }} onInput={handleChange} />
    </>
  );
};

export default NoteCompletion;
