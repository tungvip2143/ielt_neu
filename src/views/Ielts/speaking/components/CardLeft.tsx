import React from "react";
import Bg from "assets/image/speaking-exam/teach_illustration_deactive.svg";
import { themeCssSx } from "../../../../ThemeCssSx/ThemeCssSx";
import QuestionItem from "./QuestionItem";
import { Box } from "@mui/system";
// ! TYPE
interface Props {
  ContentQuestion?: any;
  numberPage?: any;
}

const CardLeft = (props: Props) => {
  const { ContentQuestion, numberPage } = props;
  console.log("dataGruop", ContentQuestion);
  // console.log("audio", audio);

  const contianer = {
    ...themeCssSx.flexBox.flexJusAlign,
    height: "100%",
  };
  return (
    <div style={{ height: "70%" }}>
      {ContentQuestion?.questions?.map((question: any) => {
        return <>{numberPage === question?.question?.displayNumber && <QuestionItem question={question} />}</>;
      })}
      <Box sx={contianer}>
        <img src={Bg} alt="" />
      </Box>
    </div>
  );
};

export default CardLeft;
