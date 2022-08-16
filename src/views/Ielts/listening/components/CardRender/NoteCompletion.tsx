import React from "react";
import ReactHtmlParser from "react-html-parser";
import Handlebars from "handlebars";
import { FastField } from "formik";
import ReactAudioPlayer from "react-audio-player";
import { Box } from "@mui/material";
import { ROOT_ORIGINAL_URL } from "constants/api";

type Props = {
  questionBox?: any;
  audio?: any;
};

const NoteCompletion = (props: Props) => {
  const { questionBox, audio } = props;
  console.log("questionBox", questionBox);
  Handlebars.registerHelper("blank", function (blankId: any) {
    return new Handlebars.SafeString(
      `<input name='answers'  id="input-${blankId}" type="text" value="" maxlength="30">`
    );
  });

  const test: any = Handlebars.compile(questionBox);
  return (
    <>
      <Box sx={{ mb: "20px" }}>
        <ReactAudioPlayer src={`${ROOT_ORIGINAL_URL}/${audio}`} autoPlay controls />
      </Box>
      <div dangerouslySetInnerHTML={{ __html: test() }} />;
    </>
  );
};

export default NoteCompletion;
