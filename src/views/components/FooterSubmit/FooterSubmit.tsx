import React from "react";
//
import { Box, Stack } from "@mui/system";

import ButtonCommon from "components/Button/ButtonCommon";
import { themeCssSx } from "../../../ThemeCssSx/ThemeCssSx";
//
import { TypeStepExamEnum } from "constants/enum";
import { useStepExam } from "../../../provider/StepExamProvider";
import { useFormikContext } from "formik";
import cacheService from "services/cacheService";
// !type
interface Props {
  textBtn?: string;
  nextStep?: any;
}
const containerBtn = {
  ...themeCssSx.flexBox.flexBetWeen,
  mt: "15px",
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
const FooterSubmit = (props: Props) => {
  const { textBtn, nextStep } = props;
  const { handler } = useStepExam();
  const { setFieldValue } = useFormikContext();

  return (
    <>
      <Box sx={containerBtn}>
        <ButtonCommon.ButtonOutline
          onClick={() => {
            handler?.setStep && handler.setStep(nextStep);
            cacheService.cache("step", nextStep);
          }}
          sx={btn}
        >
          {textBtn}
        </ButtonCommon.ButtonOutline>
      </Box>
    </>
  );
};

export default FooterSubmit;
