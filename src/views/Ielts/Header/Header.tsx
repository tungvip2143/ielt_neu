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

const Header = () => {
  const { step } = useStepExam();

  const { handleSubmit } = useFormikContext();

  return (
    <Box sx={header}>
      <Box sx={headerContent}>
        <Button sx={buttonExit} startIcon={<ArrowBackIosIcon sx={{ fontSize: "24px !important" }} />}>
          EXIT
        </Button>
        {step === TypeStepExamEnum.STEP2 && <CountDown />}
        {step === TypeStepExamEnum.STEP2 && (
          <Button
            sx={btnSubmitStep2}
            endIcon={<AssignmentTurnedInIcon sx={{ fontSize: "24px !important" }} />}
            onClick={() => {
              handleSubmit();
            }}
          >
            SUBMIT
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Header;
