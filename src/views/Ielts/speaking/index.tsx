import React, { useCallback } from "react";

import EndTest from "components/Exams/EndTest";
import { TypeStepExamEnum } from "constants/enum";
import StepExamProvider, { useStepExam } from "provider/StepExamProvider";
import ExamTest from "./components/ExamTest";
//
import { Box } from "@mui/material";
//
import { Form, Formik } from "formik";
import { useUpdateIeltsSpeakingTest } from "hooks/ielts/useIelts";
import { useSelector } from "react-redux";
import Header from "views/Ielts/Header/Header";
import StepTestMic from "./components/StepTestMic";
import DetailUser from "../../components/DetailUser/DetailUser";
import RuleExam from "../../components/RuleExam/RuleExam";
//
import InformationForCandidates from "../../components/dataSteps/DataContentSpeaking/InformationForCandidates";
import IntructionsToCandidates from "../../components/dataSteps/DataContentSpeaking/IntructionsToCandidates";
import ModalHelpExam from "../../../components/Modal/ModalHelpExam";
import ModalHide from "../../../components/Modal/ModalHide";
//
const stepRuleExam = {
  typeExam: "Speaking",
  time: "1 hour",
  informationsForCandidates: <InformationForCandidates />,
  intructionsToCandidates: <IntructionsToCandidates />,
};
export interface IeltsSpeakingProps {}

const initialValues = function () {
  let value = {
    questionId: "",
    studentAnswer: "",
  };
  let answers = [];
  for (let i = 0; i < 40; i++) {
    answers.push(value);
  }
  return { answers };
};
const IeltsSpeaking = (props: IeltsSpeakingProps) => {
  // !State
  const [isOpenModalHelp, setIsOpenModalHelp] = React.useState(false);
  const [isOpenModalHide, setIsOpenModalHide] = React.useState(false);
  const { step, handler } = useStepExam();
  const { mutateAsync: updateIeltsSpeaking, isLoading } = useUpdateIeltsSpeakingTest();
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);

  // !Function
  const handleSubmitForm = () => {
    handler?.setStep && handler.setStep(TypeStepExamEnum.STEP3);
  };
  //

  const handleOpenModalHelp = useCallback(() => {
    setIsOpenModalHelp(true);
  }, []);
  const handleCloseModalHelp = () => {
    setIsOpenModalHelp(false);
  };
  //
  const handleOpenModalHide = useCallback(() => {
    setIsOpenModalHide(true);
  }, []);
  const handleCloseModalHide = () => {
    setIsOpenModalHide(false);
  };
  const containerSteps = {
    pt: "16px",
    background: "#dbe5f5",
    height: "100%",
  };
  const styleModal = {
    width: "770px",
    padding: "10px !important",
  };
  return (
    <Formik initialValues={initialValues()} onSubmit={handleSubmitForm}>
      {(formik) => (
        <Form>
          <Box sx={{ height: "100vh", overflow: "hidden" }}>
            <Header
              numberStep={TypeStepExamEnum.STEP4}
              handleOpenModalHelp={handleOpenModalHelp}
              handleOpenModalHide={handleOpenModalHide}
            />
            <Box sx={containerSteps}>
              {step === TypeStepExamEnum.STEP1 && <DetailUser />}
              {step === TypeStepExamEnum.STEP2 && <StepTestMic nextStep={TypeStepExamEnum.STEP3} />}
              {step === TypeStepExamEnum.STEP3 && (
                <RuleExam stepRuleExam={stepRuleExam} nextStep={TypeStepExamEnum.STEP4} />
              )}
              {step === TypeStepExamEnum.STEP4 && <ExamTest />}
              {/* {step === TypeStepExamEnum.STEP3 && <EndTest test={IELT_TEST.SPEAKING} />} */}
            </Box>
          </Box>

          {isOpenModalHelp && (
            <ModalHelpExam open={isOpenModalHelp} styleModal={styleModal} handleCloseModal={handleCloseModalHelp} />
          )}
          {isOpenModalHide && (
            <ModalHide open={isOpenModalHide} styleModal={styleModal} handleCloseModal={handleCloseModalHide} />
          )}
        </Form>
      )}
    </Formik>
  );
};

const IeltsSpeakingRoot = () => {
  return (
    <StepExamProvider>
      <IeltsSpeaking />
    </StepExamProvider>
  );
};

export default IeltsSpeakingRoot;
