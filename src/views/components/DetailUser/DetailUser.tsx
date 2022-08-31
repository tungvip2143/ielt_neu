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
import { textHeaderModal, warningDetailUser, textBtnSubmit } from "../../../constants/constants";
//

// !type
interface Props {
  user?: any;
}
//! Css

const DetailUser = (props: Props) => {
  //! State
  const { user } = props;

  const container = {
    ...themeCssSx.flexBox.flexJusCenter,
    mt: "60px",
  };
  const introduceUser = {
    m: "5px 0",
  };
  const nextStep = TypeStepExamEnum.STEP2;
  //! Reder

  return (
    <Box sx={container}>
      <Box>
        <Title image={ImgUser} text={textHeaderModal.confirmDetail} />
        <Container>
          <Text.Desc16 sx={introduceUser}>Name:{user?.fullname}</Text.Desc16>
          <Text.Desc16 sx={introduceUser}>Date of birth:{user?.dob}</Text.Desc16>
          <Text.Desc16 sx={introduceUser}>Candidate number:{user?._id}</Text.Desc16>
          <HelpFooter textHelp={warningDetailUser.checkInformation} image={ImgHelp} />
          <FooterSubmit textBtn={textBtnSubmit.detailUser} nextStep={nextStep} />
        </Container>
      </Box>
    </Box>
  );
};

export default DetailUser;
