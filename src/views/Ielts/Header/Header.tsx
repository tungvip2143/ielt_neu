import React from "react";
//
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { Box, Button, Stack } from "@mui/material";
import CountDown from "components/Countdown/CountDown";
//
import { useStepExam } from "provider/StepExamProvider";
import { TypeStepExamEnum } from "constants/enum";
//
import LogoIelts from "assets/image/header/logo-ielts.png";
import LogoEnglish from "assets/image/header/IELTSpartners.e1a4eda8.jpg";
import ButtonHelp from "../../components/ButtonHelp/ButtonHelp";
import OptionButton from "../../Exam/OptionButton/OptionButton";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
import NumberUser from "assets/image/exam/number-user.png";
//
// ! type
interface Props {
  onShowModalExit?: any;
  handleOpenModalHelp?: () => void;
  handleOpenModalHide?: () => void;
}
const header = {
  p: "2px 0px",
  background: "#36373b",
  zIndex: 999,
  width: "100%",
};
const headerContent = {
  m: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "5px 20px",
  minHeight: "40px",
};
const buttonExit = {
  color: "#8a8c91",
  letterSpacing: "2px",
};

//
const headerTop = {};
const logo = {
  height: "60px",
};
const Header = ({ onShowModalExit, handleOpenModalHelp, handleOpenModalHide }: Props) => {
  console.log("fsdfsd", handleOpenModalHide);
  const { step, handler } = useStepExam();
  const hanldeShowModalExit = () => {
    onShowModalExit();
  };

  const hanldeSubmitSpeakingExam = () => {
    handler?.setStep && handler.setStep(TypeStepExamEnum.STEP4);
  };
  const btnHelp = {
    cursor: "pointer",
  };
  const optionBtn = {
    cursor: "pointer",
  };

  return (
    <Box>
      <Box sx={headerTop}>
        <img style={logo} src={LogoIelts} alt="" />
      </Box>
      <Box sx={header}>
        <Box sx={headerContent}>
          {(step === TypeStepExamEnum.STEP2 || step === TypeStepExamEnum.STEP3) && (
            <Stack direction="row" spacing={1} sx={themeCssSx.flexBox.flexJusAlign}>
              <img style={{ width: "18px", height: "18px" }} src={NumberUser} alt="" />
              <p style={{ color: "#fff", fontSize: "14px" }}>XXXXX XXXX - 123456</p>
            </Stack>
          )}

          {step === TypeStepExamEnum.STEP3 && <CountDown />}
          {step === TypeStepExamEnum.STEP3 && (
            // <Button
            //   sx={btnSubmitStep2}
            //   endIcon={<AssignmentTurnedInIcon sx={{ fontSize: "24px !important" }} />}
            //   onClick={hanldeSubmitSpeakingExam}
            // >
            //   SUBMIT
            // </Button>
            <Stack direction="row" spacing={1} sx={themeCssSx.flexBox.flexJusAlign}>
              <ButtonHelp handleOpenModalHelp={handleOpenModalHelp} style={btnHelp} />
              <OptionButton handleOpenModalHide={handleOpenModalHide} addCss={optionBtn}>
                Hide
              </OptionButton>
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(Header);
