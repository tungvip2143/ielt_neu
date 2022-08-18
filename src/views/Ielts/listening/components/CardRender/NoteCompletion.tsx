import React from "react";
import ReactHtmlParser from "react-html-parser";
import Handlebars from "handlebars";
import { FastField, useFormikContext } from "formik";
import ReactAudioPlayer from "react-audio-player";
import { Box } from "@mui/material";
import { ROOT_ORIGINAL_URL } from "constants/api";

type Props = {
  questionBox?: any;
  audio?: any;
};

const NoteCompletion = (props: Props) => {
  const { questionBox, audio } = props;
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
          name="answers[${blankId - 1}].studentAnswer"
          id="input-${blankId}"
          type="text"
          onChange="handleTest()"
          value='${values.answers[blankId - 1].studentAnswer}'
        />
      `
    );
  });

  const text = ReactHtmlParser(questionBox);

  const test: any = Handlebars.compile(questionBox);
  return (
    <>
      <Box sx={{ mb: "20px" }}>
        <ReactAudioPlayer src={`${ROOT_ORIGINAL_URL}/${audio}`} autoPlay controls style={{ display: "none" }} />
      </Box>
      <div dangerouslySetInnerHTML={{ __html: test() }} onInput={handleChange} />;{/* <div>{text}</div> */}
    </>
  );
};

export default NoteCompletion;
