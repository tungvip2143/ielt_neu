import React from "react";
import { Grid, Box, Stack } from "@mui/material";
import TitleRight from "./TitleRight";
import TaskRight from "./TaskRight";
import ContentOption from "./ContentOption";
import ModalImage from "../../../../components/Modal/ModalImage";
import ModalRightAnswer from "./ModalRightAnswer";
//
// ! type
interface Props {
  apiContent?: any;
  handleOpen?: any;
  handleOpenAnswer?: any;
  handleSetContentModal?: any;
}
const ContentRight = ({ apiContent, handleOpen, handleOpenAnswer, handleSetContentModal }: Props) => {
  console.log("apiContent?.question", apiContent?.question);
  const { displayNumber, image, modelAnswer, organization, questionNumber, tips, usefulGrammarNVocab, text } =
    apiContent?.question || {};
  console.log("questionNumber", questionNumber);
  const container = {
    overflowY: { xs: "", lg: "scroll" },
    height: { xs: "", lg: "calc(100vh - 143px)" },
    position: "relative",
  };
  return (
    <Grid item lg={4.8} sx={container}>
      <Stack direction="column" spacing={2} sx={{ pb: "80px" }}>
        <TitleRight>Band Score</TitleRight>
        <TaskRight questionNumber={displayNumber} handleOpen={handleOpen} />
        <ContentOption handleOpenAnswer={handleOpenAnswer} event={handleSetContentModal} contentRender={text}>
          Feedback
        </ContentOption>
        <ContentOption handleOpenAnswer={handleOpenAnswer} event={handleSetContentModal} contentRender={modelAnswer}>
          Model Answer
        </ContentOption>
        <ContentOption handleOpenAnswer={handleOpenAnswer} event={handleSetContentModal} contentRender={organization}>
          Organisation
        </ContentOption>
        <ContentOption
          handleOpenAnswer={handleOpenAnswer}
          event={handleSetContentModal}
          contentRender={usefulGrammarNVocab}
        >
          Useful Grammar & Vocabulary
        </ContentOption>
        <ContentOption handleOpenAnswer={handleOpenAnswer} event={handleSetContentModal} contentRender={tips}>
          Tips
        </ContentOption>
      </Stack>
    </Grid>
  );
};

export default ContentRight;
