import React, { useCallback } from "react";
//
import { Box, Button, Stack } from "@mui/material";
import CountDown from "components/Countdown/CountDown";
//
import { useStepExam } from "provider/StepExamProvider";
import { TypeStepExamEnum } from "constants/enum";
//
import LogoIelts from "assets/image/header/logo-ielts.png";
import ButtonHelp from "../../components/ButtonHelp/ButtonHelp";
import OptionButton from "../../Exam/OptionButton/OptionButton";
import { themeCssSx } from "ThemeCssSx/ThemeCssSx";
import NumberUser from "assets/image/exam/number-user.png";
//
import HeaderExam from "../Header/HeaderExam";
import { useFormikContext } from "formik";
import Volum from "../../../components/Volum/Volum";
import { TypeExam } from "constants/enum";

// ! type
interface Props {
  onShowModalExit?: any;
  handleOpenModalHelp?: () => void;
  handleOpenModalHide?: () => void;
  numberStep?: any;
  timeExam?: any;
  handleSubmitWhenEndedTime?: () => void;
  handleChangeValueVolum?: (value: any) => void;
  typeExam?: string;
}
const header = {
  p: "10px 0px",
  background: "#36373b",
  zIndex: 999,
  width: "100%",
  marginTop: "80px",
};
const headerContent = {
  m: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "5px 20px",
  minHeight: "40px",
};
//

const Header = ({
  handleOpenModalHelp,
  handleOpenModalHide,
  numberStep,
  timeExam,
  handleChangeValueVolum,
  typeExam,
}: Props) => {
  //! State
  const { step } = useStepExam();
  const { handleSubmit } = useFormikContext();

  const btnHelp = {
    cursor: "pointer",
  };
  const optionBtn = {
    cursor: "pointer",
  };

  const handleSubmitWhenEndedTime = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  //! Render
  return (
    <Box>
      <HeaderExam />
      <Box sx={header}>
        <Box sx={headerContent}>
          {(step === TypeStepExamEnum.STEP2 || step === TypeStepExamEnum.STEP3 || step === TypeStepExamEnum.STEP4) && (
            <Stack direction="row" spacing={1} sx={themeCssSx.flexBox.flexJusAlign}>
              <img style={{ width: "18px", height: "18px" }} src={NumberUser} alt="" />
              <p style={{ color: "#fff", fontSize: "14px" }}>XXXXX XXXX - 123456</p>
            </Stack>
          )}

          {step === numberStep && (
            <CountDown handleSubmitWhenEndedTime={handleSubmitWhenEndedTime} timeExam={timeExam} />
          )}
          <div className="flex">
            {typeExam === TypeExam.LISTENING &&
              (step === TypeStepExamEnum.STEP2 || step === TypeStepExamEnum.STEP4) && (
                <Volum handleChangeValueVolum={handleChangeValueVolum} />
              )}
            {step === numberStep && (
              <Stack direction="row" spacing={1} sx={themeCssSx.flexBox.flexJusAlign}>
                <ButtonHelp handleOpenModalHelp={handleOpenModalHelp} style={btnHelp} />
                <OptionButton handleOpenModalHide={handleOpenModalHide} addCss={optionBtn}>
                  Hide
                </OptionButton>
              </Stack>
            )}
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(Header);
