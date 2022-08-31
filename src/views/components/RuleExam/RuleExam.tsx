import React from "react";
import { Box, Stack } from "@mui/system";
import { themeCssSx } from "../../../ThemeCssSx/ThemeCssSx";
import Text from "../../../components/Typography/index";
import HelpFooter from "../HelpFooter/HelpFooter";
import FooterSubmit from "../FooterSubmit/FooterSubmit";
import { makeStyles } from "@mui/styles";
import { warningDetailUser, textBtnSubmit } from "constants/constants";
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
//! css
const useStyles = makeStyles((theme) => {
  return {
    container: {
      background: theme.palette.background.exercises,
      boxShadow: "0 0.0714em 0.214em rgb(0 0 0 / 25%)",
      borderRadius: "6px",
      margin: "0px 10px",
      padding: "16px 10px",
    },
  };
});

const textTime = {
  padding: "20px 0",
};
const textTitle = {
  padding: "20px",
  fontWeight: 700,
};

const RuleExam = (props: Props) => {
  //! State
  const classes = useStyles();
  const {
    nextStep,
    stepRuleExam: { typeExam, time, informationsForCandidates, intructionsToCandidates },
  } = props;

  //! Render

  return (
    <Box className={classes.container}>
      <Text.DescMedium sx={{ fontWeight: 700 }}>IELTS Academic {typeExam} </Text.DescMedium>
      <Text.DescSmall sx={textTime}>Time:{time}</Text.DescSmall>
      <Text.DescMedium sx={textTitle}>INSTRUCTIONS TO CANDIDATES</Text.DescMedium>
      {informationsForCandidates}
      <Text.DescMedium sx={textTitle}>INFORMATION FOR CANDIDATES</Text.DescMedium>
      {intructionsToCandidates}
      <Box sx={{ ...themeCssSx.flexBox.flexBetWeen }}>
        <HelpFooter textHelp={warningDetailUser.onStartTest} />
      </Box>
      <FooterSubmit textBtn={textBtnSubmit.startTest} nextStep={nextStep} />
    </Box>
  );
};

export default RuleExam;
