import React from "react";
import Title from "views/components/Title/Title";
import ImgHeadPhone from "assets/image/exam/head-phone.png";
import ImgHelpError from "assets/image/exam/help-error.png";
import Text from "../../../../components/Typography/index";
import Button from "@mui/material/Button";
import HelpFooter from "../../../components/HelpFooter/HelpFooter";
import FooterSubmit from "../../../components/FooterSubmit/FooterSubmit";
import { TypeStepExamEnum } from "constants/enum";
import Container from "../../../components/Container/Container";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
import Box from "@mui/material/Box";
import ReactAudioPlayer from "react-audio-player";
// @ts-ignore
import audio from "assets/audio/testSound/test-listening.mp3";
//
const TestHeadPhoneAbc = () => {
  const [testSound, setTestSound] = React.useState(false);
  const containerTest = {
    ...themeCssSx.flexBox.flexJusCenter,
    mt: "60px",
  };
  const btn = {
    color: "#1e415b",
    fonnSize: "15.4px",
    fontWeight: 700,
    margin: "0 auto 16px!important",
    padding: "6px 16px",
    background: "transparent",
    textShadow: "0 1px 1px #fff",
    boxShadow: "0 1px 1px rgb(0 0 0 / 50%)",
    borderRadius: "5px",
    border: "none",
    "&:hover": {
      color: "#1e415b",
      border: "none",
      background: "none",
      boxShadow: "0 1px 1px rgb(0 0 0 / 50%)",
    },
  };
  const boxBtn = {
    ...themeCssSx.flexBox.flexJusCenter,
  };
  const nextStep = TypeStepExamEnum.STEP3;
  const handleTestSound = () => {
    if (testSound === false) {
      setTestSound(true);
    } else {
      setTestSound(false);
    }
  };
  return (
    <Box sx={containerTest}>
      {testSound && <ReactAudioPlayer src={audio} autoPlay controls style={{ display: "none" }} />}
      <div className="">
        <Title image={ImgHeadPhone} text="Test sound" />
        <Container>
          <Text.Desc16 sx={{ mb: "15px" }}>
            Put on your headphones and click on the Play sound button to play a sample sound.
          </Text.Desc16>
          <Box sx={boxBtn}>
            <Button onClick={handleTestSound} sx={btn}>
              {testSound === false && <>Play sound</>} {testSound === true && <>Stop sound</>}
            </Button>
          </Box>
          <HelpFooter textHelp="If your details are not correct, please inform the invigilator." image={ImgHelpError} />
          <FooterSubmit textBtn="Continue" nextStep={nextStep} />
        </Container>
      </div>
    </Box>
  );
};

export default TestHeadPhoneAbc;
