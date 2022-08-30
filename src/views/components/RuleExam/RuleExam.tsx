import React from "react";
import { Box, Stack } from "@mui/system";
import { themeCssSx } from "../../../ThemeCssSx/ThemeCssSx";
import Text from "../../../components/Typography/index";
import ImgHelp from "assets/image/exam/help.png";
import ImgUser from "assets/image/exam/logo-user.png";
import ButtonCommon from "components/Button/ButtonCommon";
import { Button } from "@mui/material";
import HelpFooter from "../HelpFooter/HelpFooter";
import FooterSubmit from "../FooterSubmit/FooterSubmit";
import { TypeStepExamEnum } from "constants/enum";

// ! type
interface Props {
  stepRuleExam: {
    typeExam?: string;
    time?: string;
    informationsForCandidates?: React.ReactNode;
    intructionsToCandidates?: React.ReactNode;
  };
  nextStep?: string;
}
const container = {
  m: "0px 10px",
  p: "16px 10px",
  background: "#dde3ee",
  boxShadow: "0 0.0714em 0.214em rgb(0 0 0 / 25%)",
  borderRadius: "6px",
};
const textTime = {
  p: "20px 0",
};
const textTitle = {
  pb: "20px",
  fontWeight: 700,
};
const textHelp = "Do not click 'Start test' until you are told to do so.";
const textBtn = "Start test";

const RuleExam = (props: Props) => {
  const {
    nextStep,
    stepRuleExam: { typeExam, time, informationsForCandidates, intructionsToCandidates },
  } = props;
  // console.log("typeExam", typeExam);
  return (
    <Box sx={container}>
      <Text.DescMedium sx={{ fontWeight: 700 }}>IELTS Academic {typeExam} </Text.DescMedium>
      <Text.DescSmall sx={textTime}>Time: {time}</Text.DescSmall>
      <Text.DescMedium sx={textTitle}>INSTRUCTIONS TO CANDIDATES</Text.DescMedium>
      {informationsForCandidates}
      <Text.DescMedium sx={textTitle}>INFORMATION FOR CANDIDATES</Text.DescMedium>
      {intructionsToCandidates}
      <Box sx={{ ...themeCssSx.flexBox.flexJusCenter }}>
        <HelpFooter textHelp={textHelp} image={ImgHelp} />
      </Box>
      <FooterSubmit textBtn={textBtn} nextStep={nextStep} />
    </Box>
  );
};

export default RuleExam;
