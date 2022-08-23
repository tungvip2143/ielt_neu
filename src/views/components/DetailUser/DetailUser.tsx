import React from "react";
import { Box, Stack } from "@mui/system";
import { themeCssSx } from "../../../ThemeCssSx/ThemeCssSx";
import ImgUser from "assets/image/exam/logo-user.png";
import Text from "../../../components/Typography/index";
//
import { TypeStepExamEnum } from "constants/enum";
import { useStepExam } from "../../../provider/StepExamProvider";
import FooterSubmit from "../FooterSubmit/FooterSubmit";
import HelpFooter from "../HelpFooter/HelpFooter";
import Title from "../Title/Title";
import Container from "../Container/Container";
import ImgHelp from "assets/image/exam/help.png";

const DetailUser = () => {
  const container = {
    ...themeCssSx.flexBox.flexJusCenter,
    mt: "60px",
  };
  const introduceUser = {
    m: "5px 0",
  };
  const textHelp = "If your details are not correct, please inform the invigilator.";
  const textBtn = " My details are correct";
  const nextStep = TypeStepExamEnum.STEP2;
  return (
    <Box sx={container}>
      <Box>
        <Title image={ImgUser} text="Confirm your details" />
        <Container>
          <Text.Desc16 sx={introduceUser}>Name:</Text.Desc16>
          <Text.Desc16 sx={introduceUser}>Date of birth:</Text.Desc16>
          <Text.Desc16 sx={introduceUser}>Candidate number:</Text.Desc16>
          <HelpFooter textHelp={textHelp} image={ImgHelp} />
          <FooterSubmit textBtn={textBtn} nextStep={nextStep} />
        </Container>
      </Box>
    </Box>
  );
};

export default DetailUser;
