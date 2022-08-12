import React from "react";
//
import ReviewContainer from "components/Review/Components/ReviewContainer";
import { Box } from "@mui/system";
import ContentContainerWritingLeft from "./Components/ContentContainerWritingLeft";
import ContainerAnswerLeft from "./Components/ContainerAnswerLeft";
interface Props {
  typeExam?: any;
  title: string;
}

const ReviewWriting = ({ typeExam, title }: Props) => {
  console.log("title", title);
  return (
    <ReviewContainer typeExam={typeExam} title={title}>
      <ContentContainerWritingLeft />
      <ContainerAnswerLeft />
    </ReviewContainer>
  );
};

export default ReviewWriting;
