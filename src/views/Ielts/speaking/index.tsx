import * as React from "react";
import RulesExamStep1 from "components/RulesExams/RulesExamStep1";
import ExamTest from "./components/ExamTest";
import EndTest from "components/Exams/EndTest";
import StepExamProvider, { useStepExam } from "provider/StepExamProvider";
import { TypeStepExamEnum } from "constants/enum";
//
import { Box, Button } from "@mui/material";
//
import Header from "views/Ielts/Header/Header";
import RulesListening from "components/RulesExams/RulesListening";
import { Form, Formik } from "formik";
import { useIeltsListening, useUpdateIeltsListeningTest, useUpdateIeltsSpeakingTest } from "hooks/ielts/useIelts";
import { useSelector } from "react-redux";
import ModalSpeaking from "../../../components/Modal/ModalSpeaking";
import ModalExit from "components/Modal/ModalExit";
import { useHistory } from "react-router-dom";
import StepTestMic from "./components/StepTestMic";
import RuleSpeaking from "components/RulesExams/RulesSpeaking";
import { IELT_TEST } from "interfaces/testType";

//
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
  const [open, setOpen] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(true);

  const { step, handler } = useStepExam();
  const { mutateAsync: updateIeltsSpeaking, isLoading } = useUpdateIeltsSpeakingTest();
  const testCode = useSelector((state: any) => state?.IeltsReducer?.ielts?.testCode);

  // !Function
  const handleSubmitForm = async (values: any) => {
    const body = { values, testCode };

    await updateIeltsSpeaking(body, {
      onSuccess: () => handler?.setStep && handler.setStep(TypeStepExamEnum.STEP3),
    });
  };
  const history = useHistory();

  //
  const handleShowModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => setOpen(false);
  const handleCloseModalSpeaking = () => setOpenModal(false);

  //
  const handleBackIeltsSelection = () => {
    history.push("/ielts");
  };

  return (
    <Formik initialValues={initialValues()} onSubmit={(values) => handleSubmitForm(values)}>
      {(formik) => (
        <Form>
          <Box sx={{ height: "100vh", overflow: "hidden" }}>
            <Header onShowModalExit={handleShowModal} />
            <Box sx={{ mt: "80px" }}>
              {step === TypeStepExamEnum.STEP1 && openModal && (
                <ModalSpeaking open={openModal} width="400px" handleCloseModal={handleCloseModalSpeaking} />
              )}
              {step === TypeStepExamEnum.STEP1 && <StepTestMic />}
              {step === TypeStepExamEnum.STEP2 && <ExamTest />}
              {step === TypeStepExamEnum.STEP3 && <EndTest test={IELT_TEST.SPEAKING} />}
            </Box>
          </Box>
          {open && (
            <ModalExit
              open={open}
              width="560px"
              handleCloseModal={handleCloseModal}
              handleBackIeltsSelection={handleBackIeltsSelection}
            />
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
