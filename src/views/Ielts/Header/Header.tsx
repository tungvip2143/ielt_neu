import React from "react";
//
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { Box, Button } from "@mui/material";
import CountDown from "components/Countdown/CountDown";
//
import { useStepExam } from "provider/StepExamProvider";
import { TypeStepExamEnum } from "constants/enum";
import { useFormikContext } from "formik";
//
import LogoIelts from "assets/image/header/logo-ielts.png";
import LogoEnglish from "assets/image/header/IELTSpartners.e1a4eda8.jpg";
// ! type
interface Props {
  onClickSubmit?: () => void;
  onShowModalExit?: any;
}
const header = {
  p: "13px 0px",
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
const headerTop = {
  display: "flex",
  justifyContent: "space-between",
  background: "#fff",
  p: "0 20px",
  alignItems: "center",
};

const Header = ({ onShowModalExit }: Props) => {
  const { step, handler } = useStepExam();
  const { handleSubmit } = useFormikContext();

  const hanldeShowModalExit = () => {
    onShowModalExit();
  };

  const hanldeSubmitSpeakingExam = () => {
    handler?.setStep && handler.setStep(TypeStepExamEnum.STEP3);
  };

  return (
    <>
      <Box sx={headerTop}>
        <Box>
          <img src={LogoIelts} alt="" />
        </Box>
        <Box>
          <img src={LogoEnglish} alt="" />
        </Box>
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
          {step === TypeStepExamEnum.STEP2 && <CountDown />}
          {step === TypeStepExamEnum.STEP2 && (
            <Button
              sx={btnSubmitStep2}
              endIcon={<AssignmentTurnedInIcon sx={{ fontSize: "24px !important" }} />}
              onClick={hanldeSubmitSpeakingExam}
            >
              SUBMIT
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default React.memo(Header);
