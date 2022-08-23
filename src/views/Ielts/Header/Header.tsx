import React from "react";
//
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { Box, Button } from "@mui/material";
import CountDown from "components/Countdown/CountDown";
//
import { useStepExam } from "provider/StepExamProvider";
import { TypeStepExamEnum } from "constants/enum";
//
import LogoIelts from "assets/image/header/logo-ielts.png";
import LogoEnglish from "assets/image/header/IELTSpartners.e1a4eda8.jpg";
import ButtonHelp from "../../components/ButtonHelp/ButtonHelp";
//
// ! type
interface Props {
  onShowModalExit?: any;
  handleOpenModalHelp?: () => void;
}
const header = {
  p: "2px 0px",
  background: "#36373b",
  position: "fixed",
  zIndex: 999,
  width: "100%",
};
const headerContent = {
  width: "82%",
  m: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const buttonExit = {
  color: "#8a8c91",
  letterSpacing: "2px",
};
const btnSubmitStep2 = {
  color: "#b8bcc0",
};
//
const headerTop = {};
const logo = {
  height: "80px",
};
const Header = ({ onShowModalExit, handleOpenModalHelp }: Props) => {
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

  return (
    <>
      <Box sx={headerTop}>
        <img style={logo} src={LogoIelts} alt="" />
      </Box>
      <Box sx={header}>
        <Box sx={headerContent}>
          <Button
            onClick={hanldeShowModalExit}
            sx={buttonExit}
            startIcon={<ArrowBackIosIcon sx={{ fontSize: "24px !important" }} />}
          >
            EXIT
          </Button>
          {step === TypeStepExamEnum.STEP3 && <CountDown />}
          {step === TypeStepExamEnum.STEP3 && (
            // <Button
            //   sx={btnSubmitStep2}
            //   endIcon={<AssignmentTurnedInIcon sx={{ fontSize: "24px !important" }} />}
            //   onClick={hanldeSubmitSpeakingExam}
            // >
            //   SUBMIT
            // </Button>
            <ButtonHelp handleOpenModalHelp={handleOpenModalHelp} style={btnHelp} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default React.memo(Header);
